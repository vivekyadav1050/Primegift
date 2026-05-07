import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "../styles/Register.css";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Register");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const err = {};

    if (!formData.name.trim()) {
      err.name = "Name required";
    }

    if (!formData.email.trim()) {
      err.email = "Email required";
    }

    if (!formData.mobile.trim()) {
      err.mobile = "Mobile number required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      err.mobile = "Invalid mobile number";
    }

   if (!formData.password) {

  err.password = "Password required";

} else if (
  !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(formData.password)
) {

  err.password =
    "Password must be 6+ characters with letters and numbers";
}


    if (!formData.confirmPassword) {
      err.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
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
      setErrors({});

      const res = await API.post("/api/auth/register", {
      name: formData.name,
      email: formData.email,
      phone: formData.mobile,
      password: formData.password
    });

      console.log(res.data);

          navigate("/otp", {
        state: {
          phone: formData.mobile,
          sessionId: res.data.sessionId
        }
      });
      

    } catch (error) {
      console.log(error);

      setErrors({
        api:
          error.response?.data?.message || "Registration failed"
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

      {isOpen && (
        <div
          className="overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* HERO SECTION */}
      <div className="register-hero-section">
        <div className="register-hero-content">
          <h1 className="register-hero-title">
            Create Account
          </h1>
        </div>
      </div>

      <div className="register-container">
        <div className="register-card">

          <h2 className="register-title">
            Create Account
          </h2>

          {errors.api && (
            <p className="register-error">
              {errors.api}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="register-form"
          >

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="register-input"
            />

            {errors.name && (
              <p className="register-error">
                {errors.name}
              </p>
            )}

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="register-input"
            />

            {errors.email && (
              <p className="register-error">
                {errors.email}
              </p>
            )}

            {/* MOBILE */}
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
              className="register-input"
              maxLength={10}
            />

            {errors.mobile && (
              <p className="register-error">
                {errors.mobile}
              </p>
            )}

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="register-input"
            />

            {errors.password && (
              <p className="register-error">
                {errors.password}
              </p>
            )}

            {/* CONFIRM PASSWORD */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="register-input"
            />

            {errors.confirmPassword && (
              <p className="register-error">
                {errors.confirmPassword}
              </p>
            )}

            {/* BUTTON */}
            <button
              className="register-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="register-spinner"></span>
              ) : (
                "Register"
              )}
            </button>

            {/* LOGIN */}
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