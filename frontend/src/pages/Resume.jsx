import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import SkillTag from '../components/SkillTag';
import api from '../api/axiosClient';
import './Resume.css';

const Resume = () => {
  const [profile, setProfile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 'designer' returns the first admin user (public profile)
        const { data } = await api.get('/api/users/profile/designer');
        if (data?.success && data.user) {
          setProfile(data.user);
          setResumeUrl(data.user?.resume?.url || '');
        }
      } catch (err) {
        console.error('Failed to load profile for resume page', err);
      }
    };
    fetchProfile();
  }, []);

  const education = [
    {
      school: 'SD MANAGEMENT GROUP OF COLLEGES',
      degree: 'Bachelor of Fine Arts in Fashion Design',
      year: '2021 - 2025',
      details: 'Specialized in sustainable fashion and textile innovation',
    },
    {
      school: 'SATYAM FASHION INSTITUTE',
      degree: 'Master of Interdisciplinary Design',
      year: '2026 - 2028',
      details: 'Advanced training in fashion illustration and digital design tools',
    },
  ];

  const experience = [
    {
      company: 'Elite Fashion Studio',
      position: 'Senior Fashion Designer',
      year: '2022 - Present',
      responsibilities: [
        'Lead design team in creating seasonal collections',
        'Collaborate with international brands on custom commissions',
        'Mentor junior designers and design interns',
      ],
    },
    {
      company: 'Creative Design House',
      position: 'Fashion Designer',
      year: '2021 - 2022',
      responsibilities: [
        'Developed 20+ unique fashion designs annually',
        'Managed client relationships and custom orders',
        'Created technical drawings and specification sheets',
      ],
    },
    {
      company: 'Textile Arts Studio',
      position: 'Junior Designer',
      year: '2020 - 2021',
      responsibilities: [
        'Assisted in pattern making and garment construction',
        'Explored traditional embroidery and textile techniques',
        'Supported product development and quality control',
      ],
    },
  ];

  const certifications = [
    'Professional Fashion Design Certification - FIT',
    'Advanced Adobe Creative Suite Master - Skill Academy',
    'Sustainable Fashion Practices - Green Institute',
    'Digital Fashion Illustration Specialization - Coursera',
  ];

  return (
    <div className="resume-page">
      {/* Page Header */}
      <section className="page-header section-dark">
        <div className="container">
          <h1>Resume</h1>
          <p>Professional experience and qualifications</p>
        </div>
      </section>

      {/* Main Resume */}
      <section className="section resume-content">
        <div className="container-md">
          {/* Header Section */}
          <div className="resume-header">
            <div>
              <h2>{profile?.name}</h2>
              <p className="position">{profile?.title}</p>
              <p className="bio">{profile?.bio}</p>
              {profile?.about && <p className="about">{profile?.about}</p>}
            </div>
            <button
              className="btn btn-primary download-btn"
              onClick={async () => {
                if (!resumeUrl) return;
                setDownloading(true);
                try {
                  // Try fetching the file as a blob and trigger client-side download
                  const resp = await fetch(resumeUrl);
                  if (!resp.ok) throw new Error('Network response not ok');
                  const blob = await resp.blob();
                  const blobUrl = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = blobUrl;
                  a.download = 'resume.pdf';
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(blobUrl);
                } catch (err) {
                  // Fallback: open in new tab
                  window.open(resumeUrl, '_blank', 'noopener');
                } finally {
                  setDownloading(false);
                }
              }}
              disabled={!resumeUrl || downloading}
            >
              <FiDownload /> {downloading ? 'Downloading…' : 'Download Resume'}
            </button>
          </div>

          {/* Skills Section */}
          <div className="resume-section">
            <h3>Core Skills</h3>
            <div className="skills-list">
              {profile?.skills?.map((skill, idx) => (
                <SkillTag 
                  key={idx} 
                  skill={skill.skill} 
                  proficiency={skill.proficiency}
                />
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="resume-section">
            <h3>Professional Experience</h3>
            <div className="timeline">
              {experience.map((exp, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>{exp.position}</h4>
                    <p className="company">{exp.company}</p>
                    <p className="year">{exp.year}</p>
                    <ul className="responsibilities">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="resume-section">
            <h3>Education</h3>
            <div className="education-list">
              {education.map((edu, idx) => (
                <div key={idx} className="education-item">
                  <div className="education-header">
                    <h4>{edu.degree}</h4>
                    <span className="year">{edu.year}</span>
                  </div>
                  <p className="school">{edu.school}</p>
                  <p className="details">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="resume-section">
            <h3>Certifications & Courses</h3>
            <div className="certifications-list">
              {certifications.map((cert, idx) => (
                <div key={idx} className="certification-item">
                  <span className="cert-badge">✓</span>
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resume;
