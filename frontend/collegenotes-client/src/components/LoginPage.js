import React, { useState } from "react";
import "./LoginPage.css";
import { API_BASE } from "./../components/config";

function LoginPage({ onSwitchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validateForm = () => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required!";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email!";
    }

    if (!password) {
      newErrors.password = "Password is required!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(
        `${API_BASE}/Auth/login?email=${email}&password=${password}`,
        { method: "POST" }
      );

      const text = await response.text();
      setMessage(text);

      // ✔ Save user only when login is successful
      if (response.ok && text.toLowerCase().includes("success")) {
        localStorage.setItem("userEmail", email);
        onLoginSuccess(email);
      }

    } catch (error) {
      setMessage("❌ Failed to connect to backend");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <div className="login-card">

        {/* EMAIL FIELD */}
        <label className="field-label">
          Email Address <span className="req">*</span>
        </label>
        <input
          className={`login-input ${errors.email ? "input-error" : ""}`}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        {/* PASSWORD FIELD */}
        <label className="field-label">
          Password <span className="req">*</span>
        </label>
        <input
          className={`login-input ${errors.password ? "input-error" : ""}`}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        {message && <p className="response-msg">{message}</p>}

        <p className="bottom-text">
          Don’t have an account?{" "}
          <button className="signup-link" onClick={onSwitchToSignup}>
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
