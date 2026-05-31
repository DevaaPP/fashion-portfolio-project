// src/pages/admin/ResumeManager.jsx
import React, { useState, useEffect, useRef } from 'react';
import api from '../../api/axiosClient';
import { FiUpload, FiDownload, FiTrash2, FiFileText, FiExternalLink } from 'react-icons/fi';
import './ResumeManager.css';

const ResumeManager = ({ onStatRefresh }) => {
  const [resumeData, setResumeData] = useState({ url: '', publicId: '' });
  const [uploading, setUploading]   = useState(false);
  const [deleting, setDeleting]     = useState(false);
  const [msg, setMsg]               = useState('');
  const [error, setError]           = useState('');
  const [dragOver, setDragOver]     = useState(false);
  const fileRef = useRef();

  useEffect(() => { fetchCurrentResume(); }, []);

  const fetchCurrentResume = async () => {
    try {
      const { data } = await api.get('/api/users/me');
      setResumeData(data.user?.resume || { url: '', publicId: '' });
    } catch {}
  };

  const handleFile = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Only PDF files are accepted'); return;
    }
    setError(''); setMsg(''); setUploading(true);
    const fd = new FormData();
    fd.append('resume', file);
    try {
      const { data } = await api.post('/api/users/upload-resume', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResumeData(data.user?.resume || { url: '', publicId: '' });
      setMsg('Resume uploaded successfully!');
      onStatRefresh?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally { setUploading(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete the current resume from Cloudinary?')) return;
    setDeleting(true);
    try {
      await api.delete('/api/users/resume');
      setResumeData({ url: '', publicId: '' });
      setMsg('Resume deleted.');
      onStatRefresh?.();
    } catch { setError('Delete failed'); }
    finally { setDeleting(false); }
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const hasResume = Boolean(resumeData?.url);

  return (
    <div className="rm-wrapper">
      <div className="rm-card">
        <h3 className="rm-title"><FiFileText size={18} /> Resume / CV</h3>
        <p className="rm-desc">
          Upload your resume as a <strong>PDF</strong>. It will be stored on Cloudinary and served directly to visitors.
          The download link on the public resume page always points to the latest uploaded file.
        </p>

        {/* Current resume preview */}
        {hasResume ? (
          <div className="current-resume">
            <div className="cr-icon"><FiFileText size={28} /></div>
            <div className="cr-info">
              <p className="cr-label">Current Resume</p>
              <p className="cr-url">{resumeData.url}</p>
            </div>
            <div className="cr-actions">
              <a href={resumeData.url} target="_blank" rel="noreferrer" className="cr-btn view">
                <FiExternalLink size={14} /> View
              </a>
              <a href={resumeData.url} download="resume.pdf" className="cr-btn dl">
                <FiDownload size={14} /> Download
              </a>
              <button className="cr-btn del" onClick={handleDelete} disabled={deleting}>
                <FiTrash2 size={14} /> {deleting ? '…' : 'Delete'}
              </button>
            </div>
          </div>
        ) : (
          <div className="no-resume">No resume uploaded yet.</div>
        )}

        {/* Upload zone */}
        <div
          className={`rm-upload-zone ${dragOver ? 'drag-over' : ''}`}
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          {uploading ? (
            <span className="uploading-txt">Uploading to Cloudinary…</span>
          ) : (
            <>
              <FiUpload size={24} />
              <span>{hasResume ? 'Drag & drop or click to replace PDF' : 'Drag & drop or click to upload PDF'}</span>
              <span className="rm-hint">Max 10 MB · PDF only</span>
            </>
          )}
          <input ref={fileRef} type="file" accept="application/pdf" onChange={e => handleFile(e.target.files[0])} hidden />
        </div>

        {msg   && <p className="rm-success">{msg}</p>}
        {error && <p className="rm-error">{error}</p>}

        {/* How it works */}
        <div className="rm-info-box">
          <h4>How it works</h4>
          <ul>
            <li>Upload a PDF — it goes directly to Cloudinary (not your server).</li>
            <li>Visitors click <em>Download Resume</em> on the public Resume page and receive the PDF.</li>
            <li>Uploading a new file replaces the old one automatically.</li>
            <li>Cloudinary CDN ensures fast, reliable delivery worldwide.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeManager;