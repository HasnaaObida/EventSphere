import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-section">
          <h3 className="footer-title">EventSphere</h3>
          <p className="footer-text">
            © 2024 EventSphere. Tous droits réservés.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <p className="footer-heading">Navigation</p>
          <ul className="footer-list">
            <li>Accueil</li>
            <li>Événements</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <p className="footer-heading">Contact</p>
          <ul className="footer-list">
            <li>Rabat, Maroc</li>
            <li>+212 6 23 45 67 89</li>
            <li>contact@eventsphere.ma</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
