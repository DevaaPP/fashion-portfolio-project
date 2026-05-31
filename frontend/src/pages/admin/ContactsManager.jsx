// src/pages/admin/ContactsManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMail, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './ContactsManager.css';

const STATUS_COLORS = {
  Unread:    '#d4a574',
  Read:      '#3498db',
  Responded: '#27ae60',
  Archived:  '#666',
};

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter]     = useState('All');
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/admin/contacts');
      setContacts(data.contacts);
    } catch {}
    finally { setLoading(false); }
  };

  const setStatus = async (id, status) => {
    try {
      await axios.put(`/api/admin/contacts/${id}/status`, { status });
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status } : c));
    } catch {}
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await axios.delete(`/api/admin/contacts/${id}`);
      setContacts(prev => prev.filter(c => c._id !== id));
      if (expanded === id) setExpanded(null);
    } catch {}
  };

  const toggle = async (id) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    // Mark as read if unread
    const c = contacts.find(x => x._id === id);
    if (c?.status === 'Unread') await setStatus(id, 'Read');
  };

  const STATUS_OPTIONS = ['All', 'Unread', 'Read', 'Responded', 'Archived'];
  const displayed = filter === 'All' ? contacts : contacts.filter(c => c.status === filter);

  return (
    <div className="cm-wrapper">
      {/* Filters */}
      <div className="cm-header">
        <div className="cm-filters">
          {STATUS_OPTIONS.map(s => (
            <button key={s} className={`filter-pill ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
              {s}
              {s !== 'All' && (
                <span className="filter-count">{contacts.filter(c => c.status === s).length}</span>
              )}
            </button>
          ))}
        </div>
        <span className="total-count">{displayed.length} message{displayed.length !== 1 ? 's' : ''}</span>
      </div>

      {loading && <p className="cm-loading">Loading…</p>}

      {!loading && displayed.length === 0 && (
        <div className="cm-empty">
          <FiMail size={32} />
          <p>No messages in this category</p>
        </div>
      )}

      {/* Message list */}
      <div className="cm-list">
        {displayed.map(c => (
          <div key={c._id} className={`cm-item ${c.status === 'Unread' ? 'unread' : ''}`}>
            {/* Header row */}
            <div className="cm-item-header" onClick={() => toggle(c._id)}>
              <div className="ci-left">
                {c.status === 'Unread' && <span className="unread-dot" />}
                <div>
                  <span className="ci-name">{c.name}</span>
                  <span className="ci-email">&lt;{c.email}&gt;</span>
                </div>
                <span className={`type-badge ${c.type.toLowerCase()}`}>{c.type}</span>
              </div>
              <div className="ci-right">
                <span className="ci-subject">{c.subject}</span>
                <span className="ci-date">{new Date(c.createdAt).toLocaleDateString()}</span>
                {expanded === c._id ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
              </div>
            </div>

            {/* Expanded body */}
            {expanded === c._id && (
              <div className="cm-item-body">
                {c.phone && <p className="ci-phone">📞 {c.phone}</p>}
                <div className="ci-message">{c.message}</div>

                {c.type === 'Commission' && c.commissionDetails && (
                  <div className="ci-commission">
                    <h5>Commission Details</h5>
                    {c.commissionDetails.budget   && <p><strong>Budget:</strong> {c.commissionDetails.budget}</p>}
                    {c.commissionDetails.deadline && <p><strong>Deadline:</strong> {new Date(c.commissionDetails.deadline).toLocaleDateString()}</p>}
                  </div>
                )}

                <div className="ci-footer">
                  <div className="ci-status-row">
                    <span className="status-label">Status:</span>
                    <select
                      value={c.status}
                      onChange={e => setStatus(c._id, e.target.value)}
                      className="status-select"
                      style={{ color: STATUS_COLORS[c.status] }}
                      onClick={e => e.stopPropagation()}
                    >
                      {['Unread','Read','Responded','Archived'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="ci-actions">
                    <a href={`mailto:${c.email}?subject=Re: ${c.subject}`} className="reply-btn">
                      <FiMail size={13} /> Reply via Mail
                    </a>
                    <button className="delete-msg-btn" onClick={() => deleteContact(c._id)}>
                      <FiTrash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsManager;