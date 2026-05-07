import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Myvoucher.css";
import API from "../services/api";


function Myvoucher() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");

  // UI
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("my_vouchers");

  // Data
  const [status, setStatus] = useState("LOADING");
  const [vouchers, setVouchers] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    if (!orderId) {
      navigate("/");
      return;
    }

    let interval;

          const fetchStatus = async () => {
            try {
          const res = await API.get(
        `/api/primegift/order-status/${orderId}`
      );

        if (res.data.status === "SUCCESS") {
          setStatus("SUCCESS");
          setVouchers(res.data.vouchers || []);
          clearInterval(interval);
        } else if (res.data.status === "FAILED") {
          setStatus("FAILED");
          clearInterval(interval);
        } else {
          setStatus("PROCESSING");
        }

      } catch (err) {
        console.error(err);
        setStatus("FAILED");
        clearInterval(interval);
      }
    };

    fetchStatus();
    interval = setInterval(fetchStatus, 3000);

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="app-layout">

      {/* Navbar */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="main-container">

        {/* Sidebar */}
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        {/* Content */}
        <div className="content-area">

          {status === "LOADING" && (
            <div className="state-container">
              <div className="loading-spinner"></div>
              <h3>Loading your vouchers...</h3>
              <p>Please wait while we retrieve your order details</p>
            </div>
          )}

          {status === "PROCESSING" && (
            <div className="state-container processing-state">
              <div className="pulse-animation"></div>
              <div className="loading-spinner"></div>
              <h3>Processing your order</h3>
              <p>Your voucher is being generated securely</p>
              <div className="progress-steps">
                <div className="step completed">
                  <span className="step-icon">✓</span>
                  <span>Order Confirmed</span>
                </div>
                <div className="step active">
                  <span className="step-icon">⟳</span>
                  <span>Generating Voucher</span>
                </div>
                <div className="step">
                  <span className="step-icon">🔒</span>
                  <span>Securing PIN</span>
                </div>
              </div>
            </div>
          )}

          {status === "FAILED" && (
            <div className="state-container error-state">
              <div className="error-icon">✗</div>
              <h3>Order Failed</h3>
              <p>Payment failed or refunded</p>
              <button onClick={() => navigate("/")} className="home-button">
                Return to Home
              </button>
            </div>
          )}

          {status === "SUCCESS" && (
            <div>
              <div className="success-header">
                <div className="success-icon">✓</div>
                <h2 className="page-title">Your Vouchers</h2>
                <p className="page-description">Thank you for your purchase</p>
              </div>

              {vouchers.length === 0 ? (
                <div className="empty-vouchers">
                  <p>No vouchers found</p>
                </div>
              ) : (
                <div className="vouchers-list">
                  {vouchers.map((v, i) => (
                    <div key={i} className="voucher-card-modern">
                      
                      {/* Brand Section */}
                      <div className="brand-section">
                        <div className="brand-logo">
                          {v.brandImage ? (
                            <img src={v.brandImage} alt={v.brandName} />
                          ) : (
                            <div className="logo-placeholder">🎁</div>
                          )}
                        </div>
                        <div className="brand-info">
                          <h4>{v.brandName}</h4>
                          <span className="badge">Gift Voucher</span>
                        </div>
                        <div className="amount-display">
                          <span className="currency">₹</span>
                          <span className="amount-value">{(v.amount / 100).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Voucher Code Section */}
                      <div className="detail-row">
                        <div className="detail-label">
                          <span className="label-icon"></span>
                          <span>Voucher Code</span>
                        </div>
                        <div className="detail-value code-value">
                          <code>{v.code}</code>
                          <button 
                            onClick={() => handleCopy(v.code, i)}
                            className={`copy-btn ${copiedIndex === i ? 'copied' : ''}`}
                          >
                            {copiedIndex === i ? '✓ Copied!' : 'Copy'}
                          </button>
                        </div>
                      </div>

                      {/* PIN Section */}
                      {v.pinEncrypted && (
                        <PinRevealModern pin={v.pinEncrypted} />
                      )}

                      {/* Footer */}
                      <div className="voucher-footer">
                        <span className="footer-text"></span>
                        <span className="footer-link"></span>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function PinRevealModern({ pin }) {
  const [show, setShow] = useState(false);

  return (
    <div className="detail-row pin-row">
      <div className="detail-label">
        <span className="label-icon"></span>
        <span>PIN Code</span>
      </div>
      <div className="detail-value">
        <code>{show ? pin : "••••••"}</code>
        <button onClick={() => setShow(!show)} className="reveal-btn">
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}

export default Myvoucher;