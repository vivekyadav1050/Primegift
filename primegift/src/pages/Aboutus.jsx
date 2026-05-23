import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import aboutContent from "../content/Aboutus";
import "../styles/Aboutus.css";

function About() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("about");

  return (
    <div className="about-app-layout">

      {/* Navbar */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="about-main-container">

        {/* Sidebar */}
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        {/* Content */}
        <div className="about-content-area">

          <div className="about-hero-section">
            <div className="about-hero-content">
              <h1 className="about-hero-title">
                About <span className="gradient-text">Us</span>
              </h1>
              <p className="about-hero-subtitle">
                Your trusted partner for premium gift vouchers and digital solutions
              </p>
            </div>
          </div>

          <div className="about-container">
            <div className="about-card-modern">
              {aboutContent.split("\n\n").map((para, i) => {
                // Check if paragraph contains heading indicators
                if (para.includes("**") || para.includes("Mission") || para.includes("Vision")) {
                  const cleanPara = para.replace(/\*\*/g, '');
                  return (
                    <div key={i} className="about-highlight-section">
                      <p>{cleanPara}</p>
                    </div>
                  );
                }
                return <p key={i} className="about-paragraph">{para}</p>;
              })}
            </div>

            {/* Stats Section */}
            <div className="about-stats-grid">
              <div className="stat-card">
                <div className="stat-number">100+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">400+</div>
                <div className="stat-label">Brand Partners</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Customer Support</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Secure Payments</div>
              </div>
            </div>

            {/* Features Section */}
            <div className="about-features-grid">
              <div className="feature-item">
                <div className="feature-icon">🎁</div>
                <h3>Instant Delivery</h3>
                <p>Get your vouchers instantly after successful payment</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <h3>Secure Platform</h3>
                <p>Bank-grade security for all your transactions</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💳</div>
                <h3>Multiple Payments</h3>
                <p>UPI, Cards, NetBanking & more payment options</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⭐</div>
                <h3>Best Prices</h3>
                <p>Exclusive discounts and cashback offers</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default About;