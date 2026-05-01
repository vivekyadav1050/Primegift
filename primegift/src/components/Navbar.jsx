import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { useNavigate, Link } from "react-router-dom";

function Navbar({ setIsOpen, isOpen }) {
  const navigate = useNavigate();


  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);


  return (
    
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰  
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
        Login
      </button>
      <button
        className="register-btn"
        onClick={() => navigate("/register")}
      >
        Get started
      </button>
    </>
  )}
</div>
    </nav>
  );
}

export default Navbar;