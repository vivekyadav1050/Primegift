import React, { useState, useEffect } from "react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import "../styles/login.css";

import API from "../services/api";

import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const location = useLocation();

  const { checkAuth } = useAuth();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    rememberMe: false
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [activeMenu, setActiveMenu] = useState("Login");

  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  const handleInputChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validateLogin = () => {

    const newErrors = {};

    if (!formData.phone) {
      newErrors.phone = "Phone number required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.password) {

      newErrors.password = "Password required";

    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(formData.password)
    ) {

      newErrors.password =
        "Password must be 6+ characters with letters and numbers";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const err = validateLogin();

    if (Object.keys(err).length !== 0) {
      setErrors(err);
      return;
    }

    setLoading(true);

    try {

      const res = await API.post("api/auth/login", {
        phone: formData.phone,
        password: formData.password
      });

      // Save token
      localStorage.setItem("token", res.data.token);
            localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name
        })
      );

      // Verify token and set user globally
      await checkAuth();

      // Redirect
      navigate("/");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server error");
      }

    } finally {

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
            Welcome Back!
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
            Login to your account
          </h2>

          {location.state?.message && (
            <p
              className="login-error"
              style={{ marginBottom: "10px" }}
            >
              {location.state.message}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            {/* PHONE */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}
            >

              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                onChange={handleInputChange}
                className="login-input"
                maxLength={10}
              />

              {errors.phone && (
                <p className="login-error">
                  {errors.phone}
                </p>
              )}

            </div>

            {/* PASSWORD */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}
            >

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                className="login-input"
              />

              {errors.password && (
                <p className="login-error">
                  {errors.password}
                </p>
              )}

            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="login-text">

              Don't have account?

              <button
                type="button"
                className="login-link"
                onClick={() => navigate("/register")}
              >
                Register
              </button>

            </p>

          </form>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;