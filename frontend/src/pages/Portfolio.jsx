import React, { useState, useEffect } from 'react';
import api from '../api/axiosClient';
import PortfolioCard from '../components/PortfolioCard';
import './Portfolio.css';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, [category]);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      let url = '/api/portfolio';
      if (category !== 'All') {
        url = `/api/portfolio/category/${category}`;
      }
      const response = await api.get('/api/portfolio');
      if (response.data.success) {
        setPortfolio(response.data.portfolio);
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portfolio-page">
      {/* Page Header */}
      <section className="page-header section-dark">
        <div className="container">
          <h1>Portfolio</h1>
          <p>Explore my digital and hand-crafted fashion designs</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section portfolio-content">
        <div className="container">
          {/* Filter Buttons */}
          <div className="filter-buttons">
            <button
              className={`filter-btn ${category === 'All' ? 'active' : ''}`}
              onClick={() => setCategory('All')}
            >
              All Work
            </button>
            <button
              className={`filter-btn ${category === 'Digital' ? 'active' : ''}`}
              onClick={() => setCategory('Digital')}
            >
              Digital Works
            </button>
            <button
              className={`filter-btn ${category === 'Hand' ? 'active' : ''}`}
              onClick={() => setCategory('Hand')}
            >
              Hand Works
            </button>
          </div>

          {/* Portfolio Grid */}
          {loading ? (
            <div className="loading-state">
              <p>Loading portfolio...</p>
            </div>
          ) : portfolio.length > 0 ? (
            <div className="grid grid-3">
              {portfolio.map((item) => (
                <PortfolioCard key={item._id} portfolio={item} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No portfolio items found</h3>
              <p>Check back soon for new work</p>
            </div>
          )}
        </div>
      </section>

      {/* Category Info Section */}
      <section className="section category-info section-dark">
        <div className="container">
          <div className="grid grid-2">
            <div className="info-card">
              <h3>Digital Works</h3>
              <p>
                Created using industry-standard design software. These pieces 
                showcase my digital design skills, from fashion illustrations 
                to complete digital collections.
              </p>
              <ul>
                <li>Fashion Illustrations</li>
                <li>Digital Collections</li>
                <li>Concept Design</li>
                <li>UI/UX Fashion Applications</li>
              </ul>
            </div>

            <div className="info-card">
              <h3>Hand Works</h3>
              <p>
                Intricate hand-crafted pieces featuring embroidery, beadwork, 
                and traditional textile techniques. Each piece is unique and 
                made with meticulous attention to detail.
              </p>
              <ul>
                <li>Embroidered Garments</li>
                <li>Hand-Beaded Designs</li>
                <li>Textile Art</li>
                <li>Custom Garment Construction</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
