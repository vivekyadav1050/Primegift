import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <div className="footer-links">
          <Link to="/contact" className="footer-link">Contact Us</Link>
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/faq" className="footer-link">FAQs</Link>
            <a href="#" className="footer-link">Blog</a>
            <a href="#" className="footer-link">My Profile</a>
            <a href="#" className="footer-link">My Transactions</a>
            <a href="#" className="footer-link">Enquire</a>
          </div>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4 className="footer-heading">Connect With Us</h4>
          <div className="social-links">
            <a href="#" className="social-link">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
              Facebook
            </a>
            <a href="#" className="social-link">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
              Twitter
            </a>
            <a href="#" className="social-link">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
            <a href="#" className="social-link">
              <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
              YouTube
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Legal</h4>
          <div className="footer-links">
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Use</Link>
            <Link to="/loyalty" className="footer-link">Loyalty Program</Link>
            <Link to="/sitemap" className="footer-link">Site Map</Link>
            <Link to="/offers" className="footer-link">Offer Terms</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <p>© 2026 PrimeGift. All rights reserved. Made with ❤️ for gift lovers</p>
      </div>
    </footer>
  );
}

export default Footer;