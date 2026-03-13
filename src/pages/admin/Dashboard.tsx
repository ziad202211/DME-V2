import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderOpen,
  Settings,
  Users,
  LogOut,
  Home,
  FileText,
  Phone,
  ArrowUpRight,
  LayoutDashboard,
  Zap,
  Menu,
  X
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ContactMessage } from '@/types/supabase';

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

  /* ── Header ── */
  .adm-header {
    position: sticky; top: 0; z-index: 50;
    background: rgba(13,15,18,0.88);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 1rem; height: 60px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px;
  }
  @media (min-width: 640px) { .adm-header { padding: 0 2rem; } }

  .adm-header-left { display: flex; align-items: center; gap: 10px; }

  .adm-logo {
    display: flex; align-items: center; gap: 8px;
    font-family: 'Syne', sans-serif;
    font-weight: 800; font-size: 1rem;
    letter-spacing: -0.02em; color: var(--text);
  }
  @media (min-width: 640px) { .adm-logo { font-size: 1.1rem; gap: 10px; } }

  .adm-logo-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent); box-shadow: 0 0 10px var(--accent);
    animation: pulse-dot 2s ease-in-out infinite; flex-shrink: 0;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.6; transform: scale(0.85); }
  }

  /* Hamburger */
  .adm-hamburger {
    display: flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; border-radius: 8px;
    border: 1px solid var(--border-2); background: var(--bg-2);
    color: var(--muted); cursor: pointer; flex-shrink: 0;
    transition: all 0.15s;
  }
  .adm-hamburger:hover { color: var(--text); background: var(--bg-3); }
  @media (min-width: 768px) { .adm-hamburger { display: none; } }

  .adm-header-right { display: flex; align-items: center; gap: 8px; }
  @media (min-width: 640px) { .adm-header-right { gap: 12px; } }

  .adm-logout {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 10px; border-radius: 8px;
    border: 1px solid var(--border-2); background: var(--bg-2);
    color: var(--muted); font-size: 12px; font-weight: 500;
    cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
  }
  @media (min-width: 640px) { .adm-logout { padding: 7px 14px; font-size: 13px; } }
  .adm-logout:hover { color: var(--text); background: var(--bg-3); }

  /* ── Layout ── */
  .adm-layout { display: flex; height: calc(100vh - 60px); overflow: hidden; position: relative; }

  /* ── Sidebar overlay (mobile) ── */
  .adm-overlay {
    display: none; position: fixed; inset: 0; z-index: 40;
    background: rgba(0,0,0,0.6);
  }
  .adm-overlay.open { display: block; }
  @media (min-width: 768px) { .adm-overlay { display: none !important; } }

  /* ── Sidebar ── */
  .adm-sidebar {
    position: fixed; top: 60px; left: 0; bottom: 0; z-index: 41;
    width: 240px; flex-shrink: 0;
    background: var(--bg-2); border-right: 1px solid var(--border);
    padding: 16px 12px; overflow-y: auto;
    display: flex; flex-direction: column; gap: 4px;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
  }
  .adm-sidebar.open { transform: translateX(0); }
  @media (min-width: 768px) {
    .adm-sidebar {
      position: relative; top: auto; left: auto; bottom: auto;
      width: 220px; transform: none !important;
      display: flex;
    }
  }

  .adm-nav-label {
    font-size: 10px; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted);
    padding: 12px 10px 6px; font-family: 'DM Mono', monospace;
  }
  .adm-nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 9px 12px; border-radius: 8px;
    cursor: pointer; transition: all 0.15s;
    font-size: 13.5px; font-weight: 500;
    color: var(--muted); border: 1px solid transparent;
    background: transparent; width: 100%; text-align: left;
    font-family: 'DM Sans', sans-serif;
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

  /* ── Main content ── */
  .adm-main {
    flex: 1; overflow-y: auto;
    padding: 20px 16px;
    width: 100%;
  }
  @media (min-width: 640px) { .adm-main { padding: 24px 24px; } }
  @media (min-width: 1024px) { .adm-main { padding: 28px 32px; } }

  /* ── Page title ── */
  .adm-page-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem; font-weight: 700;
    letter-spacing: -0.03em; color: var(--text); margin-bottom: 4px;
  }
  @media (min-width: 640px) { .adm-page-title { font-size: 1.6rem; } }

  .adm-page-sub { font-size: 13px; color: var(--muted); margin-bottom: 20px; }
  @media (min-width: 640px) { .adm-page-sub { margin-bottom: 28px; } }
  .adm-page-sub span { color: var(--accent); font-family: 'DM Mono', monospace; }

  /* ── Stat Cards ── */
  .adm-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px; margin-bottom: 20px;
  }
  @media (min-width: 640px) { .adm-stats { gap: 14px; margin-bottom: 28px; } }
  @media (min-width: 1100px) { .adm-stats { grid-template-columns: repeat(4, 1fr); } }

  .adm-stat-card {
    background: var(--bg-2); border: 1px solid var(--border);
    border-radius: 12px; padding: 14px;
    position: relative; overflow: hidden;
    transition: border-color 0.2s, transform 0.2s; cursor: default;
  }
  @media (min-width: 640px) { .adm-stat-card { padding: 18px 20px; } }
  .adm-stat-card:hover { border-color: var(--border-2); transform: translateY(-1px); }
  .adm-stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px; background: var(--accent-color, var(--border)); opacity: 0.7;
  }
  .adm-stat-card.c-amber { --accent-color: var(--accent); }
  .adm-stat-card.c-blue  { --accent-color: var(--blue); }
  .adm-stat-card.c-green { --accent-color: var(--green); }
  .adm-stat-card.c-red   { --accent-color: var(--red); }

  .adm-stat-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
  .adm-stat-label {
    font-size: 10px; font-weight: 500; letter-spacing: 0.06em;
    text-transform: uppercase; color: var(--muted); font-family: 'DM Mono', monospace;
  }
  @media (min-width: 640px) { .adm-stat-label { font-size: 11px; } }

  .adm-stat-icon {
    width: 28px; height: 28px; border-radius: 7px;
    border: 1px solid var(--border-2);
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.02); flex-shrink: 0;
  }
  @media (min-width: 640px) { .adm-stat-icon { width: 30px; height: 30px; } }
  .adm-stat-card.c-amber .adm-stat-icon { color: var(--accent); }
  .adm-stat-card.c-blue  .adm-stat-icon { color: var(--blue); }
  .adm-stat-card.c-green .adm-stat-icon { color: var(--green); }
  .adm-stat-card.c-red   .adm-stat-icon { color: var(--red); }

  .adm-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 1.7rem; font-weight: 800;
    letter-spacing: -0.04em; line-height: 1; color: var(--text);
  }
  @media (min-width: 640px) { .adm-stat-num { font-size: 2.1rem; } }
  .adm-stat-card.c-red .adm-stat-num { color: var(--red); }

  /* ── Grid 2-col ── */
  .adm-grid2 { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 24px; }
  @media (min-width: 768px) { .adm-grid2 { grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 28px; } }

  /* ── Panel ── */
  .adm-panel { background: var(--bg-2); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  .adm-panel-header {
    padding: 14px 16px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  @media (min-width: 640px) { .adm-panel-header { padding: 16px 20px; } }
  .adm-panel-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: -0.01em; }
  .adm-panel-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }

  /* ── Quick nav grid ── */
  .adm-quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 12px; }
  @media (min-width: 640px) { .adm-quick-grid { padding: 16px; } }
  .adm-quick-btn {
    display: flex; align-items: center; gap: 9px;
    padding: 10px 12px; border-radius: 9px;
    border: 1px solid var(--border-2); background: var(--bg-3);
    color: var(--text); font-size: 12px; font-weight: 500;
    cursor: pointer; transition: all 0.15s; text-align: left;
    font-family: 'DM Sans', sans-serif;
  }
  @media (min-width: 640px) { .adm-quick-btn { padding: 11px 14px; font-size: 13px; } }
  .adm-quick-btn:hover { border-color: rgba(245,158,11,0.35); background: rgba(245,158,11,0.06); color: var(--accent); }
  .adm-quick-btn svg { flex-shrink: 0; opacity: 0.7; }
  .adm-quick-btn:hover svg { opacity: 1; }

  /* ── Actions grid ── */
  .adm-actions-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  }
  @media (min-width: 640px) { .adm-actions-grid { gap: 12px; } }
  @media (min-width: 1024px) { .adm-actions-grid { grid-template-columns: repeat(3, 1fr); } }

  .adm-action-card {
    background: var(--bg-2); border: 1px solid var(--border);
    border-radius: 12px; padding: 14px;
    cursor: pointer; transition: all 0.18s;
    display: flex; flex-direction: column; gap: 8px;
  }
  @media (min-width: 640px) { .adm-action-card { padding: 18px; gap: 10px; } }
  .adm-action-card:hover {
    border-color: rgba(245,158,11,0.3); background: rgba(245,158,11,0.04);
    transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  }
  .adm-action-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .adm-action-icon {
    width: 34px; height: 34px; border-radius: 9px;
    background: var(--bg-3); border: 1px solid var(--border-2);
    display: flex; align-items: center; justify-content: center; color: var(--accent);
  }
  .adm-action-arr { color: var(--muted); transition: color 0.15s; }
  .adm-action-card:hover .adm-action-arr { color: var(--accent); }
  .adm-action-title {
    font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: -0.01em;
  }
  @media (min-width: 640px) { .adm-action-title { font-size: 14px; } }
  .adm-action-desc { font-size: 11px; color: var(--muted); }
  @media (min-width: 640px) { .adm-action-desc { font-size: 12px; } }

  /* ── Tabs ── */
  .adm-tabs {
    display: flex; gap: 2px; margin-bottom: 16px;
    background: var(--bg-2); border: 1px solid var(--border);
    border-radius: 10px; padding: 4px; width: fit-content;
  }
  @media (min-width: 640px) { .adm-tabs { margin-bottom: 20px; } }
  .adm-tab {
    padding: 6px 14px; border-radius: 7px;
    font-size: 12px; font-weight: 500;
    cursor: pointer; transition: all 0.15s;
    color: var(--muted); border: none; background: none;
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
  }
  @media (min-width: 640px) { .adm-tab { padding: 7px 18px; font-size: 13px; } }
  .adm-tab.active { background: var(--bg-3); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
  .adm-tab:hover:not(.active) { color: var(--text); }

  /* ── Misc ── */
  .adm-divider { height: 1px; background: var(--border); margin: 20px 0; }
  .adm-empty { padding: 28px; text-align: center; color: var(--muted); font-size: 13px; }
  .adm-fade { animation: fadeUp 0.35s ease both; }
  .adm-fade:nth-child(1) { animation-delay: 0ms; }
  .adm-fade:nth-child(2) { animation-delay: 50ms; }
  .adm-fade:nth-child(3) { animation-delay: 100ms; }
  .adm-fade:nth-child(4) { animation-delay: 150ms; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Scrollbars ── */
  .adm-main::-webkit-scrollbar { width: 5px; }
  .adm-main::-webkit-scrollbar-track { background: transparent; }
  .adm-main::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 10px; }
  .adm-sidebar::-webkit-scrollbar { width: 4px; }
  .adm-sidebar::-webkit-scrollbar-track { background: transparent; }
  .adm-sidebar::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 10px; }
