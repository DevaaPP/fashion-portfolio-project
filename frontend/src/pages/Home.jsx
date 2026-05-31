import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import api from '../api/axiosClient';
import PortfolioCard from '../components/PortfolioCard';
import './Home.css';

const Home = () => {
  const [featuredWork, setFeaturedWork] = useState([]);
  const [heroWork, setHeroWork] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchFeaturedWork();
    fetchProfile();
  }, []);

  const fetchFeaturedWork = async () => {
    setLoading(true);
    try {
      // Use query param for featured to match backend getAllPortfolio handler
      const response = await api.get('/api/portfolio?featured=true');
      console.debug('Featured API response:', response.data);
      if (response.data.success) {
        const featured = response.data.portfolio.filter(
          (item) => item.featured === true
        );
        
        setFeaturedWork(featured);
        if (featured.length > 0) {
          setHeroWork(featured[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching featured work:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      // Fetch from first admin user (designer)
      const response = await api.get('/api/users/profile/designer');
      if (response.data.success) {
        setProfile(response.data.user);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Crafting <span className="accent-text">Elegance</span> Through Design
            </h1>
            <p className="hero-subtitle">
              Fashion designer specializing in digital and hand-crafted creations
            </p>
            <div className="hero-cta">
              <Link to="/contact" className="btn btn-secondary">
                Start a Commission
              </Link>
              <Link to="/portfolio" className="btn btn-outline">
                Explore Portfolio
              </Link>
            </div>
          </div>

          <div className="hero-image">
            {heroWork?.images?.[0]?.url ? (
              <img src={heroWork.images[0].url} alt={heroWork.title} className="hero-featured-image"/>
            ) : (
            <div className="image-placeholder">
              <span>Featured Work</span>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>About The Designer</h2>
              <p>
                With a passion for blending creativity with precision, I create 
                fashion designs that tell stories. My work spans both digital creations 
                and intricate hand-crafted pieces, each reflecting a unique vision.
              </p>
              <p>
                I specialize in custom commissions, collaborations, and design 
                consulting, working closely with clients to bring their visions 
                to life.
              </p>

              <div className="-stats">
                <div className="stat">
                  <h3>50+</h3>
                  <p>Completed Projects</p>
                </div>
                <div className="stat">
                  <h3>25+</h3>
                  <p>Happy Clients</p>
                </div>
                <div className="stat">
                  <h3>3+</h3>
                  <p>Years Experience</p>
                </div>
              </div>
            </div>

            <div className="about-image">
              {profile?.profileImage?.url ? (
                <img 
                  src={profile.profileImage.url}
                  alt="Profile Image"
                  className="hero-featured-image"
                />
              ) : (
                <div className="image-placeholder">Profile Image</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="section section-dark featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Work</h2>
            <p>A selection of recent projects showcasing diverse styles and techniques</p>
          </div>

          {loading ? (
            <div className="loading">Loading featured work...</div>
          ) : (
            <>
              <div className="featured-grid">
                {featuredWork.map((item) => (
                  <PortfolioCard key={item._id} portfolio={item} />
                ))}
              </div>

              {featuredWork.length === 0 && (
                <div className="empty-state">
                  <p>Featured work coming soon</p>
                </div>
              )}

              <div className="section-cta">
                <Link to="/portfolio" className="btn btn-secondary">
                  View All Projects <FiArrowRight />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="section skills-section">
        <div className="container">
          <h2>Core Competencies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Design Software</h4>
              <ul>
                <li>Adobe Creative Suite</li>
                <li>Illustrator</li>
                <li>Photoshop</li>
                <li>Indesign</li>
              </ul>
            </div>

            <div className="skill-category">
              <h4>Specializations</h4>
              <ul>
                <li>Fashion Illustration</li>
                <li>Pattern Design</li>
                <li>Textile Design</li>
                <li>Garment Construction</li>
              </ul>
            </div>

            <div className="skill-category">
              <h4>Techniques</h4>
              <ul>
                <li>Hand Sketching</li>
                <li>Digital Design</li>
                <li>Embroidery</li>
                <li>Beadwork</li>
              </ul>
            </div>

            <div className="skill-category">
              <h4>Services</h4>
              <ul>
                <li>Custom Commissions</li>
                <li>Design Consulting</li>
                <li>Collaborations</li>
                <li>Workshops</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark cta-section">
        <div className="container-md">
          <h2>Ready to Collaborate?</h2>
          <p>
            Whether you have a specific vision or need design expertise, 
            let's work together to create something extraordinary.
          </p>

          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-secondary">
              Commission a Design
            </Link>
            <Link to="/resume" className="btn btn-outline">
              <FiDownload /> Download Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
