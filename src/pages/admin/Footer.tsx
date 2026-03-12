import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Trash2, Edit, Save, Eye } from "lucide-react"
import { supabase } from "@/lib/supabase"

// ── Design System (shared across all admin pages) ──
const DS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .ds-root {
    --bg:       #0d0f12;
    --bg-2:     #13161b;
    --bg-3:     #1a1e25;
    --border:   #252a33;
    --border-2: #2f3540;
    --text:     #e8eaf0;
    --muted:    #6b7280;
    --accent:   #f59e0b;
    --accent-2: #fbbf24;
    --red:      #ef4444;
    --green:    #10b981;
    --blue:     #3b82f6;
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }
  .ds-root * { box-sizing: border-box; margin: 0; padding: 0; }

  /* Header */
  .ds-header {
    position: sticky; top: 0; z-index: 50;
    background: rgba(13,15,18,0.88);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem; height: 60px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .ds-header-left { display: flex; align-items: center; gap: 14px; }
  .ds-back {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 12px; border-radius: 8px;
    border: 1px solid var(--border-2); background: var(--bg-2);
    color: var(--muted); font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .ds-back:hover { color: var(--text); background: var(--bg-3); }
  .ds-header-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem; font-weight: 700;
    letter-spacing: -0.02em;
  }
  .ds-header-divider { width: 1px; height: 18px; background: var(--border-2); }
  .ds-preview {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 14px; border-radius: 8px;
    border: 1px solid var(--border-2); background: var(--bg-2);
    color: var(--muted); font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .ds-preview:hover { color: var(--accent); border-color: rgba(245,158,11,0.3); }

  /* Main */
  .ds-main { max-width: 860px; margin: 0 auto; padding: 32px 24px; }

  /* Page heading */
  .ds-page-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem; font-weight: 800;
    letter-spacing: -0.03em; margin-bottom: 4px;
  }
  .ds-page-sub { font-size: 13px; color: var(--muted); margin-bottom: 28px; }

  /* Tabs */
  .ds-tabs {
    display: flex; gap: 2px; margin-bottom: 24px;
    background: var(--bg-2); border: 1px solid var(--border);
    border-radius: 10px; padding: 4px; width: fit-content;
  }
  .ds-tab {
    padding: 7px 20px; border-radius: 7px;
    font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.15s;
    color: var(--muted); border: none; background: none;
    font-family: 'DM Sans', sans-serif;
  }
  .ds-tab.active { background: var(--bg-3); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,0.35); }
  .ds-tab:hover:not(.active) { color: var(--text); }

  /* Panel */
  .ds-panel {
    background: var(--bg-2); border: 1px solid var(--border);
    border-radius: 14px; overflow: hidden;
  }
  .ds-panel-header {
    padding: 18px 22px; border-bottom: 1px solid var(--border);
    display: flex; align-items: flex-start; justify-content: space-between;
  }
  .ds-panel-title {
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700; letter-spacing: -0.01em;
    margin-bottom: 3px;
  }
  .ds-panel-desc { font-size: 12px; color: var(--muted); }
  .ds-add-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 14px; border-radius: 8px;
    background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3);
    color: var(--accent); font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.15s;
    font-family: 'DM Sans', sans-serif; flex-shrink: 0;
  }
  .ds-add-btn:hover { background: rgba(245,158,11,0.18); }
  .ds-add-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* Edit form */
  .ds-edit-form {
    margin: 16px 22px; padding: 20px;
    background: var(--bg-3); border: 1px solid var(--border-2);
    border-radius: 11px;
    animation: fadeUp 0.2s ease;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ds-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
  @media (max-width: 600px) { .ds-form-grid { grid-template-columns: 1fr; } }

  .ds-field { display: flex; flex-direction: column; gap: 6px; }
  .ds-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--muted);
    font-family: 'DM Mono', monospace;
  }
  .ds-input {
    background: var(--bg-2); border: 1px solid var(--border-2);
    border-radius: 8px; padding: 8px 12px;
    color: var(--text); font-size: 13.5px;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.15s; outline: none;
    width: 100%;
  }
  .ds-input:focus { border-color: rgba(245,158,11,0.5); }
  .ds-input::placeholder { color: var(--muted); }
  .ds-textarea {
    background: var(--bg-2); border: 1px solid var(--border-2);
    border-radius: 8px; padding: 10px 12px;
    color: var(--text); font-size: 13.5px;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.15s; outline: none;
    resize: vertical; width: 100%; min-height: 80px;
  }
  .ds-textarea:focus { border-color: rgba(245,158,11,0.5); }

  /* Sub-section within form */
  .ds-sub-label {
    font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--muted);
    font-family: 'DM Mono', monospace;
    margin-bottom: 8px; margin-top: 4px;
  }
  .ds-field-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .ds-row { display: flex; gap: 8px; align-items: center; }
  .ds-row .ds-input { flex: 1; }

  /* Ghost icon btn */
  .ds-icon-btn {
    width: 34px; height: 34px; border-radius: 7px;
    border: 1px solid var(--border-2); background: var(--bg-2);
    display: flex; align-items: center; justify-content: center;
    color: var(--muted); cursor: pointer; transition: all 0.15s;
    flex-shrink: 0;
  }
  .ds-icon-btn:hover { color: var(--red); border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.06); }
  .ds-icon-btn.edit:hover { color: var(--accent); border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.06); }

  /* Small add link btn */
  .ds-small-add {
    display: flex; align-items: center; gap: 5px;
    padding: 6px 12px; border-radius: 7px;
    border: 1px dashed var(--border-2); background: transparent;
    color: var(--muted); font-size: 12.5px; font-weight: 500;
    cursor: pointer; transition: all 0.15s;
    font-family: 'DM Sans', sans-serif; margin-top: 4px;
  }
  .ds-small-add:hover { color: var(--text); border-color: var(--border-2); }

  /* Form actions */
  .ds-form-actions { display: flex; gap: 8px; margin-top: 18px; padding-top: 16px; border-top: 1px solid var(--border); }
  .ds-save-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 18px; border-radius: 8px;
    background: var(--accent); border: none;
    color: #0d0f12; font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .ds-save-btn:hover { background: var(--accent-2); }
  .ds-save-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .ds-cancel-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 8px;
    border: 1px solid var(--border-2); background: transparent;
    color: var(--muted); font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .ds-cancel-btn:hover { color: var(--text); background: var(--bg-3); }

  /* Item list */
  .ds-item-list { padding: 12px 22px 20px; display: flex; flex-direction: column; gap: 8px; }
  .ds-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; border-radius: 10px;
    border: 1px solid var(--border); background: var(--bg-3);
    transition: border-color 0.15s;
  }
  .ds-item:hover { border-color: var(--border-2); }
  .ds-item-title { font-size: 14px; font-weight: 600; margin-bottom: 3px; }
  .ds-item-meta { font-size: 11px; color: var(--muted); font-family: 'DM Mono', monospace; }
  .ds-item-actions { display: flex; gap: 6px; }

  .ds-empty { padding: 40px; text-align: center; color: var(--muted); font-size: 13px; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 10px; }
