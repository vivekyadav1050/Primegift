import React from "react";
import "../styles/sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen, activeMenu, setActiveMenu }) {
  const navigate = useNavigate();

  const menuItems = [
    "Home", "Myorder", "Categories", "Discount", "Offers",
    "Valentines Week", "Occasions", "Corporate Gifting",
    "Write & Earn", "My Transactions", "E-Pay Transactions",
    "Check Voucher Status", "FAQ's", "Contact us", "Logout"
  ];

  const getMenuIcon = (item) => {
    const icons = {
      Home: (
        <svg className="menu-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      Myorder: (
        <svg className="menu-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      Categories: (
        <svg className="menu-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      Discount: (
        <svg className="menu-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v3a2 2 0 01-2 2h-7m-7 9h14a2 2 0 002-2v-3a2 2 0 00-2-2H5a2 2 0 00-2 2v3a2 2 0 002 2z" />
        </svg>
      ),
      Offers: (
        <svg className="menu-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      Logout: (
        <svg className="menu-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
    };

    return icons[item] || (
      <svg className="menu-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    );
  };

  const handleMenuClick = (item) => {
    if (item === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
    }
    else if (item === "Home") {
      navigate("/");
      setActiveMenu(item);
      setIsOpen(false);
    }
    else if (item === "Myorder") {
      navigate("/Myorder");
      setActiveMenu(item);
      setIsOpen(false);
    }
    else {
      setActiveMenu(item);
      setIsOpen(false);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
       
          <span>PrimeGift</span>
        </div>

        <button
          className="close-btn"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </div>

      <div className="menu-items">
        {menuItems.map((item, i) => (
          <div
            key={i}
            className={`menu-item ${activeMenu === item ? "active" : ""}`}
            onClick={() => handleMenuClick(item)}
          >
            <span className="menu-icon-small">
              {getMenuIcon(item)}
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;