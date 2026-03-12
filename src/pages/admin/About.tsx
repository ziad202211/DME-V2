import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, ArrowLeft, Upload, Plus, Trash2, Edit } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { AboutContent, AboutSetting, AboutStatistic, TeamMember, AboutClient, AboutCertification } from '@/types/supabase';

const DS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
  .ds-root {
    --bg:#0d0f12;--bg-2:#13161b;--bg-3:#1a1e25;--border:#252a33;--border-2:#2f3540;
    --text:#e8eaf0;--muted:#6b7280;--accent:#f59e0b;--accent-2:#fbbf24;--red:#ef4444;--green:#10b981;--blue:#3b82f6;
    font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;
  }
  .ds-root*{box-sizing:border-box;margin:0;padding:0;}
  .ds-header{position:sticky;top:0;z-index:50;background:rgba(13,15,18,.88);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 2rem;height:60px;display:flex;align-items:center;justify-content:space-between;}
  .ds-header-left{display:flex;align-items:center;gap:14px;}
  .ds-back{display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:8px;border:1px solid var(--border-2);background:var(--bg-2);color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;}
  .ds-back:hover{color:var(--text);background:var(--bg-3);}
  .ds-header-title{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;letter-spacing:-.02em;}
  .ds-header-divider{width:1px;height:18px;background:var(--border-2);}
  .ds-preview{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;border:1px solid var(--border-2);background:var(--bg-2);color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;}
  .ds-preview:hover{color:var(--accent);border-color:rgba(245,158,11,.3);}
  .ds-main{max-width:900px;margin:0 auto;padding:32px 24px;}
  .ds-page-title{font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:800;letter-spacing:-.03em;margin-bottom:4px;}
  .ds-page-sub{font-size:13px;color:var(--muted);margin-bottom:28px;}
  .ds-tabs{display:flex;gap:2px;margin-bottom:24px;background:var(--bg-2);border:1px solid var(--border);border-radius:10px;padding:4px;width:fit-content;flex-wrap:wrap;}
  .ds-tab{padding:7px 18px;border-radius:7px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;color:var(--muted);border:none;background:none;font-family:'DM Sans',sans-serif;}
  .ds-tab.active{background:var(--bg-3);color:var(--text);box-shadow:0 1px 4px rgba(0,0,0,.35);}
  .ds-tab:hover:not(.active){color:var(--text);}
  .ds-panel{background:var(--bg-2);border:1px solid var(--border);border-radius:14px;overflow:hidden;}
  .ds-panel-header{padding:18px 22px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between;gap:12px;}
  .ds-panel-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;letter-spacing:-.01em;margin-bottom:3px;}
  .ds-panel-desc{font-size:12px;color:var(--muted);}
  .ds-add-btn{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.3);color:var(--accent);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;flex-shrink:0;}
  .ds-add-btn:hover{background:rgba(245,158,11,.18);}
  .ds-add-btn:disabled{opacity:.4;cursor:not-allowed;}
  .ds-edit-form{margin:16px 22px;padding:20px;background:var(--bg-3);border:1px solid var(--border-2);border-radius:11px;animation:fadeUp .2s ease;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  .ds-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px;}
  @media(max-width:600px){.ds-form-grid{grid-template-columns:1fr;}}
  .ds-field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px;}
  .ds-field:last-of-type{margin-bottom:0;}
  .ds-label{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-family:'DM Mono',monospace;}
  .ds-input{background:var(--bg-2);border:1px solid var(--border-2);border-radius:8px;padding:8px 12px;color:var(--text);font-size:13.5px;font-family:'DM Sans',sans-serif;transition:border-color .15s;outline:none;width:100%;}
  .ds-input:focus{border-color:rgba(245,158,11,.5);}
  .ds-input::placeholder{color:var(--muted);}
  .ds-textarea{background:var(--bg-2);border:1px solid var(--border-2);border-radius:8px;padding:10px 12px;color:var(--text);font-size:13.5px;font-family:'DM Sans',sans-serif;transition:border-color .15s;outline:none;resize:vertical;width:100%;min-height:100px;}
  .ds-textarea:focus{border-color:rgba(245,158,11,.5);}
  .ds-textarea::placeholder{color:var(--muted);}
  .ds-input-row{display:flex;gap:8px;align-items:center;}
  .ds-input-row .ds-input{flex:1;}
  .ds-upload-btn{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:8px;border:1px solid var(--border-2);background:var(--bg-2);color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;white-space:nowrap;font-family:'DM Sans',sans-serif;flex-shrink:0;}
  .ds-upload-btn:hover{color:var(--text);background:var(--bg-3);}
  .ds-img-preview{margin-top:10px;border-radius:8px;overflow:hidden;border:1px solid var(--border);}
  .ds-img-preview img{display:block;}
  .ds-form-actions{display:flex;gap:8px;margin-top:18px;padding-top:16px;border-top:1px solid var(--border);}
  .ds-save-btn{display:flex;align-items:center;gap:6px;padding:8px 18px;border-radius:8px;background:var(--accent);border:none;color:#0d0f12;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;}
  .ds-save-btn:hover{background:var(--accent-2);}
  .ds-save-btn:disabled{opacity:.5;cursor:not-allowed;}
  .ds-cancel-btn{display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;border:1px solid var(--border-2);background:transparent;color:var(--muted);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;font-family:'DM Sans',sans-serif;}
  .ds-cancel-btn:hover{color:var(--text);background:var(--bg-3);}
  .ds-item-list{padding:12px 22px 20px;display:flex;flex-direction:column;gap:8px;}
  .ds-item{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border-radius:10px;border:1px solid var(--border);background:var(--bg-3);transition:border-color .15s;}
  .ds-item:hover{border-color:var(--border-2);}
  .ds-item-body{flex:1;min-width:0;}
  .ds-item-title{font-size:14px;font-weight:600;margin-bottom:3px;}
  .ds-item-meta{font-size:11px;color:var(--muted);font-family:'DM Mono',monospace;}
  .ds-item-sub{font-size:12px;color:var(--muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .ds-item-actions{display:flex;gap:6px;flex-shrink:0;}
  .ds-icon-btn{width:32px;height:32px;border-radius:7px;border:1px solid var(--border-2);background:var(--bg-2);display:flex;align-items:center;justify-content:center;color:var(--muted);cursor:pointer;transition:all .15s;flex-shrink:0;}
  .ds-icon-btn:hover{color:var(--red);border-color:rgba(239,68,68,.3);background:rgba(239,68,68,.06);}
  .ds-icon-btn.edit:hover{color:var(--accent);border-color:rgba(245,158,11,.3);background:rgba(245,158,11,.06);}
  .ds-empty{padding:40px;text-align:center;color:var(--muted);font-size:13px;}
  ::-webkit-scrollbar{width:5px;}
  ::-webkit-scrollbar-track{background:transparent;}
  ::-webkit-scrollbar-thumb{background:var(--border-2);border-radius:10px;}
`;

// ── HeaderPhotoEditor ──
const HeaderPhotoEditor = ({ headerPhoto, setHeaderPhoto, saving, onSave, onUpload }: {
  headerPhoto: string; setHeaderPhoto: (v: string) => void;
  saving: boolean; onSave: () => void; onUpload: (f: File) => Promise<void>;
}) => (
  <div className="ds-panel">
    <div className="ds-panel-header">
      <div>
        <div className="ds-panel-title">Header Photo</div>
        <div className="ds-panel-desc">Hero image displayed at the top of the about page</div>
      </div>
    </div>
    <div style={{ padding: '20px 22px' }}>
      <div className="ds-field">
        <label className="ds-label">Photo URL</label>
        <div className="ds-input-row">
          <input className="ds-input" value={headerPhoto} onChange={(e) => setHeaderPhoto(e.target.value)} placeholder="https://..." />
          <input type="file" accept="image/*" id="header-photo-upload" style={{ display: 'none' }}
            onChange={async (e) => { const f = e.target.files?.[0]; if (f) await onUpload(f); }} />
          <button className="ds-upload-btn" onClick={() => document.getElementById('header-photo-upload')?.click()}>
            <Upload size={13} /> Upload
          </button>
        </div>
      </div>
      {headerPhoto && (
        <div className="ds-img-preview" style={{ marginBottom: 16 }}>
          <img src={headerPhoto} alt="Header preview" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
        </div>
      )}
      <button className="ds-save-btn" disabled={saving} onClick={onSave}>
        <Save size={13} /> {saving ? 'Saving…' : 'Save Header Photo'}
      </button>
    </div>
  </div>
);

// ── StatisticsEditor ──
const StatisticsEditor = ({ statistics, editingItem, setEditingItem, saving, onSave, onDelete, createNew }: {
  statistics: AboutStatistic[]; editingItem: any; setEditingItem: (v: any) => void;
  saving: boolean; onSave: (i: AboutStatistic) => void; onDelete: (id: string) => void; createNew: () => AboutStatistic;
}) => {
  const editing = editingItem && 'label' in editingItem ? editingItem as AboutStatistic : null;
  return (
    <div className="ds-panel">
      <div className="ds-panel-header">
        <div>
          <div className="ds-panel-title">Statistics</div>
          <div className="ds-panel-desc">Key numbers displayed on the about page</div>
        </div>
        <button className="ds-add-btn" disabled={!!editing} onClick={() => setEditingItem(createNew())}><Plus size={13} /> Add Statistic</button>
      </div>
      {editing && (
        <div className="ds-edit-form">
          <div className="ds-form-grid">
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Label</label>
              <input className="ds-input" value={editing.label || ''} onChange={(e) => setEditingItem({ ...editing, label: e.target.value })} placeholder="e.g. Years Experience" />
            </div>
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Number</label>
              <input className="ds-input" value={editing.number || ''} onChange={(e) => setEditingItem({ ...editing, number: e.target.value })} placeholder="e.g. 50+" />
            </div>
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Icon Name</label>
              <input className="ds-input" value={editing.icon_name || ''} onChange={(e) => setEditingItem({ ...editing, icon_name: e.target.value })} placeholder="e.g. Building2, Users" />
            </div>
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Order</label>
              <input className="ds-input" type="number" value={editing.order_index} onChange={(e) => setEditingItem({ ...editing, order_index: parseInt(e.target.value) })} />
            </div>
          </div>
          <div className="ds-form-actions">
            <button className="ds-save-btn" disabled={saving} onClick={() => onSave(editing)}><Save size={13} /> {saving ? 'Saving…' : 'Save'}</button>
            <button className="ds-cancel-btn" onClick={() => setEditingItem(null)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="ds-item-list">
        {statistics.map(stat => (
          <div key={stat.id} className="ds-item">
            <div className="ds-item-body">
              <div className="ds-item-title">{stat.label}: <span style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>{stat.number}</span></div>
              <div className="ds-item-meta">icon: {stat.icon_name} · order: {stat.order_index}</div>
            </div>
            <div className="ds-item-actions">
              <button className="ds-icon-btn edit" onClick={() => setEditingItem(stat)}><Edit size={13} /></button>
              <button className="ds-icon-btn" onClick={() => onDelete(stat.id)}><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
        {statistics.length === 0 && !editing && <div className="ds-empty">No statistics yet — click Add Statistic.</div>}
      </div>
    </div>
  );
};

// ── TeamEditor ──
const TeamEditor = ({ teamMembers, editingItem, setEditingItem, saving, onSave, onDelete, createNew, onUpload }: {
  teamMembers: TeamMember[]; editingItem: any; setEditingItem: (v: any) => void;
  saving: boolean; onSave: (i: TeamMember) => void; onDelete: (id: string) => void;
  createNew: () => TeamMember; onUpload: (f: File, id: string) => Promise<string | null>;
}) => {
  const editing = editingItem && 'name' in editingItem && 'position' in editingItem ? editingItem as TeamMember : null;
  return (
    <div className="ds-panel">
      <div className="ds-panel-header">
        <div>
          <div className="ds-panel-title">Team Members</div>
          <div className="ds-panel-desc">Name, position, photo, description, and LinkedIn</div>
        </div>
        <button className="ds-add-btn" disabled={!!editing} onClick={() => setEditingItem(createNew())}><Plus size={13} /> Add Member</button>
      </div>
      {editing && (
        <div className="ds-edit-form">
          <div className="ds-form-grid">
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Name</label>
              <input className="ds-input" id="team-name" value={editing.name || ''} onChange={(e) => setEditingItem({ ...editing, name: e.target.value })} placeholder="Full name" />
            </div>
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Position</label>
              <input className="ds-input" id="team-position" value={editing.position || ''} onChange={(e) => setEditingItem({ ...editing, position: e.target.value })} placeholder="Job title" />
            </div>
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">LinkedIn URL</label>
              <input className="ds-input" id="team-linkedin" value={editing.linkedin_url || ''} onChange={(e) => setEditingItem({ ...editing, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Order</label>
              <input className="ds-input" id="team-order" type="number" value={editing.order_index} onChange={(e) => setEditingItem({ ...editing, order_index: parseInt(e.target.value) })} />
            </div>
          </div>
          <div className="ds-field">
            <label className="ds-label">Description</label>
            <textarea className="ds-textarea" id="team-description" rows={4} value={editing.description || ''} onChange={(e) => setEditingItem({ ...editing, description: e.target.value })} placeholder="Brief role and expertise…" />
          </div>
          <div className="ds-field">
            <label className="ds-label">Photo URL</label>
            <div className="ds-input-row">
              <input className="ds-input" id="team-photo" value={editing.photo_url || ''} onChange={(e) => setEditingItem({ ...editing, photo_url: e.target.value })} placeholder="https://..." />
              <input type="file" accept="image/*" id="team-photo-upload" style={{ display: 'none' }}
                onChange={async (e) => { const f = e.target.files?.[0]; if (f) { const u = await onUpload(f, editing.id || 'new'); if (u) setEditingItem({ ...editing, photo_url: u }); } }} />
              <button className="ds-upload-btn" onClick={() => document.getElementById('team-photo-upload')?.click()}><Upload size={13} /> Upload</button>
            </div>
            {editing.photo_url && <div className="ds-img-preview" style={{ display: 'inline-block', marginTop: 10 }}><img src={editing.photo_url} alt="Preview" style={{ width: 80, height: 80, objectFit: 'cover' }} /></div>}
          </div>
          <div className="ds-form-actions">
            <button className="ds-save-btn" disabled={saving} onClick={() => onSave(editing)}><Save size={13} /> {saving ? 'Saving…' : 'Save'}</button>
            <button className="ds-cancel-btn" onClick={() => setEditingItem(null)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="ds-item-list">
        {teamMembers.map(member => (
          <div key={member.id} className="ds-item">
            {member.photo_url && <img src={member.photo_url} alt={member.name} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8, border: '1px solid var(--border)', flexShrink: 0 }} />}
            <div className="ds-item-body">
              <div className="ds-item-title">{member.name}</div>
              <div className="ds-item-sub">{member.position}</div>
              <div className="ds-item-meta">order: {member.order_index}</div>
            </div>
            <div className="ds-item-actions">
              <button className="ds-icon-btn edit" onClick={() => setEditingItem(member)}><Edit size={13} /></button>
              <button className="ds-icon-btn" onClick={() => onDelete(member.id)}><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
        {teamMembers.length === 0 && !editing && <div className="ds-empty">No team members yet — click Add Member.</div>}
      </div>
    </div>
  );
};

// ── AboutSectionEditor ──
const AboutSectionEditor = ({ section, title, items, editingItem, setEditingItem, saving, onSave, onDelete, createNew, onUpload }: {
  section: string; title: string; items: AboutContent[]; editingItem: any; setEditingItem: (v: any) => void;
  saving: boolean; onSave: (i: AboutContent) => void; onDelete: (id: string) => void;
  createNew: (s: string) => AboutContent; onUpload: (f: File, id: string) => Promise<string | null>;
}) => {
  const editing = editingItem && 'section' in editingItem && editingItem.section === section ? editingItem as AboutContent : null;
  return (
    <div className="ds-panel">
      <div className="ds-panel-header">
        <div>
          <div className="ds-panel-title">{title}</div>
          <div className="ds-panel-desc">Manage {title.toLowerCase()} content</div>
        </div>
        <button className="ds-add-btn" disabled={!!editing} onClick={() => setEditingItem(createNew(section))}><Plus size={13} /> Add Section</button>
      </div>
      {editing && (
        <div className="ds-edit-form">
          <div className="ds-form-grid">
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Title</label>
              <input className="ds-input" id={`${section}-title`} value={editing.title || ''} onChange={(e) => setEditingItem({ ...editing, title: e.target.value })} placeholder="Enter title" />
            </div>
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Order</label>
              <input className="ds-input" id={`${section}-order`} type="number" value={editing.order_index} onChange={(e) => setEditingItem({ ...editing, order_index: parseInt(e.target.value) })} />
            </div>
          </div>
          <div className="ds-field">
            <label className="ds-label">Content</label>
            <textarea className="ds-textarea" id={`${section}-content`} rows={6} value={editing.content || ''} onChange={(e) => setEditingItem({ ...editing, content: e.target.value })} placeholder="Enter content…" />
          </div>
          <div className="ds-field">
            <label className="ds-label">Image URL</label>
            <div className="ds-input-row">
              <input className="ds-input" id={`${section}-image`} value={editing.image_url || ''} onChange={(e) => setEditingItem({ ...editing, image_url: e.target.value })} placeholder="https://..." />
              <input type="file" accept="image/*" id={`${section}-image-upload`} style={{ display: 'none' }}
                onChange={async (e) => { const f = e.target.files?.[0]; if (f) { const u = await onUpload(f, editing.id || 'new'); if (u) setEditingItem({ ...editing, image_url: u }); } }} />
              <button className="ds-upload-btn" onClick={() => document.getElementById(`${section}-image-upload`)?.click()}><Upload size={13} /> Upload</button>
            </div>
            {editing.image_url && <div className="ds-img-preview"><img src={editing.image_url} alt="Preview" style={{ width: '100%', height: 120, objectFit: 'cover' }} /></div>}
          </div>
          <div className="ds-form-actions">
            <button className="ds-save-btn" disabled={saving} onClick={() => onSave(editing)}><Save size={13} /> {saving ? 'Saving…' : 'Save'}</button>
            <button className="ds-cancel-btn" onClick={() => setEditingItem(null)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="ds-item-list">
        {items.map(item => (
          <div key={item.id} className="ds-item">
            <div className="ds-item-body">
              <div className="ds-item-title">{item.title || <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Untitled</span>}</div>
              {item.content && <div className="ds-item-sub">{item.content.slice(0, 80)}{item.content.length > 80 ? '…' : ''}</div>}
              <div className="ds-item-meta">order: {item.order_index}</div>
            </div>
            {item.image_url && <img src={item.image_url} alt={item.title} style={{ width: 64, height: 44, objectFit: 'cover', borderRadius: 7, border: '1px solid var(--border)', flexShrink: 0 }} />}
            <div className="ds-item-actions">
              <button className="ds-icon-btn edit" onClick={() => setEditingItem(item)}><Edit size={13} /></button>
              <button className="ds-icon-btn" onClick={() => onDelete(item.id)}><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && !editing && <div className="ds-empty">No {title.toLowerCase()} content yet — click Add Section.</div>}
      </div>
    </div>
  );
};

// ── ClientsEditor ──
const ClientsEditor = ({ clients, editingItem, setEditingItem, saving, onSave, onDelete, createNew, onUpload }: {
  clients: AboutClient[]; editingItem: any; setEditingItem: (v: any) => void;
  saving: boolean; onSave: (i: AboutClient) => void; onDelete: (id: string) => void;
  createNew: () => AboutClient; onUpload: (f: File, id: string, type: string) => Promise<string | null>;
}) => {
  const editing = editingItem && 'logo_url' in editingItem ? editingItem as AboutClient : null;
  return (
    <div className="ds-panel">
      <div className="ds-panel-header">
        <div>
          <div className="ds-panel-title">Clients</div>
          <div className="ds-panel-desc">Manage client logos and information</div>
        </div>
        <button className="ds-add-btn" disabled={!!editing} onClick={() => setEditingItem(createNew())}><Plus size={13} /> Add Client</button>
      </div>
      {editing && (
        <div className="ds-edit-form">
          <div className="ds-form-grid">
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Client Name</label>
              <input className="ds-input" id="client-name" value={editing.name || ''} onChange={(e) => setEditingItem({ ...editing, name: e.target.value })} placeholder="Client name" />
            </div>
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Order</label>
              <input className="ds-input" id="client-order" type="number" value={editing.order_index} onChange={(e) => setEditingItem({ ...editing, order_index: parseInt(e.target.value) })} />
            </div>
          </div>
          <div className="ds-field">
            <label className="ds-label">Logo URL</label>
            <div className="ds-input-row">
              <input className="ds-input" id="client-logo" value={editing.logo_url || ''} onChange={(e) => setEditingItem({ ...editing, logo_url: e.target.value })} placeholder="https://..." />
              <input type="file" accept="image/*" id="client-logo-upload" style={{ display: 'none' }}
                onChange={async (e) => { const f = e.target.files?.[0]; if (f) { const u = await onUpload(f, editing.id || 'new', 'client'); if (u) setEditingItem({ ...editing, logo_url: u }); } }} />
              <button className="ds-upload-btn" onClick={() => document.getElementById('client-logo-upload')?.click()}><Upload size={13} /> Upload</button>
            </div>
            {editing.logo_url && <div className="ds-img-preview" style={{ display: 'inline-block', padding: 10, background: 'var(--bg-2)' }}><img src={editing.logo_url} alt="Logo preview" style={{ height: 48, width: 'auto', objectFit: 'contain' }} /></div>}
          </div>
          <div className="ds-form-actions">
            <button className="ds-save-btn" disabled={saving} onClick={() => onSave(editing)}><Save size={13} /> {saving ? 'Saving…' : 'Save'}</button>
            <button className="ds-cancel-btn" onClick={() => setEditingItem(null)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="ds-item-list">
        {clients.map(client => (
          <div key={client.id} className="ds-item">
            {client.logo_url && (
              <div style={{ background: 'var(--bg-2)', borderRadius: 7, padding: '6px 10px', border: '1px solid var(--border)', flexShrink: 0 }}>
                <img src={client.logo_url} alt={client.name} style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
              </div>
            )}
            <div className="ds-item-body">
              <div className="ds-item-title">{client.name}</div>
              <div className="ds-item-meta">order: {client.order_index}</div>
            </div>
            <div className="ds-item-actions">
              <button className="ds-icon-btn edit" onClick={() => setEditingItem(client)}><Edit size={13} /></button>
              <button className="ds-icon-btn" onClick={() => onDelete(client.id)}><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
        {clients.length === 0 && !editing && <div className="ds-empty">No clients yet — click Add Client.</div>}
      </div>
    </div>
  );
};

// ── CertificationsEditor ──
const CertificationsEditor = ({ certifications, editingItem, setEditingItem, saving, onSave, onDelete, createNew, onUpload }: {
  certifications: AboutCertification[]; editingItem: any; setEditingItem: (v: any) => void;
  saving: boolean; onSave: (i: AboutCertification) => void; onDelete: (id: string) => void;
  createNew: () => AboutCertification; onUpload: (f: File, id: string, type: string) => Promise<string | null>;
}) => {
  const editing = editingItem && 'image_url' in editingItem && 'name' in editingItem && !('logo_url' in editingItem) ? editingItem as AboutCertification : null;
  return (
    <div className="ds-panel">
      <div className="ds-panel-header">
        <div>
          <div className="ds-panel-title">Certifications</div>
          <div className="ds-panel-desc">Manage certification images and information</div>
        </div>
        <button className="ds-add-btn" disabled={!!editing} onClick={() => setEditingItem(createNew())}><Plus size={13} /> Add Certification</button>
      </div>
      {editing && (
        <div className="ds-edit-form">
          <div className="ds-form-grid">
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Certification Name</label>
              <input className="ds-input" id="cert-name" value={editing.name || ''} onChange={(e) => setEditingItem({ ...editing, name: e.target.value })} placeholder="Certification name" />
            </div>
            <div className="ds-field" style={{ marginBottom: 0 }}>
              <label className="ds-label">Order</label>
              <input className="ds-input" id="cert-order" type="number" value={editing.order_index} onChange={(e) => setEditingItem({ ...editing, order_index: parseInt(e.target.value) })} />
            </div>
          </div>
          <div className="ds-field">
            <label className="ds-label">Image URL</label>
            <div className="ds-input-row">
              <input className="ds-input" id="cert-image" value={editing.image_url || ''} onChange={(e) => setEditingItem({ ...editing, image_url: e.target.value })} placeholder="https://..." />
              <input type="file" accept="image/*" id="cert-image-upload" style={{ display: 'none' }}
                onChange={async (e) => { const f = e.target.files?.[0]; if (f) { const u = await onUpload(f, editing.id || 'new', 'certification'); if (u) setEditingItem({ ...editing, image_url: u }); } }} />
              <button className="ds-upload-btn" onClick={() => document.getElementById('cert-image-upload')?.click()}><Upload size={13} /> Upload</button>
            </div>
            {editing.image_url && <div className="ds-img-preview" style={{ display: 'inline-block', marginTop: 10 }}><img src={editing.image_url} alt="Preview" style={{ height: 72, width: 'auto', objectFit: 'contain' }} /></div>}
          </div>
          <div className="ds-form-actions">
            <button className="ds-save-btn" disabled={saving} onClick={() => onSave(editing)}><Save size={13} /> {saving ? 'Saving…' : 'Save'}</button>
            <button className="ds-cancel-btn" onClick={() => setEditingItem(null)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="ds-item-list">
        {certifications.map(cert => (
          <div key={cert.id} className="ds-item">
            {cert.image_url && (
              <div style={{ background: 'var(--bg-2)', borderRadius: 7, padding: '6px 10px', border: '1px solid var(--border)', flexShrink: 0 }}>
                <img src={cert.image_url} alt={cert.name} style={{ height: 36, width: 'auto', objectFit: 'contain' }} />
              </div>
            )}
            <div className="ds-item-body">
              <div className="ds-item-title">{cert.name}</div>
              <div className="ds-item-meta">order: {cert.order_index}</div>
            </div>
            <div className="ds-item-actions">
              <button className="ds-icon-btn edit" onClick={() => setEditingItem(cert)}><Edit size={13} /></button>
              <button className="ds-icon-btn" onClick={() => onDelete(cert.id)}><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
        {certifications.length === 0 && !editing && <div className="ds-empty">No certifications yet — click Add Certification.</div>}
      </div>
    </div>
  );
};

// ── Parent ──
export default function AdminAbout() {
  const [content, setContent] = useState<AboutContent[]>([]);
  const [settings, setSettings] = useState<AboutSetting[]>([]);
  const [statistics, setStatistics] = useState<AboutStatistic[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [clients, setClients] = useState<AboutClient[]>([]);
  const [certifications, setCertifications] = useState<AboutCertification[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('header');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [headerPhoto, setHeaderPhoto] = useState('');
  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [contentRes, settingsRes, statsRes, teamRes, clientsRes, certsRes] = await Promise.all([
        supabase.from('about_content').select('*').order('order_index', { ascending: true }),
        supabase.from('about_settings').select('*'),
        supabase.from('about_statistics').select('*').order('order_index', { ascending: true }),
        supabase.from('team_members').select('*').order('order_index', { ascending: true }),
        supabase.from('about_clients').select('*').order('order_index', { ascending: true }),
        supabase.from('about_certifications').select('*').order('order_index', { ascending: true })
      ]);
      if (contentRes.error) throw contentRes.error;
      setContent(contentRes.data || []);
      setSettings(settingsRes.data || []);
      setStatistics(statsRes.data || []);
      setTeamMembers(teamRes.data || []);
      setClients(clientsRes.data || []);
      setCertifications(certsRes.data || []);
      setHeaderPhoto(settingsRes.data?.find(s => s.key === 'header_photo_url')?.value || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSave = async (item: any, type: 'content' | 'statistic' | 'team' | 'client' | 'certification') => {
    setSaving(true);
    try {
      const table = type === 'content' ? 'about_content' : type === 'statistic' ? 'about_statistics' : type === 'team' ? 'team_members' : type === 'client' ? 'about_clients' : 'about_certifications';
      const { error } = await supabase.from(table).upsert(item);
      if (error) throw error;
      await fetchData(); setEditingItem(null);
    } catch (e) { console.error(e); alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string, type: 'content' | 'statistic' | 'team' | 'client' | 'certification') => {
    if (!confirm(`Delete this ${type}?`)) return;
    try {
      const table = type === 'content' ? 'about_content' : type === 'statistic' ? 'about_statistics' : type === 'team' ? 'team_members' : type === 'client' ? 'about_clients' : 'about_certifications';
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      await fetchData();
    } catch (e) { console.error(e); }
  };

  const handleHeaderPhotoSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from('about_settings').upsert({ key: 'header_photo_url', value: headerPhoto });
      if (error) throw error;
    } catch (e) { alert('Failed to save header photo'); }
    finally { setSaving(false); }
  };

  const handleImageUpload = async (file: File, itemId: string, imageType?: string) => {
    try {
      const fileName = `about-${imageType ? imageType + '-' : ''}${itemId}-${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from('about-images').upload(fileName, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('about-images').getPublicUrl(fileName);
      return publicUrl;
    } catch (e) { alert('Failed to upload image'); return null; }
  };

  const getContentBySection = (s: string) => content.filter(i => i.section === s);

  const tabs = [
    { key: 'header', label: 'Header' },
    { key: 'statistics', label: 'Statistics' },
    { key: 'team', label: 'Team' },
    { key: 'clients', label: 'Clients' },
    { key: 'certifications', label: 'Certifications' },
  ];

  if (loading) return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DS }} />
      <div className="ds-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)', fontFamily: 'DM Mono, monospace', fontSize: 13 }}>Loading…</div>
    </>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DS }} />
      <div className="ds-root">
        <header className="ds-header">
          <div className="ds-header-left">
            <button className="ds-back" onClick={() => navigate('/admin/dashboard')}><ArrowLeft size={13} /> Back</button>
            <div className="ds-header-divider" />
            <span className="ds-header-title">About Page Editor</span>
          </div>
          <button className="ds-preview" onClick={() => window.open('/about', '_blank')}><Eye size={13} /> Preview</button>
        </header>

        <main className="ds-main">
          <div className="ds-page-title">About</div>
          <div className="ds-page-sub">Manage all content displayed on the about page.</div>

          <div className="ds-tabs">
            {tabs.map(t => (
              <button key={t.key} className={`ds-tab ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>{t.label}</button>
            ))}
          </div>

          {activeTab === 'header' && (
            <HeaderPhotoEditor headerPhoto={headerPhoto} setHeaderPhoto={setHeaderPhoto} saving={saving} onSave={handleHeaderPhotoSave}
              onUpload={async (f) => { const u = await handleImageUpload(f, 'header-photo'); if (u) setHeaderPhoto(u); }} />
          )}
          {activeTab === 'statistics' && (
            <StatisticsEditor statistics={statistics} editingItem={editingItem} setEditingItem={setEditingItem} saving={saving}
              onSave={i => handleSave(i, 'statistic')} onDelete={id => handleDelete(id, 'statistic')}
              createNew={() => ({ id: crypto.randomUUID(), label: '', number: '', icon_name: 'Award', order_index: statistics.length, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })} />
          )}
          {activeTab === 'team' && (
            <TeamEditor teamMembers={teamMembers} editingItem={editingItem} setEditingItem={setEditingItem} saving={saving}
              onSave={i => handleSave(i, 'team')} onDelete={id => handleDelete(id, 'team')} onUpload={handleImageUpload}
              createNew={() => ({ id: crypto.randomUUID(), name: '', position: '', photo_url: '', description: '', linkedin_url: '', order_index: teamMembers.length, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })} />
          )}
          {activeTab === 'clients' && (
            <ClientsEditor clients={clients} editingItem={editingItem} setEditingItem={setEditingItem} saving={saving}
              onSave={i => handleSave(i, 'client')} onDelete={id => handleDelete(id, 'client')} onUpload={handleImageUpload}
              createNew={() => ({ id: crypto.randomUUID(), name: '', logo_url: '', order_index: clients.length, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })} />
          )}
          {activeTab === 'certifications' && (
            <CertificationsEditor certifications={certifications} editingItem={editingItem} setEditingItem={setEditingItem} saving={saving}
              onSave={i => handleSave(i, 'certification')} onDelete={id => handleDelete(id, 'certification')} onUpload={handleImageUpload}
              createNew={() => ({ id: crypto.randomUUID(), name: '', image_url: '', order_index: certifications.length, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })} />
          )}
        </main>
      </div>
    </>
  );
}