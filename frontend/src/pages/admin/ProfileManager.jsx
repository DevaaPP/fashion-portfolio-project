// src/pages/admin/ProfileManager.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FiUpload, FiPlus, FiTrash2 } from 'react-icons/fi';
import './ProfileManager.css';

const EMPTY_SKILL = { skill: '', proficiency: 'Intermediate' };

const ProfileManager = () => {
  const [form, setForm] = useState({
    name: '', bio: '', about: '',
    socialLinks: { instagram: '', linkedin: '', twitter: '', behance: '' },
    skills: [],
  });
  const [imgFile, setImgFile]   = useState(null);
  const [imgPreview, setImgPreview] = useState('');
  const [currentImg, setCurrentImg] = useState('');
  const [saving, setSaving]     = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [msg, setMsg]     = useState('');
  const [error, setError] = useState('');
  const imgRef = useRef();

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('/api/users/me');
      const u = data.user;
      setForm({
        name: u.name || '',
        bio:  u.bio  || '',
        about: u.about || '',
        socialLinks: { instagram: '', linkedin: '', twitter: '', behance: '', ...u.socialLinks },
        skills: u.skills || [],
      });
      setCurrentImg(u.profileImage?.url || '');
    } catch {}
  };

  /* Skills */
  const addSkill    = () => setForm(p => ({ ...p, skills: [...p.skills, { ...EMPTY_SKILL }] }));
  const removeSkill = (i) => setForm(p => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) }));
  const updateSkill = (i, field, val) =>
    setForm(p => { const s = [...p.skills]; s[i] = { ...s[i], [field]: val }; return { ...p, skills: s }; });

  /* Image selection */
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  };

  /* Save profile text */
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setMsg(''); setError('');
    try {
      const fd = new FormData();
      fd.append('name',        form.name);
      fd.append('bio',         form.bio);
      fd.append('about',       form.about);
      fd.append('skills',      JSON.stringify(form.skills));
      fd.append('socialLinks', JSON.stringify(form.socialLinks));
      await axios.put('/api/users/update', fd);

      // Upload image if selected
      if (imgFile) {
        setImgUploading(true);
        const imgFd = new FormData();
        imgFd.append('image', imgFile);
        const { data } = await axios.post('/api/users/upload-image', imgFd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setCurrentImg(data.user?.profileImage?.url || '');
        setImgFile(null); setImgPreview('');
        setImgUploading(false);
      }

      setMsg('Profile saved!');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally { setSaving(false); }
  };

  return (
    <form className="profile-form" onSubmit={handleSave}>
      <div className="pf-grid">
        {/* Left — image */}
        <div className="pf-image-col">
          <div className="profile-img-wrap">
            <img src={imgPreview || currentImg || 'https://via.placeholder.com/200x200?text=No+Image'} alt="Profile" className="profile-img" />
          </div>
          <button type="button" className="change-img-btn" onClick={() => imgRef.current?.click()}>
            <FiUpload size={14} /> {imgUploading ? 'Uploading…' : 'Change Photo'}
          </button>
          <input ref={imgRef} type="file" accept="image/*" onChange={handleImgChange} hidden />
          <p className="img-note">Saved with profile — JPG, PNG, max 5MB</p>
        </div>

        {/* Right — text */}
        <div className="pf-fields-col">
          <div className="field">
            <label>Full Name</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" />
          </div>
          <div className="field">
            <label>Short Bio <span className="hint">(shown under name)</span></label>
            <input value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="Fashion designer & creative" />
          </div>
          <div className="field">
            <label>About</label>
            <textarea value={form.about} onChange={e => setForm(p => ({ ...p, about: e.target.value }))} rows={4} placeholder="Longer description for About section…" />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="pf-section">
        <h4 className="pf-section-title">Social Links</h4>
        <div className="form-row-2">
          {['instagram','linkedin','twitter','behance'].map(key => (
            <div className="field" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                value={form.socialLinks[key]}
                onChange={e => setForm(p => ({ ...p, socialLinks: { ...p.socialLinks, [key]: e.target.value } }))}
                placeholder={`https://${key}.com/yourhandle`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="pf-section">
        <div className="pf-section-header">
          <h4 className="pf-section-title">Skills</h4>
          <button type="button" className="add-skill-btn" onClick={addSkill}><FiPlus size={13} /> Add Skill</button>
        </div>
        <div className="skills-list">
          {form.skills.map((sk, i) => (
            <div key={i} className="skill-row">
              <input
                className="skill-input"
                value={sk.skill}
                onChange={e => updateSkill(i, 'skill', e.target.value)}
                placeholder="Skill name"
              />
              <select value={sk.proficiency} onChange={e => updateSkill(i, 'proficiency', e.target.value)} className="skill-select">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
              <button type="button" className="remove-skill" onClick={() => removeSkill(i)}><FiTrash2 size={14} /></button>
            </div>
          ))}
          {form.skills.length === 0 && <p className="no-skills">No skills added yet.</p>}
        </div>
      </div>

      {msg   && <p className="pf-success">{msg}</p>}
      {error && <p className="pf-error">{error}</p>}

      <button type="submit" className="save-profile-btn" disabled={saving || imgUploading}>
        {saving ? 'Saving…' : 'Save Profile'}
      </button>
    </form>
  );
};

export default ProfileManager;