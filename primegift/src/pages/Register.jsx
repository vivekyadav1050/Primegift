import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import axios from "axios";
import "../styles/Register.css";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Register");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const err = {};
    if (!formData.name) err.name = "Name required";
    if (!formData.email) err.email = "Email required";
    if (!formData.password) err.password = "Password required";
    if (formData.password !== formData.confirmPassword) {
      err.confirmPassword = "Passwords do not match";
    }
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (Object.keys(err).length !== 0) {
      setErrors(err);
      return;
    }

    try {
      setLoading(true);

   const res = await API.post("/api/auth/register", formData);

      console.log(res.data);

      navigate("/otp", { state: { email: formData.email } });

    } catch (error) {
      console.log(error);

      setErrors({
        api: error.response?.data?.message || "Registration failed"
      });

      setLoading(false);
    }
  };

  return (
    <div className="register-app">

      {loading && (
        <div className="register-loader-overlay">
          <div className="register-spinner"></div>
        </div>
      )}

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}

      <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      {/* HERO ADD HERE */}
        <div className="register-hero-section">
          <div className="register-hero-content">
            <h1 className="register-hero-title">Create Account</h1>
          </div>
        </div>

      <div className="register-container">
        <div className="register-card">

          <h2 className="register-title">Create Account</h2>

          {errors.api && <p className="register-error">{errors.api}</p>}

          <form onSubmit={handleSubmit} className="register-form">

            <input
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
              className="register-input"
            />
            {errors.name && <p className="register-error">{errors.name}</p>}

            <input
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="register-input"
            />
            {errors.email && <p className="register-error">{errors.email}</p>}

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              className="register-input"
            />
            {errors.password && <p className="register-error">{errors.password}</p>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              className="register-input"
            />
            {errors.confirmPassword && (
              <p className="register-error">{errors.confirmPassword}</p>
            )}

            <button className="register-btn" disabled={loading}>
              {loading ? <span className="register-spinner"></span> : "Register"}
            </button>

            <p className="register-switch">
              Already have an account?
              <button
                type="button"
                className="register-link"
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

export default Register;