import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart } from 'react-icons/fi';
import './PortfolioCard.css';

const PortfolioCard = ({ portfolio }) => {
  const mainImage = portfolio.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image';
  const [liked, setLiked] = React.useState(false);

  const handleLike = () => {
    setLiked(!liked);
    // API call would go here
  };

  return (
    <div className="portfolio-card">
      <div className="card-image-wrapper">
        <img src={mainImage} alt={portfolio.title} className="card-image" />
        <div className="card-overlay">
          <Link to={`/portfolio/${portfolio._id}`} className="btn btn-secondary">
            View Project <FiArrowRight />
          </Link>
        </div>
      </div>

      <div className="card-content">
        <div className="card-category">
          <span className="category-badge">{portfolio.category}</span>
        </div>

        <h4 className="card-title">{portfolio.title}</h4>

        <p className="card-description">
          {portfolio.description.substring(0, 80)}...
        </p>

        <div className="card-meta">
          <div className="card-tags">
            {portfolio.tags?.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>
          <button 
            className="like-btn" 
            onClick={handleLike}
            aria-label="Like"
          >
            <FiHeart fill={liked ? 'currentColor' : 'none'} />
            {portfolio.likes || 0}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
