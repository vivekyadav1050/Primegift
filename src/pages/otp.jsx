import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/otp.css";
import API from "../services/api";

function Otp() {

  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone || "";
  const initialSessionId = location.state?.sessionId || "";

  const [otp, setOtp] = useState("");
  const [sessionId, setSessionId] = useState(initialSessionId);

  const [error, setError] = useState("");
  const [verifySuccess, setVerifySuccess] = useState("");
  const [resendSuccess, setResendSuccess] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {

    if (!phone || !sessionId) {
      navigate("/register");
    }

  }, [phone, sessionId, navigate]);

  useEffect(() => {

    let interval;

    if (timer > 0) {

      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

    }

    return () => clearInterval(interval);

  }, [timer]);

  // VERIFY OTP
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }

    try {

      setLoading(true);

      setError("");
      setVerifySuccess("");
      setResendSuccess("");

      const res = await API.post(
        "/api/auth/verify-otp",
        {
          phone,
          otp,
          sessionId
        }
      );

      setVerifySuccess(
        res.data.message || "OTP verified successfully"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Wrong OTP. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  // RESEND OTP
  const handleResend = async () => {

    try {

      setLoading(true);

      setError("");
      setVerifySuccess("");
      setResendSuccess("");

      const res = await API.post(
        "/api/auth/resend-otp",
        {
          phone
        }
      );

      // IMPORTANT
      setSessionId(res.data.sessionId);

      setResendSuccess(
        res.data.message || "OTP resent successfully"
      );

      setTimer(30);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Failed to resend OTP"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="otp-app">

      {loading && (
        <div className="otp-loader-overlay">
          <div className="otp-spinner"></div>
        </div>
      )}

      {isOpen && (
        <div
          className="otp-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      <Navbar
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />

      {/* HERO */}
      <div className="otp-hero-section">
        <div className="otp-hero-content">

          <h1 className="otp-hero-title">
            Verify OTP
          </h1>

          <p className="otp-hero-subtitle">
            Enter the OTP sent to {phone}
          </p>

        </div>
      </div>

      {/* FORM */}
      <div className="otp-container">

        <div className="otp-card">

          <form
            onSubmit={handleSubmit}
            className="otp-form"
          >

            <div className="otp-group">

              <label className="otp-label">
                Enter OTP
                <span className="otp-required">*</span>
              </label>

              <input
                type="text"
                value={otp}
                onChange={(e) => {

                  setOtp(e.target.value);

                  setError("");
                  setVerifySuccess("");
                  setResendSuccess("");

                }}
                placeholder="Enter 6-digit OTP"
                className={`otp-input ${
                  error ? "otp-input-error" : ""
                }`}
                maxLength={6}
                disabled={!!verifySuccess}
              />

              {error && (
                <span className="otp-error">
                  {error}
                </span>
              )}

              {verifySuccess && (
                <span className="otp-success">
                  {verifySuccess}
                </span>
              )}

              {resendSuccess && (
                <span className="otp-success">
                  {resendSuccess}
                </span>
              )}

            </div>

            {/* VERIFY BUTTON */}
            <button
              type="submit"
              className="otp-btn"
              disabled={loading || !!verifySuccess}
            >

              {loading ? (
                <span className="otp-spinner"></span>
              ) : (
                "Verify OTP"
              )}

            </button>

            <div className="otp-divider">
              <span>OR</span>
            </div>

            {/* RESEND BUTTON */}
            <button
              type="button"
              className="otp-btn"
              onClick={handleResend}
              disabled={loading || timer > 0}
            >

              {timer > 0
                ? `Resend in ${timer}s`
                : "Resend OTP"}

            </button>

          </form>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default Otp;