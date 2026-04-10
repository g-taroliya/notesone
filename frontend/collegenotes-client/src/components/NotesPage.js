import React, { useEffect, useState } from "react";
import "./NotesPage.css";

function NotesPage({ className }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("course");

  useEffect(() => {
    setLoading(true);

    let url = "";

    if (filter === "most") {
      url = "http://localhost:5296/api/Notes/most-searched";
    } else if (filter === "popular") {
      url = "http://localhost:5296/api/Notes/popular";
    } else {
      url = `http://localhost:5296/api/Notes/getnotes?course=${className}`;
    }
   

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

  }, [className, filter]);

  return (
    <div className="notes-container">

      <h1 className="title">Browse Categories</h1>

      {/* 🔘 Buttons */}
      <div className="category-buttons">
        <button onClick={() => setFilter("most")}>Most Searched</button>
        <button onClick={() => setFilter("course")}>Recommended For You</button>
        <button onClick={() => setFilter("popular")}>Popular This Week</button>
        <button>Top Study Materials</button>
      </div>

      {loading && <p>Loading notes...</p>}
      {!loading && notes.length === 0 && <p>No notes found.</p>}

      {/* 📦 NOTES */}
      <div className="notes-list">
        {notes.map(note => (
          <div className="note-card" key={note.id}>
            
            <div className="note-info">
              <h3>{note.title}</h3>
              <p>Category: {note.course}</p>
              <p>Semester: {note.semester || "N/A"}</p>
            </div>

            <div className="note-actions">
              <a
                href={`http://localhost:5296/Uploads/${note.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-btn"
              >
                View
              </a>

              <a
                href={`http://localhost:5296/Uploads/${note.filePath}`}
                download
                className="download-btn"
              >
                Download
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default NotesPage;