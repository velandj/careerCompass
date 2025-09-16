// src/alerts/Alerts.js
import React, { useState } from "react";
import "./Alerts.css";

const Alerts = ({ onBack }) => {
  const [alerts, setAlerts] = useState([

  {
    id: 1,
    college: "Anna University",
    message: "TNEA counseling for B.E/B.Tech starts on 20th Sept 2025.",
    date: "2025-09-10",
    read: false,
  },
  {
    id: 2,
    college: "Madras Medical College",
    message: "NEET PG counseling schedule released. Reporting starts on 22nd Sept 2025.",
    date: "2025-09-12",
    read: false,
  },
  {
    id: 3,
    college: "Government Law College, Chennai",
    message: "LLB admissions 2025 final merit list will be published on 18th Sept 2025.",
    date: "2025-09-11",
    read: true,
  },
  {
    id: 4,
    college: "Coimbatore Institute of Technology (CIT)",
    message: "Semester exams to begin on 5th Oct 2025. Timetable released.",
    date: "2025-09-14",
    read: false,
  },
  {
    id: 5,
    college: "Tamil Nadu Agricultural University (TNAU)",
    message: "UG counseling for B.Sc Agriculture begins on 25th Sept 2025.",
    date: "2025-09-15",
    read: true,
  },


  ]);

  const [search, setSearch] = useState("");

  // mark an alert as read
  const markAsRead = (id) => {
    setAlerts(
      alerts.map((a) =>
        a.id === id ? { ...a, read: true } : a
      )
    );
  };

  // unread count for badge
  const unreadCount = alerts.filter((a) => !a.read).length;

  // filter & sort alerts
  const filteredAlerts = alerts
    .filter(
      (a) =>
        a.college.toLowerCase().includes(search.toLowerCase()) ||
        a.message.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="alerts-container">
      {/* <button className="back-btn" onClick={onBack}>
        ⬅ Back
      </button> */}

      <div className="alert-header">
        <h2>
          🔔 College Alerts{" "}
          {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
        </h2>
      </div>

      <input
        type="text"
        className="search-bar"
        placeholder="Search by college or keyword..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredAlerts.map((alert) => (
        <div
          key={alert.id}
          className="alert-card"
          style={{ opacity: alert.read ? 0.6 : 1 }}
        >
          <h4>{alert.college}</h4>
          <p>{alert.message}</p>
          <span>📅 {alert.date}</span>
          {!alert.read && (
            <div>
              <button
                className="mark-btn"
                onClick={() => markAsRead(alert.id)}
              >
                Mark as Read
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Alerts;
