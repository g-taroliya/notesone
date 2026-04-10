import React, { useEffect, useState } from "react";
import "./RecommendedNotes.css";

// ⭐ ADDED — Connect backend
import { API_BASE } from "./../components/config";

function RecommendedNotes() {
  const [notes, setNotes] = useState([]);

  // ⭐ Static fake data (backup)
  const allNotes = [
    { title: "BCA – DBMS Handwritten Notes", category: "BCA", semester: "3rd Sem" },
    { title: "B.Tech – Engineering Mathematics", category: "B.Tech", semester: "1st Sem" },
    { title: "B.Sc – Physics Chapter 1", category: "B.Sc", semester: "2nd Sem" },
    { title: "B.Com – Accounting Notes", category: "B.Com", semester: "1st Sem" },
    { title: "MBBS – Anatomy Notes", category: "MBBS", semester: "1st Year" },
    { title: "MCA – Java Programming", category: "MCA", semester: "2nd Sem" },
    { title: "BDS – Dental Anatomy Notes", category: "BDS", semester: "1st Year" },
    { title: "B.Tech – Data Structures", category: "B.Tech", semester: "3rd Sem" },
    { title: "BCA – Operating System Notes", category: "BCA", semester: "2nd Sem" },
    { title: "MBBS – Physiology Notes", category: "MBBS", semester: "2nd Year" },
    { title: "B.Com – Business Law Notes", category: "B.Com", semester: "2nd Sem" },
    { title: "MCA – Computer Networks", category: "MCA", semester: "3rd Sem" }
  ];

  useEffect(() => {

    // ⭐ BACKEND CALL
    fetch(`${API_BASE}/Notes/recommended`)
      .then((res) => {
        if (!res.ok) throw new Error("Backend error");
        return res.json();
      })
      .then((data) => {
        if (data.length > 0) {
          // ⭐ If backend sending recommended notes
          setNotes(data);
        } else {
          // ⭐ Backend empty → use static data
          const shuffled = [...allNotes].sort(() => 0.5 - Math.random());
          setNotes(shuffled.slice(0, 12));
        }
      })
      .catch(() => {
        // ⭐ Backend fail → use static recommended notes
        const shuffled = [...allNotes].sort(() => 0.5 - Math.random());
        setNotes(shuffled.slice(0, 12));
      });

    // ⭐ WARNING FIX — ESLINT ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <- recommended: only run once

  return (
    <section className="recommended-section">
      <h2 className="section-title">📚 Recommended Notes</h2>

      <div className="notes-grid">
        {notes.map((note, index) => (
          <div key={index} className="note-card">
            <h4>{note.title}</h4>

            {/* Category */}
            <p className="note-category">{note.category}</p>

            {/* Semester */}
            <p className="note-sem">{note.semester}</p>

            <button className="view-btn">View Notes</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecommendedNotes;
