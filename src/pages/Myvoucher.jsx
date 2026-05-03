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
            <div className="center-box">Loading...</div>
          )}

          {status === "PROCESSING" && (
            <div className="center-box">
              <h2>⏳ Processing your order</h2>
              <p>Your voucher is being generated...</p>
            </div>
          )}

          {status === "FAILED" && (
            <div className="center-box error">
              <h2>❌ Order Failed</h2>
              <p>Payment failed or refunded.</p>
              <button onClick={() => navigate("/")}>Go Home</button>
            </div>
          )}

          {status === "SUCCESS" && (
            <div>
              <h2 className="page-title">🎉 Your Voucher</h2>

              {vouchers.length === 0 ? (
                <p>No vouchers found</p>
              ) : (
                vouchers.map((v, i) => (
                  <div key={i} className="voucher-card">

                    {/* Brand */}
                    <div className="brand-row">
                      <img src={v.brandImage} alt={v.brandName} />
                      <h4>{v.brandName}</h4>
                    </div>

                    {/* Code */}
                    <div className="row">
                      <span>Code:</span>
                      <div>
                        {v.code}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(v.code);
                            alert("Copied!");
                          }}
                        >
                          📋
                        </button>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="row">
                      <span>Amount:</span>
                      <span>₹ {(v.amount / 100).toFixed(2)}</span>
                    </div>

                    {/* PIN */}
                    {v.pinEncrypted && <PinReveal pin={v.pinEncrypted} />}

                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

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

export default Myvoucher;