import React, { useState, useEffect } from 'react';

// HEADER
import Header from './components/Header';

// PAGES
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage';
import NotesUploadPage from './components/NotesUploadPage';
import NotesPage from './components/NotesPage';
import CoursesPage from './components/CoursesPage';
import PrivacyPage from './components/PrivacyPage';
import RecommendedNotes from './components/RecommendedNotes';
import AboutUsPage from "./components/AboutUsPage";

// FOOTER
import Footer from './components/Footer';

function App() {
  const [page, setPage] = useState('home');
  const [loggedEmail, setLoggedEmail] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem("userEmail");
    if (savedUser) {
      setLoggedEmail(savedUser);
    }
  }, []);

  const handleLoginSuccess = (email) => {
    localStorage.setItem("userEmail", email);
    setLoggedEmail(email);
    setPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setLoggedEmail('');
    setPage('home');
  };

  const smoothScrollToTop = () => {
    const scrollDuration = 400;
    const scrollStep = -window.scrollY / (scrollDuration / 15);

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  useEffect(() => {
    smoothScrollToTop();
  }, [page]);

  return (
    <div>

      {/* HEADER */}
      <Header
        loggedEmail={loggedEmail}
        setPage={setPage}
        onLogout={handleLogout}
      />

      {/* ROUTES */}

      {page === 'home' && (
        <HomePage
          onLogin={() => setPage('login')}
          onSignup={() => setPage('signup')}
          onOpenNotes={(cls) => setPage({ type: 'notes', class: cls })}
          onMostSearched={() => setPage({ type: 'most' })}   // ✅ NEW
        />
      )}

      {page === 'login' && (
        <LoginPage
          onSwitchToSignup={() => setPage('signup')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {page === 'signup' && (
        <SignupPage onSwitchToLogin={() => setPage('login')} />
      )}

      {page === 'dashboard' && (
        loggedEmail ? (
          <DashboardPage
            email={loggedEmail}
            onUploadNotes={() => setPage('upload')}
          />
        ) : (
          setPage("login")
        )
      )}

      {page === 'upload' && (
        loggedEmail ? (
          <NotesUploadPage email={loggedEmail} onBack={() => setPage('dashboard')} />
        ) : (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <h2 style={{ fontSize: "26px", color: "#0d6efd" }}>
              Please Login First
            </h2>

            <p style={{ marginTop: "10px", fontSize: "16px", color: "#444" }}>
              You must be logged in to upload notes.
            </p>

            <button
              onClick={() => setPage("login")}
              style={{
                padding: "12px 22px",
                background: "#0d6efd",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "17px",
                cursor: "pointer",
                marginTop: "18px",
                fontWeight: "600",
              }}
            >
              Go to Login
            </button>
          </div>
        )
      )}

      {/* ⭐ COURSE NOTES */}
      {typeof page === 'object' && page.type === 'notes' && (
        <NotesPage className={page.class} />
      )}

      {/* ⭐ MOST SEARCHED */}
      {typeof page === 'object' && page.type === 'most' && (
        <NotesPage type="most" />
      )}

      {/* COURSES */}
      {page === 'courses' && (
        <CoursesPage onOpenNotes={(cls) => setPage({ type: 'notes', class: cls })} />
      )}

      {page === 'about' && <AboutUsPage />}
      {page === 'privacy' && <PrivacyPage />}

      <RecommendedNotes />

      {/* FOOTER */}
      <Footer setPage={setPage} />

    </div>
  );
}

export default App;