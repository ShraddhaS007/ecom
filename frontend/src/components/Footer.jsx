import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter Section */}
        <div className="footer-section newsletter">
          <h3 className="footer-heading">Subscribe to our Newsletter</h3>
          <p>Get the latest updates, offers, and deals directly to your inbox.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
        </div>

        {/* Get Support Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Get Support</h3>
          <ul className="footer-links">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/returns">Returns & Refunds</a></li>
            <li><a href="/shipping">Shipping Information</a></li>
          </ul>
        </div>

        {/* Information Section */}
        <div className="footer-section">
          <h3 className="footer-heading">Information</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaYoutube />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 YourWebsite. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
