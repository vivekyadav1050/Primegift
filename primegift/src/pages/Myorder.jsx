import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Myorder.css";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MyOrders() {
  // UI
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("my_orders");

  // Data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/api/primegift/my-orders-full");
        setOrders(res.data.orders || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="app-layout">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="main-container">
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        <div className="content-area">
          <div className="page-header">
            <h1 className="page-title">My Orders</h1>
            <p className="page-subtitle">Track and manage all your purchases</p>
          </div>

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading your orders...</p>
            </div>
          )}

          {!loading && orders.length === 0 && (
            <div className="empty-state">
              <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                <circle cx="12" cy="16" r="1" />
              </svg>
              <h3>No orders yet</h3>
              <p>When you make a purchase, your orders will appear here</p>
            </div>
          )}

          {!loading && orders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <div className="brand-info">
                  <img src={order.brandImage} alt={order.brandName} />
                  <div>
                    <h3>{order.brandName}</h3>
                    <span className="order-id">Order #{order.id || index + 1}</span>
                  </div>
                </div>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">Amount Paid</span>
                  <span className="detail-value">₹ {(order.amount / 100).toFixed(2)}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Order Date</span>
                  <span className="detail-value">{new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>

                {order.status === "PROCESSING" && (
                  <div className="message processing">
                    <span>⏳ Generating voucher</span>
                  </div>
                )}

                {order.status === "FAILED" && (
                  <div className="message failed">
                    <span>❌ Payment failed or refunded</span>
                  </div>
                )}
              </div>

              {order.status === "SUCCESS" && order.vouchers.length > 0 && (
                <div className="vouchers-section">
                  <h4>Vouchers</h4>
                  {order.vouchers.map((voucher, idx) => (
                    <div key={idx} className="voucher-item">
                      <div className="voucher-info">
                        <div className="info-row">
                          <span className="label">Code</span>
                          <span className="code">{voucher.code}</span>
                        </div>
                        <div className="info-row">
                          <span className="label">Value</span>
                          <span className="value">₹ {(voucher.amount / 100).toFixed(2)}</span>
                        </div>
                        <PinReveal pin={voucher.pin} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PinReveal({ pin }) {
  const [show, setShow] = useState(false);

  return (
    <div className="pin-section">
      <span className="pin-label">PIN</span>
      <div className="pin-wrapper">
        <span className="pin-value">{show ? pin : "••••••"}</span>
        <button className="pin-toggle" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default MyOrders;