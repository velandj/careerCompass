// src/CourseToCareer.js
import React, { useState } from 'react';
import './CourseToCareer.css'; // optional: for moving styles

const data = {
  science_bio: {
    MBBS: {
      courses: ["Anatomy", "Physiology", "Biochemistry", "Pathology"],
      skills: ["Empathy", "Critical Thinking", "Medical Knowledge"],
      careers: ["Doctor", "Surgeon", "General Physician"]
    },
    Pharmacy: {
      courses: ["Pharmaceutical Chemistry", "Pharmacology", "Drug Design"],
      skills: ["Attention to Detail", "Chemistry Knowledge", "Lab Skills"],
      careers: ["Pharmacist", "Drug Inspector", "Medical Rep"]
    },
    Nursing: {
      courses: ["Nursing Fundamentals", "Psychiatric Nursing", "Pediatrics"],
      skills: ["Caregiving", "Patience", "Medical Procedures"],
      careers: ["Nurse", "Healthcare Assistant", "Midwife"]
    },
    BDS: {
      courses: ["Dental Anatomy", "Oral Surgery", "Prosthodontics"],
      skills: ["Dexterity", "Patience", "Medical Knowledge"],
      careers: ["Dentist", "Orthodontist", "Dental Surgeon"]
    }
  },
  science_math: {
    Engineering: {
      courses: ["Mechanical", "Civil", "Electrical", "CSE", "ECE"],
      skills: ["Problem Solving", "Math & Physics", "Design Thinking"],
      careers: ["Engineer", "Project Manager", "Site Engineer"]
    },
    Architecture: {
      courses: ["Design Studio", "Construction", "CAD Tools"],
      skills: ["Creativity", "Drawing", "Visualization"],
      careers: ["Architect", "Urban Planner", "Interior Designer"]
    }
  },
  commerce: {
    "B.Com": {
      courses: ["Accounting", "Finance", "Taxation"],
      skills: ["Math", "Finance", "Attention to Detail"],
      careers: ["Accountant", "Auditor", "Tax Consultant"]
    },
    BBA: {
      courses: ["Marketing", "HR", "Operations", "Strategy"],
      skills: ["Leadership", "Communication", "Management"],
      careers: ["Manager", "HR Executive", "Marketing Officer"]
    },
    "CA/CS": {
      courses: ["Corporate Law", "Taxation", "Auditing"],
      skills: ["Focus", "Legal Knowledge", "Ethics"],
      careers: ["Chartered Accountant", "Company Secretary"]
    }
  },
  computer: {
    BCA: {
      courses: ["Programming", "DBMS", "OS", "Web Dev"],
      skills: ["Logic", "Coding", "Problem Solving"],
      careers: ["Software Developer", "Web Developer"]
    },
    "B.Sc IT": {
      courses: ["Networking", "Cloud", "Cybersecurity"],
      skills: ["Technical Thinking", "Security Awareness"],
      careers: ["IT Admin", "Cybersecurity Analyst"]
    },
    "Computer Engineering": {
      courses: ["CSE", "AI/ML", "Data Structures"],
      skills: ["Algorithms", "Math", "Programming"],
      careers: ["AI Engineer", "Backend Developer", "ML Engineer"]
    }
  }
};

function CourseToCareer({ onBack }) {
  const [stream, setStream] = useState('');
  const [field, setField] = useState('');

  const handleStreamChange = (e) => {
    setStream(e.target.value);
    setField('');
  };

  const selectedFieldData = data[stream]?.[field];

  return (
    <div className="dashboard-container">
      <h1>🚀 Course to Career Mapping</h1>

    

      <label>Select Your Stream:</label>
      <select value={stream} onChange={handleStreamChange}>
        <option value="">-- Choose Stream --</option>
        <option value="science_bio">Science (Biology)</option>
        <option value="science_math">Science (Math)</option>
        <option value="commerce">Commerce</option>
        <option value="computer">Computer Science</option>
      </select>

      {stream && (
        <>
          <label>Select Your Field of Interest:</label>
          <select value={field} onChange={(e) => setField(e.target.value)}>
            <option value="">-- Choose Field --</option>
            {Object.keys(data[stream]).map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </>
      )}

      {selectedFieldData && (
        <div id="output" style={{ background: '#fff', color: '#333', padding: '20px', marginTop: '20px' }}>
          <h2>📘 Recommended Courses:</h2>
          <ul>{selectedFieldData.courses.map((c, i) => <li key={i}>{c}</li>)}</ul>
          <h2>🧠 Skills to Develop:</h2>
          <ul>{selectedFieldData.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
          <h2>💼 Career Opportunities:</h2>
          <ul>{selectedFieldData.careers.map((j, i) => <li key={i}>{j}</li>)}</ul>
        </div>
      )}
    </div>
  );
}

export default CourseToCareer;
