import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import AuthPanel from './AuthPanel';
import './Navbar.css';
import logo from '../assets/log.png'; // Adjust the path as necessary

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search functionality here
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo">
            <img src={logo} alt="Logo" className="logo-img" />
            <span className="logo-text">#goRED</span>
          </div>
        </div>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/shop" className="nav-link">Shop</Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link">My List</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>

        <div className="navbar-right">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>
          <button 
            className="account-link"
            onClick={() => setIsAuthPanelOpen(true)}
          >
            <FaUser className="account-icon" />
          </button>
        </div>
      </div>

      <AuthPanel 
        isOpen={isAuthPanelOpen} 
        onClose={() => setIsAuthPanelOpen(false)} 
      />
    </nav>
  );
};

export default Navbar; 