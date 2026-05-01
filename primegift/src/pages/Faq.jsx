import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import faqData from "../content/faq";
import "../styles/faq.css";

function Faq() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("faq");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-app-layout">

      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="faq-main-container">

        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        <div className="faq-content-area">

          <div className="faq-hero-section">
            <div className="faq-hero-content">
              <div className="faq-badge">Got Questions?</div>
              <h1 className="faq-hero-title">
              <span className="gradient-text">FAQs</span>
              </h1>
              <p className="faq-hero-subtitle">
                Find answers to common questions about PrimeGift vouchers and services
              </p>
            </div>
          </div>

          <div className="faq-container">
            <div className="faq-card">
              {faqData.map((item, index) => (
                <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`}>
                  
                  <div
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="question-content">
                      <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="question-text">{item.question}</span>
                    </div>
                    <span className={`question-icon ${openIndex === index ? 'rotated' : ''}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </div>

                  {openIndex === index && (
                    <div className="faq-answer">
                      <div className="answer-content">
                        <div className="answer-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4M12 8h.01"></path>
                          </svg>
                        </div>
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>

            {/* Still Have Questions Section */}
            <div className="faq-contact-section">
              <div className="contact-card">
                <div className="contact-icon">💬</div>
                <h3>Still have questions?</h3>
                <p>Can't find the answer you're looking for? Please contact our support team.</p>
                <button className="contact-support-btn" onClick={() => window.location.href = '/contact'}>
                  Contact Support →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Faq;