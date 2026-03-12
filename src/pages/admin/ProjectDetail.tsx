import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, Eye, ArrowLeft, Upload, Trash2, Plus, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/supabase';
import { uploadWebPVersion } from '@/lib/image-conversion';
import '@/styles/admin-ds.css';

const STATUS_COLOR: Record<string, string> = {
  completed: 'var(--green)', ongoing: 'var(--blue)', planned: 'var(--accent)'
};

export default function AdminProjectDetail() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [project, setProject] = useState<Partial<Project>>({
    title: '', slug: '', description: '', content: '',
    client: '', location: '', start_date: '', end_date: '',
    status: 'completed', featured: false, image_url: '', gallery: [], order_index: 0
  });
  const [projectServices, setProjectServices] = useState<string[]>([]);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving]   = useState(false);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    if (isEditing) fetchProject();
    fetchServices();
  }, [id]);

  const fetchProject = async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
      if (error) throw error;
      const { data: sd } = await supabase.from('project_services').select('service_id').eq('project_id', id);
      setProject(data);
      setProjectServices(sd?.map((x: any) => x.service_id) || []);
    } catch (e) { console.error(e); alert('Failed to fetch project'); }
    finally { setLoading(false); }
  };

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('id, title, slug').order('title');
      if (error) throw error;
      setServices(data || []);
    } catch (e) { console.error(e); }
  };

  const set = (field: keyof Project, value: any) =>
    setProject(prev => ({ ...prev, [field]: value }));

  const generateSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTitleChange = (title: string) =>
    setProject(prev => ({ ...prev, title, slug: prev.slug || generateSlug(title) }));

  const handleSave = async () => {
    setSaving(true);
    try {
      if (!project.title || !project.slug) { alert('Title and slug are required'); return; }
      const payload = {
        title: project.title, slug: project.slug,
        description: project.description || '', content: project.content || '',
        client: project.client || '', location: project.location || '',
        start_date: project.start_date || null, end_date: project.end_date || null,
        status: project.status || 'completed', featured: project.featured || false,
        image_url: project.image_url || '', webp_image_url: project.webp_image_url || '',
        gallery: project.gallery || [], order_index: project.order_index || 0,
        services: project.services || []
      };
      let error;
      if (isEditing) {
        ({ error } = await supabase.from('projects').update(payload).eq('id', id));
        if (!error) {
          await supabase.from('project_services').delete().eq('project_id', id);
          if (projectServices.length > 0)
            await supabase.from('project_services').insert(projectServices.map(s => ({ project_id: id!, service_id: s })));
        }
      } else {
        const result = await supabase.from('projects').insert(payload).select();
        error = result.error;
        const newId = (result.data as any)?.[0]?.id;
        if (!error && newId && projectServices.length > 0)
          await supabase.from('project_services').insert(projectServices.map(s => ({ project_id: newId, service_id: s })));
      }
      if (error) throw error;
      navigate('/admin/projects');
    } catch (e) { console.error(e); alert('Failed to save project'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this project?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      navigate('/admin/projects');
    } catch (e) { console.error(e); alert('Failed to delete project'); }
  };

  const handleImageUpload = async (file: File, type: 'main' | 'gallery') => {
    try {
      const fileName = `project-${type}-${Date.now()}-${file.name}`;
      
      // Upload original image
      const { error } = await supabase.storage.from('project-images').upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('project-images').getPublicUrl(fileName);

      // Create and upload WebP version for better performance (wait for it)
      try {
        const webpResult = await uploadWebPVersion(
          file,
          'project-images',
          fileName,
          supabase,
          { quality: 0.8, maxWidth: 1920, maxHeight: 1080 }
        );
        
        if (type === 'main') {
          set('image_url', webpResult.webpUrl);
          set('webp_image_url', webpResult.webpUrl);
        } else {
          set('gallery', [...(project.gallery || []), webpResult.webpUrl]);
        }
      } catch (webpError) {
        console.warn('WebP conversion failed, using original:', webpError);
        // Fallback to original URL if WebP conversion fails
        if (type === 'main') {
          set('image_url', publicUrl);
          set('webp_image_url', publicUrl);
        } else {
          set('gallery', [...(project.gallery || []), publicUrl]);
        }
      }
    } catch (e) { console.error(e); alert('Failed to upload image'); }
  };

  const removeFromGallery = (i: number) => {
    const g = [...(project.gallery || [])];
    g.splice(i, 1);
    set('gallery', g);
  };

  if (loading) return (
    <div className="ds-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)', fontFamily: 'DM Mono, monospace', fontSize: 13 }}>
      Loading…
    </div>
  );

  return (
    <div className="ds-root">
      <header className="ds-header">
        <div className="ds-header-left">
          <button className="ds-back" onClick={() => navigate('/admin/projects')}><ArrowLeft size={13} /> Back</button>
          <div className="ds-header-divider" />
          <span className="ds-header-title">{isEditing ? 'Edit Project' : 'New Project'}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {project.slug && (
            <button className="ds-preview" onClick={() => window.open(`/projects/${project.slug}`, '_blank')}><Eye size={13} /> Preview</button>
          )}
          {isEditing && (
            <button onClick={handleDelete} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.08)', color: 'var(--red)', fontSize: 13, cursor: 'pointer', fontFamily: 'DM Mono, monospace' }}>
              <Trash2 size={13} /> Delete
            </button>
          )}
          <button className="ds-save-btn" disabled={saving} onClick={handleSave}><Save size={13} /> {saving ? 'Saving…' : 'Save'}</button>
        </div>
      </header>

      <main className="ds-main">
        <div className="ds-page-title">{isEditing ? 'Edit Project' : 'Create New Project'}</div>
        <div className="ds-page-sub">{isEditing ? 'Update project details below.' : 'Fill in the details for your new project.'}</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>

          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Basic Info */}
            <div className="ds-panel">
              <div className="ds-panel-header">
                <div><div className="ds-panel-title">Basic Information</div><div className="ds-panel-desc">Project title and content</div></div>
              </div>
              <div className="ds-edit-form" style={{ margin: '20px 22px' }}>
                <div className="ds-form-grid">
                  <div className="ds-field" style={{ marginBottom: 0 }}>
                    <label className="ds-label">Project Title *</label>
                    <input className="ds-input" value={project.title || ''} onChange={e => handleTitleChange(e.target.value)} placeholder="Enter project title" />
                  </div>
                  <div className="ds-field" style={{ marginBottom: 0 }}>
                    <label className="ds-label">URL Slug *</label>
                    <input className="ds-input" value={project.slug || ''} onChange={e => set('slug', e.target.value)} placeholder="project-url-slug" />
                  </div>
                </div>
                <div className="ds-field">
                  <label className="ds-label">Short Description</label>
                  <textarea className="ds-textarea" rows={3} value={project.description || ''} onChange={e => set('description', e.target.value)} placeholder="Brief description of the project" />
                </div>
                <div className="ds-field">
                  <label className="ds-label">Full Content</label>
                  <textarea className="ds-textarea" rows={8} value={project.content || ''} onChange={e => set('content', e.target.value)} placeholder="Detailed description of the project" />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="ds-panel">
              <div className="ds-panel-header">
                <div><div className="ds-panel-title">Project Details</div><div className="ds-panel-desc">Client, location, and timeline</div></div>
              </div>
              <div className="ds-edit-form" style={{ margin: '20px 22px' }}>
                <div className="ds-form-grid">
                  <div className="ds-field" style={{ marginBottom: 0 }}>
                    <label className="ds-label">Client</label>
                    <input className="ds-input" value={project.client || ''} onChange={e => set('client', e.target.value)} placeholder="Client name" />
                  </div>
                  <div className="ds-field" style={{ marginBottom: 0 }}>
                    <label className="ds-label">Location</label>
                    <input className="ds-input" value={project.location || ''} onChange={e => set('location', e.target.value)} placeholder="Project location" />
                  </div>
                </div>
                <div className="ds-form-grid" style={{ marginTop: 14 }}>
                  <div className="ds-field" style={{ marginBottom: 0 }}>
                    <label className="ds-label">Start Date</label>
                    <input className="ds-input" type="date" value={project.start_date || ''} onChange={e => set('start_date', e.target.value)} />
                  </div>
                  <div className="ds-field" style={{ marginBottom: 0 }}>
                    <label className="ds-label">End Date</label>
                    <input className="ds-input" type="date" value={project.end_date || ''} onChange={e => set('end_date', e.target.value)} />
                  </div>
                </div>
                <div className="ds-field" style={{ marginTop: 14 }}>
                  <label className="ds-label">Status</label>
                  <select className="ds-input" value={project.status || 'completed'} onChange={e => set('status', e.target.value)}
                    style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option value="planned">Planned</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="ds-field" style={{ marginTop: 14 }}>
                  <label className="ds-label">Services Used</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(project.services || []).map((service, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input 
                          className="ds-input" 
                          value={service}
                          onChange={e => {
                            const newServices = [...(project.services || [])];
                            newServices[index] = e.target.value;
                            set('services', newServices);
                          }}
                          placeholder="Enter service name"
                          style={{ flex: 1 }}
                        />
                        <button 
                          className="ds-icon-btn" 
                          onClick={() => {
                            const newServices = [...(project.services || [])];
                            newServices.splice(index, 1);
                            set('services', newServices);
                          }}
                          title="Remove service"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                    <button 
                      className="ds-add-btn" 
                      onClick={() => {
                        const newServices = [...(project.services || []), ''];
                        set('services', newServices);
                      }}
                      style={{ marginTop: 4 }}
                    >
                      <Plus size={13} /> Add Service
                    </button>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Add services provided for this project</span>
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="ds-panel">
              <div className="ds-panel-header">
                <div><div className="ds-panel-title">Media</div><div className="ds-panel-desc">Project images and gallery</div></div>
              </div>
              <div className="ds-edit-form" style={{ margin: '20px 22px' }}>
                <div className="ds-field">
                  <label className="ds-label">Main Project Image</label>
                  <div className="ds-input-row">
                    <input className="ds-input" value={project.image_url || ''} onChange={e => set('image_url', e.target.value)} placeholder="Image URL or upload" />
                    <input type="file" accept="image/*" id="main_image_upload" style={{ display: 'none' }}
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, 'main'); }} />
                    <button className="ds-upload-btn" onClick={() => document.getElementById('main_image_upload')?.click()}><Upload size={13} /> Upload</button>
                  </div>
                  {project.image_url && (
                    <div className="ds-img-preview">
                      <img src={project.image_url} alt="Preview" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                    </div>
                  )}
                </div>

                <div className="ds-field">
                  <label className="ds-label">Gallery</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {(project.gallery || []).map((img, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={img} alt={`Gallery ${i + 1}`} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border)', flexShrink: 0 }} />
                        <input className="ds-input" value={img} onChange={e => {
                          const g = [...(project.gallery || [])];
                          g[i] = e.target.value;
                          set('gallery', g);
                        }} placeholder="Image URL" />
                        <button className="ds-icon-btn" onClick={() => removeFromGallery(i)}><X size={13} /></button>
                      </div>
                    ))}
                    <div>
                      <input type="file" accept="image/*" id="gallery_upload" style={{ display: 'none' }}
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, 'gallery'); }} />
                      <button className="ds-add-btn" onClick={() => document.getElementById('gallery_upload')?.click()}><Plus size={13} /> Add to Gallery</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Settings */}
            <div className="ds-panel">
              <div className="ds-panel-header">
                <div><div className="ds-panel-title">Settings</div><div className="ds-panel-desc">Project configuration</div></div>
              </div>
              <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Featured Project</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Display this project prominently</div>
                  </div>
                  <button
                    onClick={() => set('featured', !project.featured)}
                    style={{ width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', transition: 'background 0.2s', background: project.featured ? 'var(--accent)' : 'var(--border)', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: 3, left: project.featured ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                  </button>
                </div>
                <div className="ds-field" style={{ marginBottom: 0 }}>
                  <label className="ds-label">Display Order</label>
                  <input className="ds-input" type="number" value={project.order_index || 0} onChange={e => set('order_index', parseInt(e.target.value))} placeholder="0" />
                  <span style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>Lower numbers appear first</span>
                </div>
              </div>
            </div>

            {/* Related Services */}
            <div className="ds-panel">
              <div className="ds-panel-header">
                <div><div className="ds-panel-title">Related Services</div><div className="ds-panel-desc">Services offered for this project</div></div>
              </div>
              <div style={{ padding: '12px 22px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {services.map(s => (
                  <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13, color: 'var(--text)' }}>
                    <input type="checkbox" checked={projectServices.includes(s.id)}
                      onChange={e => setProjectServices(e.target.checked ? [...projectServices, s.id] : projectServices.filter(x => x !== s.id))}
                      style={{ accentColor: 'var(--accent)', width: 14, height: 14 }} />
                    {s.title}
                  </label>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="ds-panel">
              <div className="ds-panel-header">
                <div><div className="ds-panel-title">Preview</div><div className="ds-panel-desc">How this project will appear</div></div>
              </div>
              <div style={{ padding: '16px 22px' }}>
                <div style={{ borderRadius: 10, padding: 14, background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{project.title || 'Project Title'}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, fontFamily: 'DM Mono, monospace' }}>
                    {project.client || 'Client'} · {project.location || 'Location'}
                  </div>
                  {project.description && (
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {project.description}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', padding: '2px 9px', borderRadius: 20, fontSize: 11, fontFamily: 'DM Mono, monospace', background: `${STATUS_COLOR[project.status || 'completed']}22`, color: STATUS_COLOR[project.status || 'completed'], border: `1px solid ${STATUS_COLOR[project.status || 'completed']}44` }}>
                      {project.status || 'completed'}
                    </span>
                    {project.featured && (
                      <span style={{ display: 'inline-flex', padding: '2px 9px', borderRadius: 20, fontSize: 11, fontFamily: 'DM Mono, monospace', background: 'rgba(245,158,11,0.12)', color: 'var(--accent)', border: '1px solid rgba(245,158,11,0.3)' }}>
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}