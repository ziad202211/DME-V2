import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  FolderOpen,
  Settings,
  Users,
  LogOut,
  Home,
  FileText,
  Phone,
  Mail,
  ArrowUpRight,
  Circle,
  ChevronRight,
  LayoutDashboard,
  TrendingUp,
  Bell,
  Zap
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ContactMessage } from '@/types/supabase';

// ── Styles injected once ──
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .adm-root {
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

  .adm-root * { box-sizing: border-box; margin: 0; padding: 0; }

  /* Header */
  .adm-header {
    position: sticky; top: 0; z-index: 50;
    background: rgba(13,15,18,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem;
    height: 60px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .adm-logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 1.1rem;
    letter-spacing: -0.02em;
    color: var(--text);
  }
  .adm-logo-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
    animation: pulse-dot 2s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.85); }
  }
  .adm-header-right { display: flex; align-items: center; gap: 12px; }
  .adm-bell {
    position: relative; cursor: pointer;
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--border-2); border-radius: 8px;
    color: var(--muted); transition: all 0.2s;
    background: var(--bg-2);
  }
  .adm-bell:hover { color: var(--text); border-color: var(--border-2); }
  .adm-bell-badge {
    position: absolute; top: -4px; right: -4px;
    width: 16px; height: 16px; border-radius: 50%;
    background: var(--red); border: 2px solid var(--bg);
    font-size: 9px; font-family: 'DM Mono', monospace;
    display: flex; align-items: center; justify-content: center;
    color: white; font-weight: 500;
  }
  .adm-logout {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 14px;
    border: 1px solid var(--border-2);
    border-radius: 8px;
    background: var(--bg-2);
    color: var(--muted);
    font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  .adm-logout:hover { color: var(--text); border-color: var(--border-2); background: var(--bg-3); }

  /* Layout */
  .adm-layout { display: flex; height: calc(100vh - 60px); overflow: hidden; }

  /* Sidebar */
  .adm-sidebar {
    width: 220px; flex-shrink: 0;
    background: var(--bg-2);
    border-right: 1px solid var(--border);
    padding: 20px 12px;
    overflow-y: auto;
    display: flex; flex-direction: column; gap: 4px;
  }
  .adm-nav-label {
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted); padding: 12px 10px 6px;
    font-family: 'DM Mono', monospace;
  }
  .adm-nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 9px 12px; border-radius: 8px;
    cursor: pointer; transition: all 0.15s;
    font-size: 13.5px; font-weight: 500;
    color: var(--muted); border: 1px solid transparent;
    text-decoration: none;
    background: transparent;
    width: 100%; text-align: left;
  }
  .adm-nav-item:hover { color: var(--text); background: var(--bg-3); }
  .adm-nav-item.active {
    color: var(--accent); background: rgba(245,158,11,0.08);
    border-color: rgba(245,158,11,0.2);
  }
  .adm-nav-item .nav-icon { width: 16px; height: 16px; flex-shrink: 0; }
  .adm-nav-badge {
    margin-left: auto; padding: 1px 6px; border-radius: 4px;
    background: var(--red); color: white;
    font-size: 10px; font-family: 'DM Mono', monospace;
  }

  /* Main */
  .adm-main { flex: 1; overflow-y: auto; padding: 28px 32px; }

  /* Page title */
  .adm-page-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem; font-weight: 700;
    letter-spacing: -0.03em; color: var(--text);
    margin-bottom: 4px;
  }
  .adm-page-sub { font-size: 13px; color: var(--muted); margin-bottom: 28px; }
  .adm-page-sub span { color: var(--accent); font-family: 'DM Mono', monospace; }

  /* Stat Cards */
  .adm-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 28px; }
  @media (max-width: 1100px) { .adm-stats { grid-template-columns: repeat(2,1fr); } }

  .adm-stat-card {
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 18px 20px;
    position: relative; overflow: hidden;
    transition: border-color 0.2s, transform 0.2s;
    cursor: default;
  }
  .adm-stat-card:hover { border-color: var(--border-2); transform: translateY(-1px); }
  .adm-stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px; background: var(--accent-color, var(--border));
    opacity: 0.7;
  }
  .adm-stat-card.c-amber { --accent-color: var(--accent); }
  .adm-stat-card.c-blue  { --accent-color: var(--blue); }
  .adm-stat-card.c-green { --accent-color: var(--green); }
  .adm-stat-card.c-red   { --accent-color: var(--red); }

  .adm-stat-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  .adm-stat-label { font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); font-family: 'DM Mono', monospace; }
  .adm-stat-icon {
    width: 30px; height: 30px; border-radius: 7px;
    border: 1px solid var(--border-2);
    display: flex; align-items: center; justify-content: center;
    color: var(--icon-color, var(--muted));
    background: rgba(255,255,255,0.02);
  }
  .adm-stat-card.c-amber .adm-stat-icon { color: var(--accent); }
  .adm-stat-card.c-blue  .adm-stat-icon { color: var(--blue); }
  .adm-stat-card.c-green .adm-stat-icon { color: var(--green); }
  .adm-stat-card.c-red   .adm-stat-icon { color: var(--red); }

  .adm-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 2.1rem; font-weight: 800;
    letter-spacing: -0.04em; line-height: 1;
    color: var(--text);
  }
  .adm-stat-card.c-red .adm-stat-num { color: var(--red); }

  /* Grid 2-col */
  .adm-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 28px; }
  @media (max-width: 960px) { .adm-grid2 { grid-template-columns: 1fr; } }

  /* Panel */
  .adm-panel {
    background: var(--bg-2);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }
  .adm-panel-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .adm-panel-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px; font-weight: 700;
    letter-spacing: -0.01em;
  }
  .adm-panel-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .adm-view-all {
    font-size: 11.5px; color: var(--accent); cursor: pointer;
    display: flex; align-items: center; gap: 3px;
    font-weight: 500; transition: opacity 0.15s;
    background: none; border: none; font-family: 'DM Sans', sans-serif;
  }
  .adm-view-all:hover { opacity: 0.75; }

  /* Quick nav grid */
  .adm-quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 16px; }
  .adm-quick-btn {
    display: flex; align-items: center; gap: 9px;
    padding: 11px 14px; border-radius: 9px;
    border: 1px solid var(--border-2);
    background: var(--bg-3);
    color: var(--text); font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.15s;
    text-align: left; font-family: 'DM Sans', sans-serif;
  }
  .adm-quick-btn:hover {
    border-color: rgba(245,158,11,0.35);
    background: rgba(245,158,11,0.06);
    color: var(--accent);
  }
  .adm-quick-btn svg { flex-shrink: 0; opacity: 0.7; }
  .adm-quick-btn:hover svg { opacity: 1; }

  /* Messages list */
  .adm-msg-list { padding: 8px 12px 12px; display: flex; flex-direction: column; gap: 6px; }
  .adm-msg-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 12px 10px; border-radius: 9px;
    border: 1px solid transparent;
    transition: all 0.15s; cursor: pointer;
  }
  .adm-msg-item:hover { background: var(--bg-3); border-color: var(--border); }
  .adm-msg-avatar {
    width: 32px; height: 32px; border-radius: 8px;
    background: var(--bg-3); border: 1px solid var(--border-2);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
    color: var(--accent); flex-shrink: 0;
  }
  .adm-msg-body { flex: 1; min-width: 0; }
  .adm-msg-name { font-size: 13px; font-weight: 600; color: var(--text); }
  .adm-msg-preview { font-size: 12px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }
  .adm-msg-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; flex-shrink: 0; }
  .adm-msg-date { font-size: 11px; color: var(--muted); font-family: 'DM Mono', monospace; }
  .adm-msg-status {
    font-size: 9.5px; font-weight: 600; letter-spacing: 0.06em;
    text-transform: uppercase; padding: 2px 7px; border-radius: 4px;
    font-family: 'DM Mono', monospace;
  }
  .status-unread  { background: rgba(239,68,68,0.15);  color: #ef4444; }
  .status-read    { background: rgba(59,130,246,0.15); color: #60a5fa; }
  .status-replied { background: rgba(16,185,129,0.15); color: #34d399; }
  .status-default { background: var(--bg-3); color: var(--muted); }

  /* Actions grid */
  .adm-actions-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
  @media (max-width: 900px) { .adm-actions-grid { grid-template-columns: repeat(2,1fr); } }

  .adm-action-card {
    background: var(--bg-2); border: 1px solid var(--border);
    border-radius: 12px; padding: 18px;
    cursor: pointer; transition: all 0.18s;
    display: flex; flex-direction: column; gap: 10px;
  }
  .adm-action-card:hover {
    border-color: rgba(245,158,11,0.3);
    background: rgba(245,158,11,0.04);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }
  .adm-action-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .adm-action-icon {
    width: 36px; height: 36px; border-radius: 9px;
    background: var(--bg-3); border: 1px solid var(--border-2);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent);
  }
  .adm-action-arr { color: var(--muted); transition: color 0.15s; }
  .adm-action-card:hover .adm-action-arr { color: var(--accent); }
  .adm-action-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: -0.01em; }
  .adm-action-desc { font-size: 12px; color: var(--muted); }

  /* Tabs */
  .adm-tabs { display: flex; gap: 2px; margin-bottom: 20px;
    background: var(--bg-2); border: 1px solid var(--border);
    border-radius: 10px; padding: 4px; width: fit-content;
  }
  .adm-tab {
    padding: 7px 18px; border-radius: 7px;
    font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.15s;
    color: var(--muted); border: none; background: none;
    font-family: 'DM Sans', sans-serif;
  }
  .adm-tab.active { background: var(--bg-3); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
  .adm-tab:hover:not(.active) { color: var(--text); }

  /* Section divider */
  .adm-divider { height: 1px; background: var(--border); margin: 24px 0; }

  /* Scrollbar */
  .adm-main::-webkit-scrollbar { width: 5px; }
  .adm-main::-webkit-scrollbar-track { background: transparent; }
  .adm-main::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 10px; }

  /* Fade-in */
  .adm-fade { animation: fadeUp 0.35s ease both; }
  .adm-fade:nth-child(1) { animation-delay: 0ms; }
  .adm-fade:nth-child(2) { animation-delay: 50ms; }
  .adm-fade:nth-child(3) { animation-delay: 100ms; }
  .adm-fade:nth-child(4) { animation-delay: 150ms; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .adm-empty { padding: 32px; text-align: center; color: var(--muted); font-size: 13px; }
`;

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, services: 0});
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'actions' | 'overview'>('actions');
  const navigate = useNavigate();

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) navigate('/admin/login');
    fetchStats();
    fetchRecentMessages();
  }, []);

  const fetchStats = async () => {
    try {
      const [p, s, m, u] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' }),
        supabase.from('contact_messages').select('id', { count: 'exact' }).eq('status', 'unread')
      ]);
      setStats({ projects: p.count || 0, services: s.count || 0});
    } catch (e) { console.error(e); }
  };

  const fetchRecentMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages').select('*')
        .order('created_at', { ascending: false }).limit(5);
      if (error) throw error;
      setRecentMessages(data || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleLogout = () => { localStorage.removeItem('adminUser'); navigate('/admin/login'); };
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const initials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const statusClass = (s: string) => ({ unread: 'status-unread', read: 'status-read', replied: 'status-replied' }[s] || 'status-default');

  const navItems = [
    { icon: <LayoutDashboard size={15} />, label: 'Dashboard', path: '/admin/dashboard', active: true },
    { icon: <FolderOpen size={15} />, label: 'Projects', path: '/admin/projects' },
    { icon: <FileText size={15} />, label: 'Services', path: '/admin/services' },
    
  ] as Array<{ icon: React.ReactNode; label: string; path: string; active?: boolean; badge?: string | number }>;

  const pageItems = [
    { icon: <Home size={15} />, label: 'Home Page', path: '/admin/home' },
    { icon: <Users size={15} />, label: 'About Page', path: '/admin/about' },
    { icon: <Phone size={15} />, label: 'Contact Page', path: '/admin/contact' },
    { icon: <FileText size={15} />, label: 'Footer', path: '/admin/footer' },
  ] as Array<{ icon: React.ReactNode; label: string; path: string; badge?: string | number }>;

  const actionCards = [
    { icon: <Home size={16} />, title: 'Edit Home Page', desc: 'Update hero and homepage content', path: '/admin/home' },
    { icon: <Users size={16} />, title: 'Edit About Page', desc: 'Update company information', path: '/admin/about' },
    { icon: <Phone size={16} />, title: 'Edit Contact Page', desc: 'Update contact details', path: '/admin/contact' },
    { icon: <FileText size={16} />, title: 'Edit Footer', desc: 'Update footer content', path: '/admin/footer' },
    { icon: <Settings size={16} />, title: 'Add New Service', desc: 'Create a service offering', path: '/admin/services/new' },
    { icon: <FolderOpen size={16} />, title: 'Add New Project', desc: 'Showcase a new project', path: '/admin/projects/new' },
    { icon: <Settings size={16} />, title: 'Manage Services', desc: 'Edit existing services', path: '/admin/services' },
    { icon: <FolderOpen size={16} />, title: 'Manage Projects', desc: 'Edit existing projects', path: '/admin/projects' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="adm-root">

        {/* Header */}
        <header className="adm-header">
          <div className="adm-logo">
            <div className="adm-logo-dot" />
            DME Admin
          </div>
          <div className="adm-header-right">
            
            <button className="adm-logout" onClick={handleLogout}>
              <LogOut size={13} />
              Logout
            </button>
          </div>
        </header>

        <div className="adm-layout">
          {/* Sidebar */}
          <aside className="adm-sidebar">
            <div className="adm-nav-label">Main</div>
            {navItems.map(item => (
              <button
                key={item.path}
                className={`adm-nav-item ${item.active ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge ? <span className="adm-nav-badge">{item.badge}</span> : null}
              </button>
            ))}

            <div className="adm-nav-label">Pages</div>
            {pageItems.map(item => (
              <button
                key={item.path}
                className="adm-nav-item"
                onClick={() => navigate(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </aside>

          {/* Main */}
          <main className="adm-main">
            <div className="adm-page-title">Overview</div>
            <div className="adm-page-sub">
              Welcome back — <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>

            {/* Stats */}
            <div className="adm-stats">
              {[
                { label: 'Total Projects', value: stats.projects, icon: <FolderOpen size={14} />, color: 'c-amber' },
                { label: 'Services', value: stats.services, icon: <FileText size={14} />, color: 'c-blue' },
              ].map((s, i) => (
                <div key={s.label} className={`adm-stat-card ${s.color} adm-fade`} style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="adm-stat-top">
                    <div className="adm-stat-label">{s.label}</div>
                    <div className="adm-stat-icon">{s.icon}</div>
                  </div>
                  <div className="adm-stat-num">{loading ? '—' : s.value}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="adm-tabs">
              {(['actions', 'overview'] as const).map(t => (
                <button key={t} className={`adm-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="adm-grid2">
                {/* Quick nav */}
                <div className="adm-panel">
                  <div className="adm-panel-header">
                    <div>
                      <div className="adm-panel-title">Quick Navigation</div>
                      <div className="adm-panel-sub">Jump to any section</div>
                    </div>
                    <Zap size={14} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="adm-quick-grid">
                    {[
                      { icon: <FolderOpen size={14} />, label: 'Projects', path: '/admin/projects' },
                      { icon: <FileText size={14} />, label: 'Services', path: '/admin/services' },
                      { icon: <Settings size={14} />, label: 'Settings', path: '/admin/settings' },
                    ].map(b => (
                      <button key={b.path} className="adm-quick-btn" onClick={() => navigate(b.path)}>
                        {b.icon}{b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Tab: Actions */}
            {activeTab === 'actions' && (
              <div className="adm-actions-grid">
                {actionCards.map(card => (
                  <div key={card.path} className="adm-action-card" onClick={() => navigate(card.path)}>
                    <div className="adm-action-top">
                      <div className="adm-action-icon">{card.icon}</div>
                      <ArrowUpRight size={14} className="adm-action-arr" />
                    </div>
                    <div>
                      <div className="adm-action-title">{card.title}</div>
                      <div className="adm-action-desc">{card.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}