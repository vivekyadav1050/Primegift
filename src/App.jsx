import React from "react";

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Otp from "./pages/otp";
import Cardetail from "./pages/Carddetail";
import Myvoucher from "./pages/Myvoucher";
import MyOrders from "./pages/Myorder";
import About from "./pages/Aboutus";
import Contact from "./pages/Contactus";
import Faq from "./pages/Faq";
import Privacy from "./pages/Privacy";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/otp" element={<Otp />} />

      <Route path="/product/:id" element={<Cardetail />} />

      <Route
        path="/my_vouchers"
        element={
          <ProtectedRoute>
            <Myvoucher />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Myorder"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/faq" element={<Faq />} />

      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
}

export default App;