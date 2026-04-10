import React from "react";
import "./Footer.css";

function Footer({ setPage }) {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT SECTION */}
        <div className="footer-left fade-up">
          <img 
            src="./logot.png" 
            alt="Notes One Logo" 
            className="footer-logo-img"
          />
          <p>Your trusted platform for Handwritten Notes & Study Material.</p>
        </div>

        {/* CENTER SECTION */}
        <div className="footer-center fade-up">
          <a onClick={() => setPage("home")}>Home</a>
          <a onClick={() => setPage("courses")}>Courses</a>
          <a onClick={() => setPage("about")}>About Us</a>
          <a onClick={() => setPage("privacy")}>Privacy Policy</a>
          <a onClick={() => setPage("dashboard")}>Dashboard</a>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-right fade-up">
          <h3>Follow Us</h3>
          <a href="#">📘 Facebook</a>
          <a href="#">📸 Instagram</a>
          <a href="#">▶️ YouTube</a>
          <a href="#">💬 WhatsApp</a>
        </div>

      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Notes One — All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