`

// ── Types ──
type FooterItem = {
  id: string
  section: "contact" | "social"
  title: string
  order_index: number
  content: any
  created_at: string
  updated_at: string
}

// ── Section Editor (outside parent — no remount on state change) ──
function FooterSectionEditor({
  section, title, description, items,
  editingItem, setEditingItem, handleSave, handleDelete, saving
}: any) {
  const editing = editingItem?.section === section ? editingItem : null
  const update = (patch: any) => setEditingItem((p: any) => p ? { ...p, ...patch } : p)
  const updateContent = (patch: any) => setEditingItem((p: any) => p ? { ...p, content: { ...(p.content || {}), ...patch } } : p)

  return (
    <div className="ds-panel">
      <div className="ds-panel-header">
        <div>
          <div className="ds-panel-title">{title}</div>
          <div className="ds-panel-desc">{description}</div>
        </div>
        <button
          className="ds-add-btn"
          disabled={!!editing}
          onClick={() => setEditingItem({
            id: crypto.randomUUID(),
            section,
            title: "",
            order_index: items.length,
            content: section === "social" ? { links: [] } : { phones: [""], email: "", location: "" },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })}
        >
          <Plus size={13} /> Add
        </button>
      </div>

      {editing && (
        <div className="ds-edit-form">

          <div className="ds-form-grid">
            <div className="ds-field">
              <label className="ds-label">Title</label>
              <input className="ds-input" value={editing.title} onChange={(e) => update({ title: e.target.value })} placeholder="Section title" />
            </div>
            <div className="ds-field">
              <label className="ds-label">Order</label>
              <input className="ds-input" type="number" value={editing.order_index} onChange={(e) => update({ order_index: parseInt(e.target.value) })} />
            </div>
          </div>

          {section === "contact" && (
            <>
              <div className="ds-field-group">
                <div className="ds-sub-label">Phone Numbers</div>
                {(editing.content?.phones || [""]).map((phone: string, i: number) => (
                  <div key={i} className="ds-row">
                    <input
                      className="ds-input"
                      placeholder="e.g. +1 555 000 0000"
                      value={phone}
                      onChange={(e) => setEditingItem((p: any) => {
                        const phones = [...p.content.phones]
                        phones[i] = e.target.value
                        return { ...p, content: { ...p.content, phones } }
                      })}
                    />
                    {(editing.content?.phones || []).length > 1 && (
                      <button className="ds-icon-btn" onClick={() => setEditingItem((p: any) => {
                        const phones = [...p.content.phones]
                        phones.splice(i, 1)
                        return { ...p, content: { ...p.content, phones } }
                      })}>
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
                <button className="ds-small-add" onClick={() => setEditingItem((p: any) => ({
                  ...p, content: { ...p.content, phones: [...(p.content.phones || []), ""] }
                }))}>
                  <Plus size={12} /> Add Phone
                </button>
              </div>

              <div className="ds-field" style={{ marginBottom: 14 }}>
                <label className="ds-label">Email</label>
                <input className="ds-input" value={editing.content?.email || ""} onChange={(e) => updateContent({ email: e.target.value })} placeholder="contact@example.com" />
              </div>

              <div className="ds-field">
                <label className="ds-label">Location</label>
                <textarea className="ds-textarea" rows={3} value={editing.content?.location || ""} onChange={(e) => updateContent({ location: e.target.value })} placeholder="Full address..." />
              </div>
            </>
          )}

          {section === "social" && (
            <div className="ds-field-group">
              <div className="ds-sub-label">Social Links</div>
              {(editing.content?.links || []).map((link: any, i: number) => (
                <div key={i} className="ds-row">
                  <input
                    className="ds-input"
                    placeholder="Platform"
                    value={link.platform}
                    onChange={(e) => setEditingItem((p: any) => {
                      const links = [...p.content.links]
                      links[i] = { ...links[i], platform: e.target.value }
                      return { ...p, content: { ...p.content, links } }
                    })}
                  />
                  <input
                    className="ds-input"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => setEditingItem((p: any) => {
                      const links = [...p.content.links]
                      links[i] = { ...links[i], url: e.target.value }
                      return { ...p, content: { ...p.content, links } }
                    })}
                  />
                  <button className="ds-icon-btn" onClick={() => setEditingItem((p: any) => {
                    const links = [...p.content.links]
                    links.splice(i, 1)
                    return { ...p, content: { ...p.content, links } }
                  })}>
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button className="ds-small-add" onClick={() => setEditingItem((p: any) => ({
                ...p, content: { ...p.content, links: [...(p.content.links || []), { platform: "", url: "" }] }
              }))}>
                <Plus size={12} /> Add Link
              </button>
            </div>
          )}

          <div className="ds-form-actions">
            <button className="ds-save-btn" disabled={saving} onClick={() => handleSave(editing)}>
              <Save size={13} /> {saving ? "Saving…" : "Save"}
            </button>
            <button className="ds-cancel-btn" onClick={() => setEditingItem(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="ds-item-list">
        {items.map((item: FooterItem) => (
          <div key={item.id} className="ds-item">
            <div>
              <div className="ds-item-title">{item.title || <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>Untitled</span>}</div>
              <div className="ds-item-meta">order: {item.order_index}</div>
            </div>
            <div className="ds-item-actions">
              <button className="ds-icon-btn edit" onClick={() => setEditingItem(item)}><Edit size={13} /></button>
              <button className="ds-icon-btn" onClick={() => handleDelete(item.id)}><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && !editing && (
          <div className="ds-empty">No entries yet — click Add to get started.</div>
        )}
      </div>
    </div>
  )
}

// ── Page ──
export default function AdminFooter() {
  const [content, setContent] = useState<FooterItem[]>([])
  const [editingItem, setEditingItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [tab, setTab] = useState("contact")
  const navigate = useNavigate()

  const fetchData = async () => {
    const { data } = await supabase.from("footer_content").select("*").order("order_index")
    setContent(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  const handleSave = async (item: FooterItem) => {
    setSaving(true)
    await supabase.from("footer_content").upsert({ ...item, updated_at: new Date().toISOString() })
    setEditingItem(null)
    fetchData()
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    await supabase.from("footer_content").delete().eq("id", id)
    fetchData()
  }

  const bySection = (s: string) => content.filter((c) => c.section === s)

  if (loading) return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DS }} />
      <div className="ds-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)', fontFamily: 'DM Mono, monospace', fontSize: 13 }}>
        Loading…
      </div>
    </>
  )

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DS }} />
      <div className="ds-root">

        <header className="ds-header">
          <div className="ds-header-left">
            <button className="ds-back" onClick={() => navigate("/admin/dashboard")}>
              <ArrowLeft size={13} /> Back
            </button>
            <div className="ds-header-divider" />
            <span className="ds-header-title">Footer Editor</span>
          </div>
          <button className="ds-preview" onClick={() => window.open("/", "_blank")}>
            <Eye size={13} /> Preview
          </button>
        </header>

        <main className="ds-main">
          <div className="ds-page-title">Footer</div>
          <div className="ds-page-sub">Manage contact info and social links shown in the site footer.</div>

          <div className="ds-tabs">
            {[
              { key: "contact", label: "Contact" },
              { key: "social",  label: "Social" },
            ].map(t => (
              <button key={t.key} className={`ds-tab ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === "contact" && (
            <FooterSectionEditor
              section="contact" title="Contact Info" description="Phone numbers, email, and location"
              items={bySection("contact")} editingItem={editingItem} setEditingItem={setEditingItem}
              handleSave={handleSave} handleDelete={handleDelete} saving={saving}
            />
          )}

          {tab === "social" && (
            <FooterSectionEditor
              section="social" title="Social Links" description="Manage social media platform links"
              items={bySection("social")} editingItem={editingItem} setEditingItem={setEditingItem}
              handleSave={handleSave} handleDelete={handleDelete} saving={saving}
            />
          )}
        </main>
      </div>
    </>
  )
}