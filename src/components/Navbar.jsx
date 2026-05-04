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