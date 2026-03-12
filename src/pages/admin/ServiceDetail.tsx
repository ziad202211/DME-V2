import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Eye, ArrowLeft, Upload, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types/supabase';
import { uploadWebPVersion } from '@/lib/image-conversion';
import '@/styles/admin-ds.css';

export default function AdminServiceDetail() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [service, setService] = useState<Partial<Service>>({
    title: '', slug: '', description: '', content: '',
    icon: '', image_url: '', featured: false, order_index: 0
  });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving]   = useState(false);

  useEffect(() => { if (isEditing) fetchService(); }, [id]);

  const fetchService = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').eq('id', id).single();
      if (error) throw error;
      setService(data);
    } catch (e) { console.error(e); alert('Failed to fetch service'); }
    finally { setLoading(false); }
  };

  const set = (field: keyof Service, value: any) =>
    setService(prev => ({ ...prev, [field]: value }));

  const generateSlug = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTitleChange = (title: string) =>
    setService(prev => ({ ...prev, title, slug: prev.slug || generateSlug(title) }));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (!service.title || !service.slug) { alert('Title and slug are required'); return; }
      const payload = {
        title: service.title, slug: service.slug,
        description: service.description || '', content: service.content || '',
        icon: service.icon || '', image_url: service.image_url || '',
        webp_image_url: service.webp_image_url || '',
        featured: service.featured || false, order_index: service.order_index || 0
      };
      let error;
      if (isEditing) ({ error } = await supabase.from('services').update(payload).eq('id', id));
      else           ({ error } = await supabase.from('services').insert(payload));
      if (error) throw error;
      navigate('/admin/services');
    } catch (e) { console.error(e); alert('Failed to save service'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this service?')) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      navigate('/admin/services');
    } catch (e) { console.error(e); alert('Failed to delete service'); }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const fileName = `service-${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('service-images').upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('service-images').getPublicUrl(fileName);
      try {
        const webpResult = await uploadWebPVersion(file, 'service-images', fileName, supabase, { quality: 0.8, maxWidth: 1920, maxHeight: 1080 });
        set('image_url', webpResult.webpUrl);
        set('webp_image_url', webpResult.webpUrl);
      } catch {
        set('image_url', publicUrl);
        set('webp_image_url', publicUrl);
      }
    } catch (e) { console.error(e); alert('Failed to upload image'); }
  };

  if (loading) return (
    <div className="ds-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)', fontFamily: 'DM Mono, monospace', fontSize: 13 }}>
      Loading…
    </div>
  );

  return (
    <div className="ds-root">
      <style>{`
        .svc-detail-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          align-items: start;
        }
        @media (min-width: 1024px) {
          .svc-detail-grid { grid-template-columns: 1fr 300px; }
        }
        .svc-detail-left  { display: flex; flex-direction: column; gap: 20px; }
        .svc-detail-right { display: flex; flex-direction: column; gap: 20px; }

        .svc-header-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }

        .svc-delete-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 10px; border-radius: 8px;
          border: 1px solid rgba(239,68,68,0.4);
          background: rgba(239,68,68,0.08);
          color: var(--red); font-size: 12px; cursor: pointer;
          font-family: 'DM Mono', monospace; white-space: nowrap;
        }
        @media (min-width: 640px) { .svc-delete-btn { padding: 6px 14px; font-size: 13px; } }
        .svc-delete-btn:hover { background: rgba(239,68,68,0.14); }

        .svc-delete-label { display: none; }
        @media (min-width: 480px) { .svc-delete-label { display: inline; } }

        .svc-settings-body {
          padding: 16px;
          display: flex; flex-direction: column; gap: 16px;
        }
        @media (min-width: 640px) { .svc-settings-body { padding: 16px 22px; } }

        .svc-preview-body { padding: 14px; }
        @media (min-width: 640px) { .svc-preview-body { padding: 16px 22px; } }

        .svc-toggle-wrap {
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px;
        }
      `}</style>

      {/* Header */}
      <header className="ds-header">
        <div className="ds-header-left">
          <button className="ds-back" onClick={() => navigate('/admin/services')}>
            <ArrowLeft size={13} /> <span className="ds-back-label">Back</span>
          </button>
          <div className="ds-header-divider" />
          <span className="ds-header-title">{isEditing ? 'Edit Service' : 'New Service'}</span>
        </div>

        <div className="svc-header-actions">
          {service.slug && (
            <button className="ds-preview" onClick={() => window.open(`/services/${service.slug}`, '_blank')}>
              <Eye size={13} /> <span className="ds-back-label">Preview</span>
            </button>
          )}
          {isEditing && (
            <button className="svc-delete-btn" onClick={handleDelete}>
              <Trash2 size={13} /> <span className="svc-delete-label">Delete</span>
            </button>
          )}
          <button className="ds-save-btn" disabled={saving} onClick={handleSave}>
            <Save size={13} /> {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </header>

      <main className="ds-main">
        <div className="ds-page-title">{isEditing ? 'Edit Service' : 'Create New Service'}</div>
        <div className="ds-page-sub">{isEditing ? 'Update service details below.' : 'Fill in the details for your new service.'}</div>

        <div className="svc-detail-grid">

          {/* ── Left column ── */}
          <div className="svc-detail-left">

            {/* Basic Info */}
            <div className="ds-panel">
              <div className="ds-panel-header">
                <div>
                  <div className="ds-panel-title">Basic Information</div>
                  <div className="ds-panel-desc">Service title and content</div>
                </div>
              </div>
              <div className="ds-edit-form" style={{ margin: '16px' }}>
                <div className="ds-form-grid">
                  <div className="ds-field" style={{ marginBottom: 0 }}>
                    <label className="ds-label">Service Title *</label>
                    <input className="ds-input" value={service.title || ''} onChange={e => handleTitleChange(e.target.value)} placeholder="Enter service title" />
                  </div>
                  <div className="ds-field" style={{ marginBottom: 0 }}>
                    <label className="ds-label">URL Slug *</label>
                    <input className="ds-input" value={service.slug || ''} onChange={e => set('slug', e.target.value)} placeholder="service-url-slug" />
                  </div>
                </div>
                <div className="ds-field">
                  <label className="ds-label">Short Description</label>
                  <textarea className="ds-textarea" rows={3} value={service.description || ''} onChange={e => set('description', e.target.value)} placeholder="Brief description of the service" />
                </div>
                <div className="ds-field">
                  <label className="ds-label">Full Content</label>
                  <textarea className="ds-textarea" rows={8} value={service.content || ''} onChange={e => set('content', e.target.value)} placeholder="Detailed description of the service" />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="ds-panel">
              <div className="ds-panel-header">
                <div>
                  <div className="ds-panel-title">Media</div>
                  <div className="ds-panel-desc">Service images and icon</div>
                </div>
              </div>
              <div className="ds-edit-form" style={{ margin: '16px' }}>
                <div className="ds-field">
                  <label className="ds-label">Icon (optional)</label>
                  <input className="ds-input" value={service.icon || ''} onChange={e => set('icon', e.target.value)} placeholder="Emoji or icon name e.g. ⚙️" />
                  <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Use emojis like ⚙️ 🔧 💡 or icon names</span>
                </div>
                <div className="ds-field">
                  <label className="ds-label">Service Image</label>
                  <div className="ds-input-row">
                    <input className="ds-input" value={service.image_url || ''} onChange={e => set('image_url', e.target.value)} placeholder="Image URL or upload" />
                    <input type="file" accept="image/*" id="image_upload" style={{ display: 'none' }}
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} />
                    <button className="ds-upload-btn" onClick={() => document.getElementById('image_upload')?.click()}>
                      <Upload size={13} /> Upload
                    </button>
                  </div>
                  {service.image_url && (
                    <div className="ds-img-preview">
                      <img src={service.image_url} alt="Service preview" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="svc-detail-right">

            {/* Settings */}
            <div className="ds-panel">
              <div className="ds-panel-header">
                <div>
                  <div className="ds-panel-title">Settings</div>
                  <div className="ds-panel-desc">Service configuration</div>
                </div>
              </div>
              <div className="svc-settings-body">
                <div className="svc-toggle-wrap">
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Featured Service</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Display this service prominently</div>
                  </div>
                  <button
                    onClick={() => set('featured', !service.featured)}
                    style={{ width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', transition: 'background 0.2s', background: service.featured ? 'var(--accent)' : 'var(--border)', position: 'relative', flexShrink: 0 }}>
                    <span style={{ position: 'absolute', top: 3, left: service.featured ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                  </button>
                </div>
                <div className="ds-field" style={{ marginBottom: 0 }}>
                  <label className="ds-label">Display Order</label>
                  <input className="ds-input" type="number" value={service.order_index || 0} onChange={e => set('order_index', parseInt(e.target.value))} placeholder="0" />
                  <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Lower numbers appear first</span>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="ds-panel">
              <div className="ds-panel-header">
                <div>
                  <div className="ds-panel-title">Preview</div>
                  <div className="ds-panel-desc">How this service will appear</div>
                </div>
              </div>
              <div className="svc-preview-body">
                <div style={{ borderRadius: 10, padding: 14, background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                      {service.icon || '📋'}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{service.title || 'Service Title'}</span>
                  </div>
                  {service.description && (
                    <div style={{ fontSize: 12, color: 'var(--muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: 8 }}>
                      {service.description}
                    </div>
                  )}
                  {service.featured && (
                    <span style={{ display: 'inline-flex', padding: '2px 9px', borderRadius: 20, fontSize: 11, fontFamily: 'DM Mono, monospace', background: 'rgba(245,158,11,0.12)', color: 'var(--accent)', border: '1px solid rgba(245,158,11,0.3)' }}>
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}