import React, { useState } from "react";
import SearchSuggestions from "./SearchSuggestions";
import "./HomePage.css";

function HomePage() {

  // ⭐ state
  const [notes, setNotes] = useState([]);

  // ⭐ API function
  const fetchNotes = async (type) => {
    try {
      let url = "";

      if (type === "recommended") {
        url = "http://localhost:5296/api/Notes/recommended";
      } else {
        url = "http://localhost:5296/api/Notes/getnotes";
      }

      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      setNotes(data);

    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-banner">

        <video autoPlay loop muted playsInline className="bg-video">
          <source src="./booksv.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1 className="hero-title">
            The World Of <span>Handwritten Notes</span>
          </h1>

          <p className="hero-desc">
            NotesOne mainly focuses on providing clear and organized college handwritten notes for easy study.
          </p>

          <SearchSuggestions />
        </div>
      </section>

      {/* INFO */}
      <div className="info-row">
        <p>📝 Handwritten Notes</p>
        <p>👨‍🏫 100+ students</p>
        <p>⚡ Easy To Download</p>
      </div>

      {/* WHATSAPP */}
      <button className="whatsapp-btn">
        💬 Join Our Whatsapp Group
      </button>

      {/* CATEGORIES */}
      <h2 className="browse-title">Browse Categories</h2>

      <div className="categories-wrapper">

        <button className="cat-btn" onClick={() => fetchNotes("all")}>
          Most Searched
        </button>

        <button className="cat-btn" onClick={() => fetchNotes("recommended")}>
          Recommended For You
        </button>

        <button className="cat-btn" onClick={() => fetchNotes("all")}>
          Popular This Week
        </button>

        <button className="cat-btn" onClick={() => fetchNotes("all")}>
          Top Study Materials
        </button>

      </div>

      {/* ⭐ DATA SHOW */}
      <div style={{ marginTop: "30px", padding: "20px" }}>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} style={{
              padding: "12px",
              border: "1px solid #ddd",
              marginBottom: "10px",
              borderRadius: "10px",
              background: "#f9f9f9"
            }}>
       <div key={index} style={{
  padding: "15px",
  border: "1px solid #ddd",
  marginBottom: "10px",
  borderRadius: "10px",
  background: "#fff"
}}>
  <h3>{note.title}</h3>
  <p>Category: {note.category}</p>
  <p>Semester: {note.semester}</p>

  <a 
    href={`http://localhost:5296/uploads/${note.filePath}`} 
    target="_blank" 
    rel="noreferrer"
  >
    📥 Download
  </a>
</div>
</div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>
            Click any category to load notes
          </p>
        )}
      </div>

    </div>
  );
}

export default HomePage;