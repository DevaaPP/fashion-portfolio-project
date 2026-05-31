// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext';
import axios from 'axios';
import PortfolioManager from './PortfolioManager';
import ResumeManager    from './ResumeManager';
import ProfileManager   from './ProfileManager';
import ContactsManager  from './ContactsManager';
import { FiGrid, FiFileText, FiUser, FiMail, FiLogOut, FiMenu, FiX, FiEye, FiHeart, FiInbox, FiImage } from 'react-icons/fi';
import './AdminDashboard.css';

const TABS = [
  { id: 'overview',   label: 'Overview',   Icon: FiGrid },
  { id: 'portfolio',  label: 'Portfolio',  Icon: FiImage },
  { id: 'resume',     label: 'Resume',     Icon: FiFileText },
  { id: 'profile',    label: 'Profile',    Icon: FiUser },
  { id: 'contacts',   label: 'Contacts',   Icon: FiMail },
];

const StatCard = ({ label, value, sub, Icon }) => (
  <div className="stat-card">
    <div className="stat-icon"><Icon size={20} /></div>
    <div className="stat-body">
      <div className="stat-value">{value ?? '—'}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab]       = useState('overview');
  const [stats, setStats]   = useState(null);
  const [recent, setRecent] = useState([]);
  const [sideOpen, setSideOpen] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get('/api/admin/stats');
      setStats(data.stats);
      setRecent(data.recentContacts);
    } catch {}
  };

  const handleLogout = () => { logout(); navigate('/'); };
  const switchTab = (t) => { setTab(t); setSideOpen(false); };

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sideOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span className="sb-name">AKANKSHA</span>
          <span className="sb-role">Admin</span>
        </div>

        <nav className="sidebar-nav">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`nav-item ${tab === id ? 'active' : ''}`}
              onClick={() => switchTab(id)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="admin-user">
            <div className="au-avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <div className="au-info">
              <span className="au-name">{user?.name}</span>
              <span className="au-role">Administrator</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sideOpen && <div className="sidebar-overlay" onClick={() => setSideOpen(false)} />}

      {/* Main content */}
      <div className="admin-main">
        {/* Top bar */}
        <header className="admin-topbar">
          <button className="hamburger-admin" onClick={() => setSideOpen(true)}>
            <FiMenu size={22} />
          </button>
          <h1 className="topbar-title">
            {TABS.find(t => t.id === tab)?.label}
          </h1>
          <a href="/" target="_blank" rel="noreferrer" className="view-site-btn">
            <FiEye size={15} /> View Site
          </a>
        </header>

        {/* Tab content */}
        <div className="admin-content">
          {tab === 'overview' && (
            <div className="overview-tab">
              <div className="stats-grid">
                <StatCard label="Total Projects"   value={stats?.totalPortfolio} Icon={FiImage} />
                <StatCard label="Digital Works"    value={stats?.digitalCount}   Icon={FiGrid} />
                <StatCard label="Hand Works"       value={stats?.handCount}      Icon={FiHeart} />
                <StatCard label="Total Views"      value={stats?.totalViews}     Icon={FiEye} />
                <StatCard label="Total Inquiries"  value={stats?.totalContacts}  Icon={FiMail} />
                <StatCard label="Unread Messages"  value={stats?.unreadContacts} sub="Needs attention" Icon={FiInbox} />
              </div>

              <section className="recent-section">
                <h3>Recent Messages</h3>
                {recent.length === 0 && <p className="empty-msg">No messages yet</p>}
                <div className="recent-list">
                  {recent.map(c => (
                    <div key={c._id} className={`recent-item ${c.status === 'Unread' ? 'unread' : ''}`}>
                      <div className="ri-top">
                        <span className="ri-name">{c.name}</span>
                        <span className={`ri-badge ${c.type.toLowerCase()}`}>{c.type}</span>
                      </div>
                      <p className="ri-subject">{c.subject}</p>
                      <span className="ri-date">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
                {recent.length > 0 && (
                  <button className="view-all-btn" onClick={() => switchTab('contacts')}>
                    View all messages →
                  </button>
                )}
              </section>
            </div>
          )}

          {tab === 'portfolio'  && <PortfolioManager />}
          {tab === 'resume'     && <ResumeManager onStatRefresh={fetchStats} />}
          {tab === 'profile'    && <ProfileManager />}
          {tab === 'contacts'   && <ContactsManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;