import React from 'react';
import './NavbarBox.css';

const NavbarBox = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left side - Logo */}
        <div className="navbar-left">
          <a href="/" className="logo">
            <img src="/logo.png" alt="PZN Logo" />
          </a>
        </div>

        {/* Center - Navigation Links */}
        <div className="navbar-center">
          <div className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/shop" className="nav-link">Shop</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
            <a href="/account" className="nav-link">Account</a>
          </div>
        </div>

        {/* Right side - Search */}
        <div className="navbar-right">
          <div className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarBox; 