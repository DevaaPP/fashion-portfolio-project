import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1 className="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>
          Sorry, the page you're looking for doesn't exist. 
          It might have been moved or deleted.
        </p>
        
        <Link to="/" className="btn btn-primary">
          Return to Home
        </Link>

        <div className="suggestions">
          <h3>Suggested Pages</h3>
          <ul>
            <li><Link to="/portfolio">View Portfolio</Link></li>
            <li><Link to="/resume">View Resume</Link></li>
            <li><Link to="/contact">Get in Touch</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
