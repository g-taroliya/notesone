import React, { useState } from "react";
import "./SearchSuggestions.css";

function SearchSuggestions() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const allData = [
    "BCA Notes",
    "B.Tech Notes",
    "DBMS Notes",
    "Maths Notes",
    "Physics Notes",
    "MBBS Anatomy",
    "B.Com Accounting",
    "Operating System",
    "C Programming",
    "Java Programming",
    "B.Sc Chemistry",
    "BBA Management"
  ];

  const handleChange = (e) => {
    const text = e.target.value;
    setQuery(text);

    if (text.length > 0) {
      const results = allData.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  };

  return (
    <div className="search-wrapper">

      <input
        type="text"
        className="search-input"
        placeholder="Search notes, subjects, courses…"
        value={query}
        onChange={handleChange}
      />

      {filtered.length > 0 && (
        <div className="suggest-box">
          {filtered.map((item, i) => (
            <div key={i} className="suggest-item">
              🔍 {item}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default SearchSuggestions;
