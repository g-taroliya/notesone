import React from "react";
import "./ClassCard.css";

function ClassCard({ title, onClick }) {
  return (
    <div className="class-card" onClick={onClick}>
      {title}
    </div>
  );
}

export default ClassCard;
