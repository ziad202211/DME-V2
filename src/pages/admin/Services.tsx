import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Eye, Star, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Service } from '@/types/supabase';
import '@/styles/admin-ds.css';

export default function AdminServices() {
  const [services, setServices]     = useState<Service[]>([]);
  const [loading, setLoading]       = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase.from('services').select('*').order('order_index', { ascending: true });
      if (error) throw error;
      setServices(data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      fetchServices();
    } catch (e) { console.error(e); alert('Failed to delete service'); }
  };

  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fmtDate = (d: string) => new Date(d).toLocaleDateString();

  if (loading) return (
    <div className="ds-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)', fontFamily: 'DM Mono, monospace', fontSize: 13 }}>
      Loading…
    </div>
  );

  return (
    <div className="ds-root">
      <style>{`
        .svc-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .svc-table-wrap table { min-width: 600px; width: 100%; border-collapse: collapse; font-size: 13px; }

        /* Mobile card list */
        .svc-card-list { display: flex; flex-direction: column; gap: 8px; padding: 12px 14px 16px; }
        .svc-card {
          background: var(--bg-3); border: 1px solid var(--border);
          border-radius: 10px; padding: 14px;
          transition: border-color 0.15s;
        }
        .svc-card:hover { border-color: var(--border-2); }
        .svc-card-top {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 10px; margin-bottom: 8px;
        }
        .svc-card-title-wrap { display: flex; align-items: center; gap: 8px; }
        .svc-card-icon { font-size: 18px; flex-shrink: 0; }
        .svc-card-title { font-size: 14px; font-weight: 600; color: var(--text); }
        .svc-card-actions { display: flex; gap: 6px; flex-shrink: 0; }
        .svc-card-meta {
          display: flex; flex-wrap: wrap; gap: 6px;
          align-items: center; margin-bottom: 10px;
        }
        .svc-card-meta-item {
          font-size: 11px; color: var(--muted);
          font-family: 'DM Mono', monospace;
        }
        .svc-card-meta-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: var(--border-2); flex-shrink: 0;
        }

        @media (max-width: 767px) {
          .svc-table-wrap { display: none; }
          .svc-card-list  { display: flex; }
        }
        @media (min-width: 768px) {
          .svc-table-wrap { display: block; }
          .svc-card-list  { display: none; }
        }
      `}</style>

      <header className="ds-header">
        <div className="ds-header-left">
          <button className="ds-back" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft size={13} /> <span className="ds-back-label">Back</span>
          </button>
          <div className="ds-header-divider" />
          <span className="ds-header-title">Services</span>
        </div>
        <button className="ds-add-btn" onClick={() => navigate('/admin/services/new')}>
          <Plus size={13} /> <span>Add Service</span>
        </button>
      </header>

      <main className="ds-main">
        <div className="ds-page-title">Services</div>
        <div className="ds-page-sub">Manage your service offerings.</div>

        {/* Search */}
        <div className="ds-search-wrap">
          <Search size={13} className="ds-search-icon" />
          <input
            className="ds-input"
            style={{ paddingLeft: 34 }}
            placeholder="Search services…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="ds-panel">
          <div className="ds-panel-header">
            <div>
              <div className="ds-panel-title">All Services</div>
              <div className="ds-panel-desc">{filtered.length} service{filtered.length !== 1 ? 's' : ''} found</div>
            </div>
          </div>

          {/* ── Desktop table ── */}
          <div className="svc-table-wrap">
            <table>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Title', 'Slug', 'Featured', 'Order', 'Created', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'DM Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(service => (
                  <tr
                    key={service.id}
                    style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-3)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {service.icon && <span style={{ fontSize: 15 }}>{service.icon}</span>}
                        {service.title}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--muted)' }}>{service.slug}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontFamily: 'DM Mono, monospace', background: service.featured ? 'rgba(245,158,11,0.12)' : 'var(--bg-3)', color: service.featured ? 'var(--accent)' : 'var(--muted)', border: `1px solid ${service.featured ? 'rgba(245,158,11,0.3)' : 'var(--border)'}` }}>
                        {service.featured && <Star size={10} />}{service.featured ? 'Featured' : 'Regular'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--muted)' }}>{service.order_index}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--muted)' }}>{fmtDate(service.created_at)}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="ds-icon-btn edit" onClick={() => navigate(`/services/${service.slug}`)} title="Preview"><Eye size={13} /></button>
                        <button className="ds-icon-btn edit" onClick={() => navigate(`/admin/services/edit/${service.id}`)} title="Edit"><Edit size={13} /></button>
                        <button className="ds-icon-btn" onClick={() => handleDelete(service.id)} title="Delete"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="ds-empty">No services found.</div>}
          </div>

          {/* ── Mobile cards ── */}
          <div className="svc-card-list">
            {filtered.map(service => (
              <div key={service.id} className="svc-card">
                <div className="svc-card-top">
                  <div className="svc-card-title-wrap">
                    {service.icon && <span className="svc-card-icon">{service.icon}</span>}
                    <span className="svc-card-title">{service.title}</span>
                  </div>
                  <div className="svc-card-actions">
                    <button className="ds-icon-btn edit" onClick={() => navigate(`/services/${service.slug}`)} title="Preview"><Eye size={13} /></button>
                    <button className="ds-icon-btn edit" onClick={() => navigate(`/admin/services/edit/${service.id}`)} title="Edit"><Edit size={13} /></button>
                    <button className="ds-icon-btn" onClick={() => handleDelete(service.id)} title="Delete"><Trash2 size={13} /></button>
                  </div>
                </div>

                <div className="svc-card-meta">
                  <span className="svc-card-meta-item">{service.slug}</span>
                  <span className="svc-card-meta-dot" />
                  <span className="svc-card-meta-item">order: {service.order_index}</span>
                  <span className="svc-card-meta-dot" />
                  <span className="svc-card-meta-item">{fmtDate(service.created_at)}</span>
                </div>

                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontFamily: 'DM Mono, monospace', background: service.featured ? 'rgba(245,158,11,0.12)' : 'var(--bg-3)', color: service.featured ? 'var(--accent)' : 'var(--muted)', border: `1px solid ${service.featured ? 'rgba(245,158,11,0.3)' : 'var(--border)'}` }}>
                  {service.featured && <Star size={10} />}{service.featured ? 'Featured' : 'Regular'}
                </span>
              </div>
            ))}
            {filtered.length === 0 && <div className="ds-empty">No services found.</div>}
          </div>
        </div>
      </main>
    </div>
  );
}