import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import SkillTag from '../components/SkillTag';
import './Resume.css';

const Resume = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Mock profile data - in real app, fetch from API
    setProfile({
      name: 'Fashion Designer',
      title: 'Fashion & Design Specialist',
      bio: 'Innovative fashion designer with expertise in both digital and hand-crafted designs',
      skills: [
        { skill: 'Fashion Illustration', proficiency: 'Expert' },
        { skill: 'Pattern Design', proficiency: 'Expert' },
        { skill: 'Adobe Illustrator', proficiency: 'Expert' },
        { skill: 'Textile Design', proficiency: 'Intermediate' },
        { skill: 'Embroidery & Beadwork', proficiency: 'Expert' },
        { skill: 'Photoshop', proficiency: 'Intermediate' },
      ],
    });
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
            </div>
            <button className="btn btn-primary download-btn">
              <FiDownload /> Download Resume
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
