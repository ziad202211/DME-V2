import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, ArrowLeft, MapPin, Phone, Mail, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import '@/styles/admin-ds.css';

interface ContactSettings {
  contact_title: string;
  contact_description: string;
  addresses: string[];
  phone_numbers: string[];
  emails: string[];
}

const DEFAULT: ContactSettings = {
  contact_title: '', 
  contact_description: '',
  addresses: [''],
  phone_numbers: [''],
  emails: ['']
};

export default function AdminContact() {
  const [settings, setSettings] = useState<ContactSettings>(DEFAULT);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [tab, setTab]           = useState('general');
  const navigate = useNavigate();

  useEffect(() => { fetchContactSettings(); }, []);

  const fetchContactSettings = async () => {
    try {
      const { data, error } = await supabase.from('contact_settings').select('*').single();
      if (error && error.code !== 'PGRST116') throw error;
      if (data) setSettings(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from('contact_settings').upsert(settings, { onConflict: 'id' });
      if (error) throw error;
    } catch (e) { console.error(e); alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const set = (field: keyof ContactSettings, value: any) =>
    setSettings(prev => ({ ...prev, [field]: value }));

  const updateArray = (field: 'addresses' | 'phone_numbers' | 'emails', index: number, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'addresses' | 'phone_numbers' | 'emails') => {
    setSettings(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'addresses' | 'phone_numbers' | 'emails', index: number) => {
    setSettings(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const tabs = [
    { key: 'general',      label: 'General' },
    { key: 'contact-info', label: 'Contact Info' },
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
          <span className="ds-header-title">Contact Page Editor</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="ds-preview" onClick={() => window.open('/contact', '_blank')}>
            <Eye size={13} /> Preview
          </button>
          <button className="ds-save-btn" disabled={saving} onClick={handleSave}>
            <Save size={13} /> {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="ds-main">
        <div className="ds-page-title">Contact</div>
        <div className="ds-page-sub">Manage all content displayed on the contact page.</div>

        {/* Tabs */}
        <div className="ds-tabs">
          {tabs.map(t => (
            <button key={t.key} className={`ds-tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* General */}
        {tab === 'general' && (
          <div className="ds-panel">
            <div className="ds-panel-header">
              <div>
                <div className="ds-panel-title">General Settings</div>
                <div className="ds-panel-desc">Basic contact page information</div>
              </div>
            </div>
            <div className="ds-edit-form" style={{ margin: '20px 22px' }}>
              <div className="ds-field">
                <label className="ds-label">Page Title</label>
                <input className="ds-input" value={settings.contact_title} onChange={e => set('contact_title', e.target.value)} placeholder="Contact Us" />
              </div>
              <div className="ds-field">
                <label className="ds-label">Page Description</label>
                <textarea className="ds-textarea" rows={4} value={settings.contact_description} onChange={e => set('contact_description', e.target.value)} placeholder="Get in touch with us for your engineering and project management needs." />
              </div>
              <div className="ds-form-actions">
                <button className="ds-save-btn" disabled={saving} onClick={handleSave}><Save size={13} /> {saving ? 'Saving…' : 'Save Changes'}</button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info */}
        {tab === 'contact-info' && (
          <div className="ds-panel">
            <div className="ds-panel-header">
              <div>
                <div className="ds-panel-title">Contact Information</div>
                <div className="ds-panel-desc">Manage multiple addresses, phone numbers, and emails</div>
              </div>
            </div>
            <div className="ds-edit-form" style={{ margin: '20px 22px' }}>
              
              {/* Addresses */}
              <div className="ds-field" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label className="ds-label"><MapPin size={11} style={{ display: 'inline', marginRight: 4 }} />Addresses</label>
                  <button 
                    type="button" 
                    className="ds-save-btn" 
                    onClick={() => addArrayItem('addresses')}
                    style={{ padding: '4px 8px', fontSize: 12 }}
                  >
                    <Plus size={11} /> Add Address
                  </button>
                </div>
                {settings.addresses.map((address, index) => (
                  <div key={index} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <textarea 
                      className="ds-textarea" 
                      rows={2} 
                      value={address} 
                      onChange={e => updateArray('addresses', index, e.target.value)} 
                      placeholder="Enter address..." 
                      style={{ flex: 1 }}
                    />
                    {settings.addresses.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeArrayItem('addresses', index)}
                        className="ds-save-btn"
                        style={{ padding: '8px', backgroundColor: 'var(--destructive)' }}
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Phone Numbers */}
              <div className="ds-field" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label className="ds-label"><Phone size={11} style={{ display: 'inline', marginRight: 4 }} />Phone Numbers</label>
                  <button 
                    type="button" 
                    className="ds-save-btn" 
                    onClick={() => addArrayItem('phone_numbers')}
                    style={{ padding: '4px 8px', fontSize: 12 }}
                  >
                    <Plus size={11} /> Add Phone
                  </button>
                </div>
                {settings.phone_numbers.map((phone, index) => (
                  <div key={index} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input 
                      className="ds-input" 
                      value={phone} 
                      onChange={e => updateArray('phone_numbers', index, e.target.value)} 
                      placeholder="Enter phone number..." 
                      style={{ flex: 1 }}
                    />
                    {settings.phone_numbers.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeArrayItem('phone_numbers', index)}
                        className="ds-save-btn"
                        style={{ padding: '8px', backgroundColor: 'var(--destructive)' }}
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Emails */}
              <div className="ds-field" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label className="ds-label"><Mail size={11} style={{ display: 'inline', marginRight: 4 }} />Email Addresses</label>
                  <button 
                    type="button" 
                    className="ds-save-btn" 
                    onClick={() => addArrayItem('emails')}
                    style={{ padding: '4px 8px', fontSize: 12 }}
                  >
                    <Plus size={11} /> Add Email
                  </button>
                </div>
                {settings.emails.map((email, index) => (
                  <div key={index} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input 
                      className="ds-input" 
                      type="email" 
                      value={email} 
                      onChange={e => updateArray('emails', index, e.target.value)} 
                      placeholder="Enter email address..." 
                      style={{ flex: 1 }}
                    />
                    {settings.emails.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeArrayItem('emails', index)}
                        className="ds-save-btn"
                        style={{ padding: '8px', backgroundColor: 'var(--destructive)' }}
                      >
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="ds-form-actions">
                <button className="ds-save-btn" disabled={saving} onClick={handleSave}>
                  <Save size={13} /> {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        </main>
    </div>
  );
}