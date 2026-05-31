// src/pages/admin/PortfolioManager.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload, FiStar } from 'react-icons/fi';
import './PortfolioManager.css';

const EMPTY_FORM = { title: '', description: '', category: 'Digital', tags: '', tools: '', completionDate: '', featured: false };

const PortfolioManager = () => {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]  = useState(null); // portfolio item being edited
  const [form, setForm]        = useState(EMPTY_FORM);
  const [newFiles, setNewFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [removeIds, setRemoveIds] = useState([]); // publicIds to remove on save
  const [saving, setSaving]    = useState(false);
  const [error, setError]      = useState('');
  const [filter, setFilter]    = useState('All');
  const fileRef = useRef();

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/portfolio');
      setItems(data.portfolio);
    } catch { setError('Failed to load portfolio'); }
    finally { setLoading(false); }
  };

  /* ── Form helpers ── */
  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setNewFiles([]); setPreviewUrls([]); setRemoveIds([]);
    setError('');
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      tags: item.tags?.join(', ') || '',
      tools: item.tools?.join(', ') || '',
      completionDate: item.completionDate ? item.completionDate.split('T')[0] : '',
      featured: item.featured,
    });
    setNewFiles([]); setPreviewUrls([]); setRemoveIds([]);
    setError('');
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles(prev => [...prev, ...files]);
    const urls = files.map(f => URL.createObjectURL(f));
    setPreviewUrls(prev => [...prev, ...urls]);
  };

  const removeNewPreview = (idx) => {
    setNewFiles(prev => prev.filter((_, i) => i !== idx));
    setPreviewUrls(prev => prev.filter((_, i) => i !== idx));
  };

  const toggleRemoveExisting = (publicId) => {
    setRemoveIds(prev =>
      prev.includes(publicId) ? prev.filter(id => id !== publicId) : [...prev, publicId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      newFiles.forEach(f => fd.append('images', f));
      if (editing && removeIds.length) fd.append('removeImages', JSON.stringify(removeIds));

      if (editing) {
        await axios.put(`/api/portfolio/${editing._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await axios.post('/api/portfolio', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      await fetchItems();
      closeForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this portfolio item? Images will be removed from Cloudinary.')) return;
    try {
      await axios.delete(`/api/portfolio/${id}`);
      setItems(prev => prev.filter(i => i._id !== id));
    } catch { alert('Delete failed'); }
  };

  const filtered = filter === 'All' ? items : items.filter(i => i.category === filter);

  return (
    <div className="pm-wrapper">
      {/* Header */}
      <div className="pm-header">
        <div className="pm-filters">
          {['All', 'Digital', 'Hand'].map(f => (
            <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <button className="add-btn" onClick={openCreate}>
          <FiPlus size={16} /> Add Work
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="pm-loading">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="pm-empty">
          <p>No portfolio items yet.</p>
          <button className="add-btn" onClick={openCreate}><FiPlus size={14} /> Add your first piece</button>
        </div>
      ) : (
        <div className="pm-grid">
          {filtered.map(item => (
            <div key={item._id} className="pm-card">
              <div className="pm-card-img">
                {item.images?.[0]
                  ? <img src={item.images[0].url} alt={item.title} />
                  : <div className="pm-no-img">No Image</div>}
                {item.featured && <span className="featured-badge"><FiStar size={10} /> Featured</span>}
                <span className={`cat-badge ${item.category.toLowerCase()}`}>{item.category}</span>
              </div>
              <div className="pm-card-body">
                <h4>{item.title}</h4>
                <p>{item.description.substring(0, 70)}…</p>
                <div className="pm-card-actions">
                  <button className="action-btn edit" onClick={() => openEdit(item)}><FiEdit2 size={14} /> Edit</button>
                  <button className="action-btn del"  onClick={() => handleDelete(item._id)}><FiTrash2 size={14} /> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeForm()}>
          <div className="modal-box">
            <div className="modal-header">
              <h3>{editing ? 'Edit Portfolio Item' : 'New Portfolio Item'}</h3>
              <button className="modal-close" onClick={closeForm}><FiX size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="pm-form">
              <div className="form-row-2">
                <div className="field">
                  <label>Title *</label>
                  <input value={form.title} onChange={e => setForm(p=>({...p,title:e.target.value}))} required placeholder="Project title" />
                </div>
                <div className="field">
                  <label>Category *</label>
                  <select value={form.category} onChange={e => setForm(p=>({...p,category:e.target.value}))}>
                    <option value="Digital">Digital</option>
                    <option value="Hand">Hand</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Description *</label>
                <textarea value={form.description} onChange={e => setForm(p=>({...p,description:e.target.value}))} required rows={4} placeholder="Describe this work…" />
              </div>

              <div className="form-row-2">
                <div className="field">
                  <label>Tags <span className="hint">(comma-separated)</span></label>
                  <input value={form.tags} onChange={e => setForm(p=>({...p,tags:e.target.value}))} placeholder="fashion, illustration, digital" />
                </div>
                <div className="field">
                  <label>Tools <span className="hint">(comma-separated)</span></label>
                  <input value={form.tools} onChange={e => setForm(p=>({...p,tools:e.target.value}))} placeholder="Figma, Photoshop" />
                </div>
              </div>

              <div className="form-row-2">
                <div className="field">
                  <label>Completion Date</label>
                  <input type="date" value={form.completionDate} onChange={e => setForm(p=>({...p,completionDate:e.target.value}))} />
                </div>
                <div className="field field-check">
                  <label className="check-label">
                    <input type="checkbox" checked={form.featured} onChange={e => setForm(p=>({...p,featured:e.target.checked}))} />
                    Feature on homepage
                  </label>
                </div>
              </div>

              {/* Existing images */}
              {editing && editing.images?.length > 0 && (
                <div className="field">
                  <label>Current Images <span className="hint">(click to mark for removal)</span></label>
                  <div className="img-preview-row">
                    {editing.images.map(img => (
                      <div key={img.publicId} className={`img-thumb ${removeIds.includes(img.publicId) ? 'marked-remove' : ''}`}
                           onClick={() => toggleRemoveExisting(img.publicId)}>
                        <img src={img.url} alt="" />
                        {removeIds.includes(img.publicId) && <div className="remove-overlay"><FiX size={18} /></div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New images */}
              <div className="field">
                <label>Add Images</label>
                <div className="upload-zone" onClick={() => fileRef.current?.click()}>
                  <FiUpload size={20} />
                  <span>Click to upload (JPG, PNG, WEBP)</span>
                  <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleFileChange} hidden />
                </div>
                {previewUrls.length > 0 && (
                  <div className="img-preview-row mt-sm">
                    {previewUrls.map((url, i) => (
                      <div key={i} className="img-thumb">
                        <img src={url} alt="" />
                        <button type="button" className="thumb-remove" onClick={() => removeNewPreview(i)}><FiX size={14} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {error && <p className="form-error">{error}</p>}

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={closeForm}>Cancel</button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? 'Saving…' : (editing ? 'Update' : 'Create')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;