`;

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, services: 0 });
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'actions'>('actions');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (!adminUser) navigate('/admin/login');
    fetchStats();
    fetchRecentMessages();
  }, []);

  const fetchStats = async () => {
    try {
      const [p, s] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
      ]);
      setStats({ projects: p.count || 0, services: s.count || 0 });
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

  const handleNavClick = (path: string) => {
    setSidebarOpen(false);
    navigate(path);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="adm-root">

        {/* Header */}
        <header className="adm-header">
          <div className="adm-header-left">
            {/* Hamburger — mobile only */}
            <button className="adm-hamburger" onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle menu">
              {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
            <div className="adm-logo">
              <div className="adm-logo-dot" />
              DME Admin
            </div>
          </div>
          <div className="adm-header-right">
            <button className="adm-logout" onClick={handleLogout}>
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <div className="adm-layout">

          {/* Mobile overlay */}
          <div
            className={`adm-overlay ${sidebarOpen ? 'open' : ''}`}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <aside className={`adm-sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="adm-nav-label">Main</div>
            {navItems.map(item => (
              <button
                key={item.path}
                className={`adm-nav-item ${item.active ? 'active' : ''}`}
                onClick={() => handleNavClick(item.path)}
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
                onClick={() => handleNavClick(item.path)}
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
              {(['actions'] as const).map(t => (
                <button key={t} className={`adm-tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

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