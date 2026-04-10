import React, { useEffect } from "react";
import "./DashboardPage.css";

function DashboardPage({ email, onUploadNotes }) {

  // 🔥 REFRESH PROTECTION — If not logged in, redirect to login
  useEffect(() => {
    const savedUser = localStorage.getItem("userEmail");
    if (!savedUser) {
      window.location.href = "/login"; // redirect if logged out
    }
  }, []);

  // Dummy data abhi — baad me backend se connect kar lena
  const uploadedNotes = [];
  const downloadedNotes = [];

  return (
    <div className="dash-wrapper">

      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="dash-sidebar">
        <h2 className="sidebar-title">NotesOne</h2>

        <ul className="sidebar-menu">
          <li className="active">📌 Profile</li>
          <li>📤 Uploaded Notes</li>
          <li>📥 Downloaded Notes</li>
        </ul>

        <button className="upload-btn" onClick={onUploadNotes}>
          ⬆ Upload Notes
        </button>
      </aside>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <main className="dash-main">
        <h2 className="dash-heading">👤 Your Dashboard</h2>

        {/* ---------- USER CARD ---------- */}
        <div className="user-card">
          <h3>Your Profile</h3>
          <p><b>Email:</b> {email}</p>
        </div>

        {/* ---------- UPLOADED NOTES ---------- */}
        <div className="card-section">
          <h3>📤 Your Uploaded Notes</h3>

          {uploadedNotes.length === 0 ? (
            <p className="empty-text">You haven’t uploaded any notes yet.</p>
          ) : (
            <div>
              {uploadedNotes.map((note) => (
                <div key={note.id} className="note-card">
                  <h4>{note.title}</h4>
                  <p>{note.course}</p>
                  <a className="download-link" href="#">
                    📄 Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------- DOWNLOADED NOTES ---------- */}
        <div className="card-section">
          <h3>📥 Your Downloaded Notes</h3>

          {downloadedNotes.length === 0 ? (
            <p className="empty-text">You haven't downloaded any notes yet.</p>
          ) : (
            <div>
              {downloadedNotes.map((note) => (
                <div className="note-card">
                  <h4>{note.title}</h4>
                  <p>{note.course}</p>
                  <a className="download-link" href="#">
                    📄 Download Again
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
