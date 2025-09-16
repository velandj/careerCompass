// src/timelinetracker/TimelineTracker.js
import React, { useState } from "react";
// import "./TimelineTracker.css";

const TimelineTracker = ({ onBack }) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Anna University Counseling",
      date: "2025-09-20",
      college: "Anna University",
    },
    {
      id: 2,
      title: "PSG Tech Admission Opens",
      date: "2025-09-25",
      college: "PSG College of Technology",
    },
  ]);

  return (
    <div className="timeline-container">
      <button className="back-btn" onClick={onBack}>⬅ Back</button>
      <h2>⏱ Timeline Tracker</h2>

      <ul className="timeline-list">
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> <br />
            📅 {event.date} <br />
            🏫 {event.college}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineTracker;
