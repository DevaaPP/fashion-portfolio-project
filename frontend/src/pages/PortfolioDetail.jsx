import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosClient';
import './PortfolioDetail.css';

const PortfolioDetail = () => {
  const { id } = useParams();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await api.get(`/api/portfolio/${id}`);

        if (data.success) {
          setPortfolio(data.portfolio);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="portfolio-detail-loading">
        Loading project...
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="portfolio-detail-error">
        Project not found.
      </div>
    );
  }

  return (
    <div className="portfolio-detail">
      <div className="container">

        <Link to="/portfolio" className="back-link">
          ← Back to Portfolio
        </Link>

        <h1 className="detail-title">
          {portfolio.title}
        </h1>

        <p className="detail-category">
          {portfolio.category}
        </p>

        <div className="detail-images">
          {portfolio.images?.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={portfolio.title}
              className="detail-image"
            />
          ))}
        </div>

        <div className="detail-content">
          <h2>Description</h2>
          <p>{portfolio.description}</p>

          {portfolio.tags?.length > 0 && (
            <>
              <h2>Tags</h2>
              <div className="tags-container">
                {portfolio.tags.map((tag, index) => (
                  <span key={index} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}

          {portfolio.tools?.length > 0 && (
            <>
              <h2>Tools Used</h2>
              <div className="tools-container">
                {portfolio.tools.map((tool, index) => (
                  <span key={index} className="tool-pill">
                    {tool}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default PortfolioDetail;