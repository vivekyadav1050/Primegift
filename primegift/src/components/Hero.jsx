import React from "react";
import "../styles/hero.css";

function Hero({ searchTerm, setSearchTerm }) {
  return (
    <div className="hero-section">
      {/* Floating orbs for modern effect */}
      <div className="orb-1"></div>
      <div className="orb-2"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">Discover Amazing Gift Cards</h1>
        <p className="hero-subtitle">Find the perfect voucher for every occasion</p>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search vouchers..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Search
          </button>
        </div>

   
      </div>
    </div>
  );
}

export default Hero;