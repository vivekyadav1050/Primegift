import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

         <Route path="/register" element={<Register />} />
          <Route path="/otp" element={<Otp/>} />

          <Route path="/product/:id" element={<Cardetail/>} />
          <Route path="/my_vouchers" element={<Myvoucher />} />   
          <Route path="/Myorder" element={<MyOrders />} />   
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* <Route path="/terms" element={<div>Terms of Use Page</div>} />
          <Route path="/loyalty" element={<div>Loyalty Program Page</div>} />
          <Route path="/sitemap" element={<div>Site Map Page</div>} />
          <Route path="/offers" element={<div>Offer Terms Page</div>} /> */}



             
      </Routes>
    </Router>
  );
}

export default App;