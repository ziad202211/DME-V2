import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, ArrowLeft, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { uploadWebPVersion } from '@/lib/image-conversion';
import '@/styles/admin-ds.css';

interface HomeContent {
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_cta_text: string;
  hero_cta_link: string;
  hero_background_image: string;
  webp_hero_background_image: string;
}

const DEFAULT: HomeContent = {
  hero_title: '', hero_subtitle: '', hero_description: '',
  hero_cta_text: '', hero_cta_link: '', hero_background_image: '', webp_hero_background_image: ''
};

export default function AdminHome() {
  const [content, setContent] = useState<HomeContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [tab, setTab]         = useState('hero');
  const navigate = useNavigate();

  useEffect(() => { fetchHomeContent(); }, []);

  const fetchHomeContent = async () => {
    try {
      const { data, error } = await supabase.from('home_content').select('*').single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) setContent(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from('home_content').upsert(content, { onConflict: 'id' });
      if (error) throw error;
    } catch (e) { console.error(e); alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const set = (field: keyof HomeContent, value: string) =>
    setContent(prev => ({ ...prev, [field]: value }));

  const handleImageUpload = async (field: keyof HomeContent, file: File) => {
    try {
      const fileName = `${field}-${Date.now()}-${file.name}`;
      
      // Upload original image
      const { error } = await supabase.storage.from('home-images').upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('home-images').getPublicUrl(fileName);

      // Create and upload WebP version for better performance (wait for it)
      try {
        const webpResult = await uploadWebPVersion(
          file,
          'home-images',
          fileName,
          supabase,
          { quality: 0.8, maxWidth: 1920, maxHeight: 1080 }
        );
        
        // Set both original and WebP URLs
        set(field as 'hero_background_image', publicUrl);
        set('webp_hero_background_image', webpResult.webpUrl);
      } catch (webpError) {
        console.warn('WebP conversion failed, using original:', webpError);
        // Fallback to original URL if WebP conversion fails
        set(field as 'hero_background_image', publicUrl);
        set('webp_hero_background_image', publicUrl);
      }
    } catch (e) { console.error(e); alert('Failed to upload image'); }
  };

  const tabs = [
    { key: 'hero', label: 'Hero' }
  ];

  if (loading) return (
    <div className="ds-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)', fontFamily: 'DM Mono, monospace', fontSize: 13 }}>
      Loading…
    </div>
  );

  return (
    <div className="ds-root">

      {/* Header */}
      <header className="ds-header">
        <div className="ds-header-left">
          <button className="ds-back" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={13} /> Back
          </button>
          <div className="ds-header-divider" />
          <span className="ds-header-title">Home Page Editor</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="ds-preview" onClick={() => window.open('/', '_blank')}>
            <Eye size={13} /> Preview
          </button>
          <button className="ds-save-btn" disabled={saving} onClick={handleSave}>
            <Save size={13} /> {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="ds-main">
        <div className="ds-page-title">Home</div>
        <div className="ds-page-sub">Manage all sections displayed on the home page.</div>

        <div className="ds-tabs">
          {tabs.map(t => (
            <button key={t.key} className={`ds-tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Hero ── */}
        {tab === 'hero' && (
          <div className="ds-panel">
            <div className="ds-panel-header">
              <div>
                <div className="ds-panel-title">Hero Section</div>
                <div className="ds-panel-desc">Main hero content for the home page</div>
              </div>
            </div>
            <div className="ds-edit-form" style={{ margin: '20px 22px' }}>
              <div className="ds-form-grid">
                <div className="ds-field" style={{ marginBottom: 0 }}>
                  <label className="ds-label">Hero Title</label>
                  <input className="ds-input" value={content.hero_title} onChange={e => set('hero_title', e.target.value)} placeholder="Enter hero title" />
                </div>
                <div className="ds-field" style={{ marginBottom: 0 }}>
                  <label className="ds-label">Hero Subtitle</label>
                  <input className="ds-input" value={content.hero_subtitle} onChange={e => set('hero_subtitle', e.target.value)} placeholder="Enter hero subtitle" />
                </div>
              </div>

              <div className="ds-field">
                <label className="ds-label">Hero Description</label>
                <textarea className="ds-textarea" rows={4} value={content.hero_description} onChange={e => set('hero_description', e.target.value)} placeholder="Enter hero description" />
              </div>

              <div className="ds-form-grid">
                <div className="ds-field" style={{ marginBottom: 0 }}>
                  <label className="ds-label">CTA Button Text</label>
                  <input className="ds-input" value={content.hero_cta_text} onChange={e => set('hero_cta_text', e.target.value)} placeholder="e.g. Get Started" />
                </div>
                <div className="ds-field" style={{ marginBottom: 0 }}>
                  <label className="ds-label">CTA Button Link</label>
                  <input className="ds-input" value={content.hero_cta_link} onChange={e => set('hero_cta_link', e.target.value)} placeholder="e.g. /contact" />
                </div>
              </div>

              <div className="ds-field" style={{ marginTop: 14 }}>
                <label className="ds-label">Background Image</label>
                <div className="ds-input-row">
                  <input className="ds-input" value={content.hero_background_image} onChange={e => set('hero_background_image', e.target.value)} placeholder="Image URL or upload" />
                  <input type="file" accept="image/*" id="hero_image_upload" style={{ display: 'none' }}
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload('hero_background_image', f); }} />
                  <button className="ds-upload-btn" onClick={() => document.getElementById('hero_image_upload')?.click()}>
                    <Upload size={13} /> Upload
                  </button>
                </div>
                {content.hero_background_image && (
                  <div className="ds-img-preview">
                    <img src={content.hero_background_image} alt="Hero background" style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                  </div>
                )}
              </div>

              <div className="ds-form-actions">
                <button className="ds-save-btn" disabled={saving} onClick={handleSave}><Save size={13} /> {saving ? 'Saving…' : 'Save Changes'}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}