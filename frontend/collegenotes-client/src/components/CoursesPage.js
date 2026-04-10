import React from 'react';
import './CoursesPage.css';

function CoursesPage({ onOpenNotes }) {

  const courses = [
    { label: "B.A.", value: "BA" },
    { label: "B.Com", value: "BCom" },
    { label: "B.Sc", value: "BSc" },
    { label: "B.B.A", value: "BBA" },
    { label: "B.C.A", value: "BCA" },
    { label: "B.Tech", value: "BTech" },
    { label: "B.E.", value: "BE" },
    { label: "B.Ed", value: "BEd" },
    { label: "B.Pharma", value: "BPharma" },
    { label: "LL.B", value: "LLB" },
    { label: "B.H.M", value: "BHM" },
    { label: "B.Lib", value: "BLib" },
    { label: "B.J.M.C", value: "BJMC" },
    { label: "M.A", value: "MA" },
    { label: "M.Sc", value: "MSc" },
    { label: "M.Com", value: "MCom" },
    { label: "M.B.A", value: "MBA" },
    { label: "M.C.A", value: "MCA" },
    { label: "M.Tech", value: "MTech" },
    { label: "M.Ed", value: "MEd" },
    { label: "LL.M", value: "LLM" },
    { label: "M.Lib", value: "MLib" },
    { label: "Ph.D", value: "PhD" },
    { label: "P.G.D.C.A", value: "PGDCA" },
    { label: "D.H.M", value: "DHM" },
    { label: "Diploma in Engineering", value: "DiplomaEng" },
    { label: "D.Pharma", value: "DPharma" },
    { label: "Diploma in Yoga", value: "DiplomaYoga" },
    { label: "Diploma in Agriculture", value: "DiplomaAgri" },
    { label: "Diploma in Fire & Safety", value: "DiplomaFire" },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Browse Courses</h2>

      <div className="course-grid">
        {courses.map((course) => (
          <div
            key={course.value}
            className="course-card"
            onClick={() => {
              console.log("Clicked:", course.value);
              onOpenNotes && onOpenNotes(course.value);
            }}
          >
            {course.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;