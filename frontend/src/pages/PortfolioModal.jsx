import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosClient';
import { FiX } from 'react-icons/fi';
import './PortfolioModal.css';

const PortfolioModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/api/portfolio/${id}`);
        setPortfolio(data.portfolio);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProject();
  }, [id]);

  if (!portfolio) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={() => navigate('/portfolio')}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={() => navigate('/portfolio')}
        >
          <FiX size={24} />
        </button>

        <h1>{portfolio.title}</h1>

        <p className="modal-category">
          {portfolio.category}
        </p>

        <div className="modal-images">
          {portfolio.images?.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={portfolio.title}
            />
          ))}
        </div>

        <div className="modal-description">
          {portfolio.description}
        </div>

        {portfolio.tags?.length > 0 && (
          <>
            <h3>Tags</h3>

            <div className="modal-tags">
              {portfolio.tags.map((tag, i) => (
                <span key={i}>{tag}</span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioModal;