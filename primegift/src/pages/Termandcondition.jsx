import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import termsContent from "../content/Terms";

import "../styles/privacy.css";

function Terms() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("terms");

  return (
    <div className="app-layout privacy-page">

      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="main-container">

        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        <div className="content-area">

          <h2 className="page-title">📜 Terms & Conditions</h2>

          <div className="privacy-box">
            {termsContent.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Terms;