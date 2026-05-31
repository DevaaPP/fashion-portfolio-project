import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">VIRAT KOHLI</span>
          <span className="logo-subtext">Fashion & Graphics Design</span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/portfolio" className="nav-link" onClick={() => setIsOpen(false)}>
            Portfolio
          </Link>
          <Link to="/resume" className="nav-link" onClick={() => setIsOpen(false)}>
            Resume
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
          <Link to="/admin/login" className="nav-link nav-link-admin" onClick={() => setIsOpen(false)}>
            Admin
          </Link>
        </div>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
