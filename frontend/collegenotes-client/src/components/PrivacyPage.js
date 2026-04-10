import React from 'react';

// Is page ke liye alag se CSS ki zaroorat nahi,
// ye .page-container (CoursesPage.css se)
// aur .policy-container use karega.
import "./PrivacyPage1.css";

function PrivacyPage() {
  return (
    <div className="page-container policy-container">
      <h2 className="page-title">Privacy Policy</h2>
      
      <p className="policy-text">
        Your privacy is important to us. This Privacy Policy outlines how
        Notes One collects, uses, and protects your information when you use
        our website.
      </p>

      <h3>Information We Collect</h3>
      <p className="policy-text">
        We may collect personal information such as your name, email address,
        and mobile number when you register for an account. We also collect
        any notes or files you choose to upload.
      </p>

      <h3>How We Use Your Information</h3>
      <p className="policy-text">
        Your information is used to provide and improve our services,
        personalize your experience, and communicate with you. We will never
        sell your personal information to third parties.
      </p>
    </div>
  );
}

export default PrivacyPage;
