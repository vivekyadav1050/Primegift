import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Myorder.css";


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
        const res = await axios.get(
          "http://localhost:3000/api/primegift/my-orders-full",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

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

          <h2 className="page-title">📦 My Orders</h2>

          {loading && <p>Loading...</p>}

          {!loading && orders.length === 0 && (
            <p>No orders found</p>
          )}

          {!loading &&
            orders.map((o, i) => (
              <div key={i} className="order-card">

                {/* Brand */}
                <div className="brand-row">
                  <img src={o.brandImage} alt={o.brandName} />
                  <h4>{o.brandName}</h4>
                </div>

                {/* Order Info */}
                <div className="row">
                  <span>Amount Paid:</span>
                  <span>₹ {(o.amount / 100).toFixed(2)}</span>
                </div>

                <div className="row">
                  <span>Status:</span>
                  <span className={`status ${o.status.toLowerCase()}`}>
                    {o.status}
                  </span>
                </div>

                <div className="row">
                  <span>Date:</span>
                  <span>
                    {new Date(o.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* 🔥 STATUS HANDLING */}

                {/* PROCESSING */}
                {o.status === "PROCESSING" && (
                  <p className="processing">⏳ Generating voucher...</p>
                )}

                {/* FAILED */}
                {o.status === "FAILED" && (
                  <p className="failed">❌ Failed / Refunded</p>
                )}

                {/* SUCCESS */}
                {o.status === "SUCCESS" && (
                  <div className="voucher-list">
                    {o.vouchers.map((v, idx) => (
                      <div key={idx} className="voucher-card">

                        <div className="row">
                          <span>Code:</span>
                          <span>{v.code}</span>
                        </div>

                        <div className="row">
                          <span>Voucher Value:</span>
                          <span>₹ {(v.amount / 100).toFixed(2)}</span>
                        </div>

                        <PinReveal pin={v.pin} />

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

/* 🔐 PIN Toggle */
function PinReveal({ pin }) {
  const [show, setShow] = useState(false);

  return (
    <div className="row">
      <span>PIN:</span>
      <div>
        {show ? pin : "••••••"}
        <button onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default MyOrders;