import React from "react";
import "./AboutUsPage.css";

function AboutUsPage() {
  return (
    <div className="about-container">
      <h2 className="about-title">About Us</h2>

      <div className="about-card">
        <p className="about-text">
          Welcome to <span className="brand-name">NotesHub</span> — your smart
          learning partner.  
          Our mission is to provide high-quality handwritten notes, study
          materials, and course-wise content for students in the simplest way.
        </p>

        <p className="about-text">
          We aim to make education easy, accessible, and beautifully organized
          for every student. From BCA, B.Tech, B.Com to medical & school notes —
          everything is available at one place.
        </p>

        <p className="about-text">
          Our team is constantly working to provide clean, well-structured, and
          updated content so you never struggle to find the right notes again.
        </p>

        <h3 className="about-subtitle">Why Choose Us?</h3>
        <ul className="about-list">
          <li>✔ Easy & clean user interface</li>
          <li>✔ Handwritten & high-quality study materials</li>
          <li>✔ Course-wise and subject-wise notes</li>
          <li>✔ Fast loading and user-friendly design</li>
        </ul>

        <p className="about-footer">
          Thank you for choosing <span className="brand-name">NotesHub</span>.
          Keep learning, keep growing! 🚀
        </p>
      </div>
    </div>
  );
}

export default AboutUsPage;
