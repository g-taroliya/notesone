import React from "react";
import "./Header.css";

function Header({ loggedEmail, setPage, onLogout }) {
  const isLoggedIn = loggedEmail !== "";

  return (
    <nav className="header-nav">

      {/* LEFT LOGO */}
      <div className="header-logo" onClick={() => setPage("home")}>
        <img src="./logot.png" alt="" className="logo-img" />
      </div>

      {/* CENTER NAV LINKS */}
      <div className="header-links">
        <a onClick={() => setPage("home")}>Home</a>
        <a onClick={() => setPage("courses")}>Courses</a>
        <a onClick={() => setPage("about")}>About Us</a>
        <a onClick={() => setPage("privacy")}>Privacy Policy</a>
          <a onClick={() => setPage("upload")} className="upload-link">
            Upload Notes
          </a>
        

        <a onClick={() => setPage("dashboard")}>Dashboard</a>
      </div>

      {/* RIGHT AUTH SECTION */}
      <div className="header-auth">
        {!isLoggedIn ? (
          <>
            <button className="auth-btn login" onClick={() => setPage("login")}>
              Login
            </button>
            <button className="auth-btn signup" onClick={() => setPage("signup")}>
              Signup
            </button>
          </>
        ) : (
          <>
            <span className="user-email">{loggedEmail}</span>

            <button className="auth-btn dashboard" onClick={() => setPage("dashboard")}>
              Dashboard
            </button>

            <button className="auth-btn logout" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>

    </nav>
  );
}

export default Header;
