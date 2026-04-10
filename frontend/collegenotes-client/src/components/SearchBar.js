import React from "react";
import "./SearchBar.css";

function SearchBar() {
  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Search notes, subjects, courses…"
        className="search-input"
      />
      <button className="search-btn">🔍</button>
    </div>
  );
}

export default SearchBar;
