import React from 'react';
import { FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer section-dark">
      <div className="container">
        <div className="grid grid-3">
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/portfolio">Portfolio</a></li>
              <li><a href="/resume">Resume</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#commission">Custom Commissions</a></li>
              <li><a href="#collab">Collaborations</a></li>
              <li><a href="#consulting">Design Consulting</a></li>
              <li><a href="#workshops">Workshops</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://www.instagram.com/" aria-label="Instagram"><FiInstagram size={20} /></a>
              <a href="#linkedin" aria-label="LinkedIn"><FiLinkedin size={20} /></a>
              <a href="#email" aria-label="Email"><FiMail size={20} /></a>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Fashion Designer Portfolio. All rights reserved.</p>
          <div className="footer-credits">
            <p>Designed & Developed with precision</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
