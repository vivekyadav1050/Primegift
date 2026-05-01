import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import axios from "axios";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Login");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email required";
    if (!formData.password) newErrors.password = "Password required";
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
    const res = await axios.post("http://localhost:3000/api/auth/login", {
      email: formData.email,
      password: formData.password
    });

    // ✅ Save token + user
    localStorage.setItem("token", res.data.token);
    console.log("token save")
    localStorage.setItem("user", JSON.stringify({ name: res.data.name }));

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
        <div className="login-overlay" onClick={() => setIsOpen(false)} />
      )}

      <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="login-hero-section">
        <div className="login-hero-content">
          <h1 className="login-hero-title">Welcome Back!</h1>
        </div>
      </div>

      <div className="login-container">
        <div className="login-card">

          <form onSubmit={handleSubmit} className="login-form">

            <input
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="login-input"
            />
            {errors.email && <p className="login-error">{errors.email}</p>}

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              className="login-input"
            />
            {errors.password && <p className="login-error">{errors.password}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
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