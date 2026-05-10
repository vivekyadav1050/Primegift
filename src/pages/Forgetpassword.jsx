import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";



import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import "../styles/login.css";

function ForgotPassword() {

  const navigate = useNavigate();

  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState("Forgot Password");

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!phone) {
      setError("Phone number required");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Invalid phone number");
      return;
    }

    setError("");

    try {

      setLoading(true);
            const response = await API.post(
        "/api/auth/forgot-password/send-otp",
        { phone }
      );

      // OTP page navigate
         navigate("/otp", {
      state: {
        phone,
        sessionId: response.data.sessionId,
        purpose: "forgot-password"
      }
    });

    } catch (error) {

        console.log(error);

    setError(
      error?.response?.data?.message ||
      "Failed to send OTP"
    );

  }
    
    finally {

      setLoading(false);
    }
  };

  return (
    <div className="login-app">

      {isOpen && (
        <div
          className="login-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      <Navbar
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="login-hero-section">

        <div className="login-hero-content">

          <h1 className="login-hero-title">
            Forgot Password
          </h1>

        </div>

      </div>

      <div className="login-container">

        <div className="login-card">

          <h2
            style={{
              marginBottom: "1rem",
              textAlign: "center"
            }}
          >
            Reset your password
          </h2>

         <form
  onSubmit={handleSubmit}
  className="login-form"
  style={{
    justifyContent: "flex-start",
    gap: "16px"
  }}
>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}
            >

              <input
                type="tel"
                placeholder="Enter Mobile Number"
                className="login-input"
                value={phone}
onChange={(e) => {
  setPhone(
    e.target.value.replace(/\D/g, "")
  );

  setError("");
}}                maxLength={10}
              />

              {error && (
                <p className="login-error">
                  {error}
                </p>
              )}

            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            <p className="login-text">

              Remember password?

              <button
                type="button"
                className="login-link"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

            </p>

          </form>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default ForgotPassword;