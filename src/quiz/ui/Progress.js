import React from "react";
import "./Progress.css";

function Progress({ value = 0, className = "", ...props }) {
  return (
    <div className={`progress-root ${className}`} {...props}>
      <div
        className="progress-indicator"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export { Progress };
