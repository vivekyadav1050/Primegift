import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import contactContent from "../content/contactus";
import "../styles/Contactus.css";

function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // d
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission - replace with actual API call
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="contact-app-layout">

      {/* Navbar */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="contact-main-container">

        {/* Sidebar */}
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        {/* Content */}
        <div className="contact-content-area">

          <div className="contact-hero-section">
            <div className="contact-hero-content">
              <div className="contact-badge">Get in Touch</div>
              <h1 className="contact-hero-title">
                Contact <span className="gradient-text">Us</span>
              </h1>
              <p className="contact-hero-subtitle">
                We're here to help and answer any questions you might have
              </p>
            </div>
          </div>

          <div className="contact-container">
            <div className="contact-grid">
              {/* Left Side - Contact Info */}
              <div className="contact-info-card">
                <h3 className="contact-info-title">Let's Talk</h3>
                <p className="contact-info-description">
                  Have questions about our gift cards or need assistance? 
                  Our support team is ready to help you.
                </p>

                <div className="contact-details">
                  <div className="contact-detail-item">
                    <div className="contact-icon">📍</div>
                    <div>
                      <h4>Visit Us</h4>
                      <p>Behind thana Puramufti Prayagraj,<br />Prayagraj, Utter Pradesh 212208</p>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="contact-icon">📧</div>
                    <div>
                      <h4>Email Us</h4>
                      <p>vivekdrivelpu@gmail.com<br /></p>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="contact-icon">📞</div>
                    <div>
                      <h4>Call Us</h4>
                      <p>+91 9335960949<br />Mon-Sat, 9AM - 7PM</p>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="contact-icon">💬</div>
                    <div>
                      <h4>Live Chat</h4>
                      <p>Available 24/7 for premium members</p>
                    </div>
                  </div>
                </div>

                {/* Contact Content from props */}
                <div className="contact-content-box">
                  {contactContent.split("\n\n").map((para, i) => (
                    <p key={i} className="contact-text">{para}</p>
                  ))}
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="contact-form-card">
                <h3 className="form-title">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      rows="5"
                      required
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      "Send Message →"
                    )}
                  </button>

                  {submitStatus === "success" && (
                    <div className="success-message">
                      ✓ Message sent successfully! We'll get back to you soon.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default Contact;