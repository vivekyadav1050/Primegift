import React from "react";
import "../styles/cards.css";
import { useNavigate } from "react-router-dom";

function GiftGrid({ filteredGifts }) {
  const navigate = useNavigate();

  const getDiscountText = (item) => {
    if (item.discountPercentage) return `${item.discountPercentage}% OFF`;
    if (item.offer) return item.offer;
    return null;
  };

  const calculateSavings = (original, discounted) => {
    if (original && discounted) {
      const savings = ((original - discounted) / original * 100).toFixed(0);
      return `Save ${savings}%`;
    }
    return null;
  };

  return (
    <div className="cards-section">
      <div className="section-header">
        <h2 className="section-title">✨ 
          Currently in production 
          Featured Offers</h2>
        <p className="section-subtitle">
          351+ Premium Vouchers Available
        </p>
      </div>

      {filteredGifts.length === 0 ? (
        <div className="no-results">
          <p>🔍 No vouchers found. Try searching for something else!</p>
        </div>
      ) : (
        <div className="card-grid">
          {filteredGifts.map((item) => {
            const discountText = getDiscountText(item);
            const savingsText = calculateSavings(item.originalPrice, item.discountedPrice);
            
            return (
              <div
                key={item.id}
                className="card"
                onClick={() => navigate(`/product/${item.id}`, { state: item })}
              >
                {/* Logo Section */}
                <div className="logo-container">
                  <img
                    src={item.logo || "/fallback.png"}
                    alt={item.name || "brand"}
                    className="brand-logo"
                    onError={(e) => (e.target.src = "/fallback.png")}
                  />
                </div>

                {/* Discount Badge */}
                {/* {discountText && (
                  <div className="discount-container">
                    <span className="discount-badge"> {discountText}</span>
                  </div>
                )} */}

                {/* Card Content */}
                <div className="card-content">
                  <h3 className="card-title">{item.name}</h3>
                  
                  {/* Price Section */}
                  {item.originalPrice && item.discountedPrice ? (
                    <div className="price-wrapper">
                      <span className="original-price">${item.originalPrice}</span>
                      <span className="discounted-price">${item.discountedPrice}</span>
                      {savingsText && <span className="save-badge">{savingsText}</span>}
                    </div>
                  ) : discountText && (
                    <div className="price-wrapper">
                      <span className="discounted-price">{discountText}</span>
                    </div>
                  )}

                  {/* Features */}
                  {item.features && item.features.length > 0 && (
                    <div className="features">
                      {item.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="feature-item">
                          <span className="feature-icon">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button className="card-btn">
                    Get Voucher
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GiftGrid;