import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Eye, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types/supabase';
import '@/styles/admin-ds.css';

export default function AdminProjects() {
  const [projects, setProjects]   = useState<Project[]>([]);
  const [loading, setLoading]     = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setProjects(data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      fetchProjects();
    } catch (e) { console.error(e); alert('Failed to delete project'); }
  };

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.client?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColor = (s: string) => ({
    completed: 'var(--green)', ongoing: 'var(--blue)', planned: 'var(--accent)'
  }[s] ?? 'var(--muted)');

  const fmtDate = (d: string) => new Date(d).toLocaleDateString();

  if (loading) return (
    <div className="ds-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--muted)', fontFamily: 'DM Mono, monospace', fontSize: 13 }}>
      Loading…
    </div>
  );

  return (
    <div className="ds-root">
      <header className="ds-header">
        <div className="ds-header-left">
          <button className="ds-back" onClick={() => navigate('/admin/dashboard')}><ArrowLeft size={13} /> Back</button>
          <div className="ds-header-divider" />
          <span className="ds-header-title">Projects</span>
        </div>
        <button className="ds-add-btn" onClick={() => navigate('/admin/projects/new')}><Plus size={13} /> Add Project</button>
      </header>

      <main className="ds-main">
        <div className="ds-page-title">Projects</div>
        <div className="ds-page-sub">Manage your project portfolio.</div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input
            className="ds-input"
            style={{ paddingLeft: 34 }}
            placeholder="Search projects…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="ds-panel">
          <div className="ds-panel-header">
            <div>
              <div className="ds-panel-title">All Projects</div>
              <div className="ds-panel-desc">{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</div>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Title', 'Client', 'Location', 'Status', 'Featured', 'Created', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'DM Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--muted)', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(project => (
                  <tr key={project.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-3)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text)' }}>{project.title}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>{project.client || '—'}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>
                      {project.location ? <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{project.location}</span> : '—'}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontFamily: 'DM Mono, monospace', background: `${statusColor(project.status)}22`, color: statusColor(project.status), border: `1px solid ${statusColor(project.status)}44` }}>
                        {project.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontFamily: 'DM Mono, monospace', background: project.featured ? 'rgba(245,158,11,0.12)' : 'var(--bg-3)', color: project.featured ? 'var(--accent)' : 'var(--muted)', border: `1px solid ${project.featured ? 'rgba(245,158,11,0.3)' : 'var(--border)'}` }}>
                        {project.featured ? 'Featured' : 'Regular'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--muted)', fontFamily: 'DM Mono, monospace', fontSize: 12 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={11} />{fmtDate(project.created_at)}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="ds-icon-btn edit" onClick={() => navigate(`/projects/${project.slug}`)} title="Preview"><Eye size={13} /></button>
                        <button className="ds-icon-btn edit" onClick={() => navigate(`/admin/projects/edit/${project.id}`)} title="Edit"><Edit size={13} /></button>
                        <button className="ds-icon-btn" onClick={() => handleDelete(project.id)} title="Delete"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="ds-empty">No projects found.</div>}
          </div>
        </div>
      </main>
    </div>
  );
}