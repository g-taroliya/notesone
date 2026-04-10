import React, { useState } from "react";
import Select from "react-select";
import "./NotesUploadPage.css";
import { API_BASE } from "./config.js";

const courseOptions = [
  { label: "B.A.", value: "BA" },
  { label: "B.Com", value: "BCom" },
  { label: "B.Sc", value: "BSc" },
  { label: "B.B.A", value: "BBA" },
  { label: "B.C.A", value: "BCA" },
  { label: "M.C.A", value: "MCA" },
  { label: "M.B.A", value: "MBA" }
];

const NotesUploadPage = ({ email }) => {
  const [course, setCourse] = useState(null);
  const [semester, setSemester] = useState(null);
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const semesterOptions = {
    BCA: 6,
    BTech: 8,
    BSc: 6,
    BBA: 6,
    BA: 6,
    BCom: 6,
    MCA: 4,
    MBA: 4,
  };

  const getSemesterOptions = () => {
    if (!course) return [];
    const semCount = semesterOptions[course.value] || 6;
    return Array.from({ length: semCount }, (_, i) => ({
      label: `Semester ${i + 1}`,
      value: i + 1,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course || !semester || !subject || !file) {
      setError("⚠️ Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", subject);
    formData.append("course", course.value);
    formData.append("email", email);
    formData.append("file", file);
    formData.append("semester", semester.value);

    try {
      const res = await fetch(`${API_BASE}/Notes/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.text();
      alert(data);

      // reset
      setCourse(null);
      setSemester(null);
      setSubject("");
      setFile(null);

    } catch {
      alert("❌ Upload failed!");
    }
  };

  return (
    <div className="upload-container">
      <h2>📘 Upload Notes</h2>

      <form onSubmit={handleSubmit}>
        <label>Course</label>
        <Select options={courseOptions} value={course} onChange={setCourse} />

        <label>Semester</label>
        <Select options={getSemesterOptions()} value={semester} onChange={setSemester} />

        <label>Subject</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} />

        <label>PDF File</label>
        <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />

        {error && <p>{error}</p>}

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default NotesUploadPage;