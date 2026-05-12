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
import Terms from "./pages/Termandcondition";
import RefundPolicy from "./pages/Refundpolicy";

import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/Forgetpassword";
import ResetPassword from "./pages/Resetpassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/otp" element={<Otp/>} />

      <Route path="/reset-password" element={<ResetPassword />} />

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
      
      <Route path="/terms" element={<Terms />} />
      <Route path="/refund" element={<RefundPolicy/>} />

    </Routes>
  );
}

export default App;