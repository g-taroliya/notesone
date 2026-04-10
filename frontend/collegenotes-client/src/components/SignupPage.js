import React, { useState } from "react";
import "./SignupPage.css";

function SignupPage({ onSwitchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    countryCode: "+91",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // ⭐ VALIDATION FUNCTION
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email";

    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(form.mobile))
      newErrors.mobile = "Enter valid 10-digit mobile number";

    if (!form.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ⭐ SIGNUP
  const handleSignup = async () => {
    if (!validate()) return;

    try {
      const params = new URLSearchParams({
        name: form.name,
        email: form.email,
        password: form.password,
        mobile: form.countryCode + form.mobile,
      });

      const response = await fetch(
        `http://localhost:5296/api/Auth/signup?${params.toString()}`,
        { method: "POST" }
      );

      const text = await response.text();
      setMessage(text);

      // Redirect to login
      if (text.toLowerCase().includes("success")) {
        setTimeout(() => {
          onSwitchToLogin();
        }, 800);
      }
    } catch (error) {
      setMessage("❌ Failed to connect to backend");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>

      <div className="signup-card">

        {/* NAME */}
        <label className="field-label">
          Full Name <span className="req">*</span>
        </label>
        <input
          className={`signup-input ${errors.name ? "input-error" : ""}`}
          placeholder="Enter your full name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        {/* EMAIL */}
        <label className="field-label">
          Email Address <span className="req">*</span>
        </label>
        <input
          className={`signup-input ${errors.email ? "input-error" : ""}`}
          placeholder="Enter email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        {/* MOBILE */}
        <label className="field-label">
          Mobile Number <span className="req">*</span>
        </label>

        <div className="mobile-box">
          <select
            className="country-code"
            value={form.countryCode}
            onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+61">+61</option>
          </select>

          <input
            className={`signup-input mobile-input ${
              errors.mobile ? "input-error" : ""
            }`}
            placeholder="10-digit number"
            maxLength="10"
            value={form.mobile}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, "");
              setForm({ ...form, mobile: onlyNums });
            }}
          />
        </div>

        {errors.mobile && <p className="error-text">{errors.mobile}</p>}

        {/* PASSWORD */}
        <label className="field-label">
          Password <span className="req">*</span>
        </label>
        <input
          type="password"
          className={`signup-input ${errors.password ? "input-error" : ""}`}
          placeholder="Create a password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <button className="signup-btn" onClick={handleSignup}>
          Create Account
        </button>

        {message && <p className="response-msg">{message}</p>}

        <p className="bottom-text">
          Already have an account?{" "}
          <button className="login-link" onClick={onSwitchToLogin}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
