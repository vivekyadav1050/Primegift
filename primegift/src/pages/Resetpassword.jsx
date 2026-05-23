import React, { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation
} from "react-router-dom";


import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/otp.css";

import API from "../services/api";

function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const resetToken =
    location.state?.resetToken || "";

  const phone =
    location.state?.phone || "";

  const [newPassword, setNewPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword
  ] = useState(false);

  const [passwordError, setPasswordError] =
    useState("");

  const [confirmError, setConfirmError] =
    useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [isOpen, setIsOpen] =
    useState(false);

  useEffect(() => {

    if (!resetToken) {
      navigate("/forgot-password");
    }

  }, [resetToken, navigate]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      passwordError ||
      confirmError
    ) {
      return;
    }

    if (!newPassword || !confirmPassword) {

      setError("All fields required");

      return;
    }

    try {

      setLoading(true);

      setError("");
      setSuccess("");

      const res = await API.post(
        "/api/auth/forgot-password/reset",
        {
          newPassword,
          resetToken
        }
      );

      setSuccess(
        res.data.message ||
        "Password reset successful"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Failed to reset password"
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
            Reset Password
          </h1>

          <p className="otp-hero-subtitle">
            {phone && `Account: ${phone}`}
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

            {/* NEW PASSWORD */}
            <div className="otp-group">

              <label
                className="otp-label"
                style={{ fontSize: "14px" }}
              >
                New Password
                <span className="otp-required">*</span>
              </label>

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center"
                }}
              >

                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  value={newPassword}
                  onChange={(e) => {

                    const value =
                      e.target.value;

                    setNewPassword(value);

                    setError("");
                    setSuccess("");

                    // LIVE VALIDATION
                    if (!value) {

                      setPasswordError(
                        "Password required"
                      );

                    } else if (
                      !/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value)
                    ) {

                      setPasswordError(
                        "Password must be 6+ characters with letters and numbers"
                      );

                    } else {

                      setPasswordError("");
                    }

                    // confirm password live check
                    if (
                      confirmPassword &&
                      value !== confirmPassword
                    ) {

                      setConfirmError(
                        "Passwords do not match"
                      );

                    } else {

                      setConfirmError("");
                    }

                  }}
                  placeholder="Enter new password"
                  className={`otp-input ${
                    passwordError || error
                      ? "otp-input-error"
                      : ""
                  }`}
                  style={{
                    paddingRight: "10px",
                    fontSize: "14px"
                  }}
                />

                {/* <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }
                  style={{
                    position: "absolute",
                    right: "15px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: "#64748b"
                  }}
                >
                  {showNewPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button> */}

              </div>

              {passwordError && (
                <span className="otp-error">
                  {passwordError}
                </span>
              )}

            </div>

            {/* CONFIRM PASSWORD */}
            <div className="otp-group">

              <label
                className="otp-label"
                style={{ fontSize: "14px" }}
              >
                Confirm Password
                <span className="otp-required">*</span>
              </label>

              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center"
                }}
              >

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) => {

                    const value =
                      e.target.value;

                    setConfirmPassword(
                      value
                    );

                    setError("");
                    setSuccess("");

                    if (
                      value !== newPassword
                    ) {

                      setConfirmError(
                        "Passwords do not match"
                      );

                    } else {

                      setConfirmError("");
                    }

                  }}
                  placeholder="Confirm new password"
                  className={`otp-input ${
                    confirmError || error
                      ? "otp-input-error"
                      : ""
                  }`}
                  style={{
                    paddingRight: "55px",
                    fontSize: "14px"
                  }}
                />

                {/* <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  style={{
                    position: "absolute",
                    right: "15px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: "#64748b"
                  }}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button> */}

              </div>

              {confirmError && (
                <span className="otp-error">
                  {confirmError}
                </span>
              )}

            </div>

            {error && (
              <span className="otp-error">
                {error}
              </span>
            )}

            {success && (
              <span className="otp-success">
                {success}
              </span>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="otp-btn"
              disabled={
                loading ||
                !!success ||
                !!passwordError ||
                !!confirmError
              }
            >

              {loading ? (
                <span className="otp-spinner"></span>
              ) : (
                "Reset Password"
              )}

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

export default ResetPassword;