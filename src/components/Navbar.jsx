import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { useNavigate, Link } from "react-router-dom";

function Navbar({ setIsOpen, isOpen }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-left">
        <button
          className={`menu-btn ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <div className="menu-icon-wrapper">
            <span className="menu-line top"></span>
            <span className="menu-line middle"></span>
            <span className="menu-line bottom"></span>
          </div>
        </button>

        <Link to="/" className="logo-section">
          <img 
            src="/favicon.png" 
            alt="PrimeGift Logo" 
            className="logo-image"
          />
          <h2 className="logo">PrimeGift</h2>
        </Link>
      </div>

      <div className="auth-buttons">
        {!user && (
          <>
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Get Started
              <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </>
        )}
        {user && (
          <div className="user-menu">
            <div className="user-avatar">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;