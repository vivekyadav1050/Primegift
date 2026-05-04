import React from "react";
import "../styles/cards.css";
import { useNavigate } from "react-router-dom";

function GiftGrid({ filteredGifts }) {
  const navigate = useNavigate();

  return (
    <div className="cards-section">
      <div className="section-header">
        <h2 className="section-title">Featured Offers</h2>
        <p className="section-subtitle">
          351+ vouchers available
        </p>
      </div>

      {filteredGifts.length === 0 ? (
        <div className="no-results">
          <p>No vouchers found. Try searching for something else!</p>
        </div>
      ) : (
        <div className="card-grid">
          {filteredGifts.map((item) => (
            <div
              key={item.id} // ✅ FIXED
              className="card"
              onClick={() =>
                navigate(`/product/${item.id}`, { state: item })
              }
            >
              {/* LOGO */}
              <div className="logo-container">
                <img
                  src={item.logo || "/fallback.png"}
                  alt={item.name || "brand"}
                  className="brand-logo"
                  onError={(e) => (e.target.src = "/fallback.png")}
                />
              </div>

              {/* NAME */}
              <h3 className="card-title">{item.name}</h3>

              {/* 🔥 SHOW ONLY IF EXISTS */}
              {item.offer && (
                <div className="offer-container">
                  <span className="offer-badge">{item.offer}</span>
                </div>
              )}

              <button className="card-btn">Get Voucher →</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GiftGrid;