import React from "react";
import "./Button.css";

function Button({ 
  className = "", 
  variant = "default", 
  size = "default", 
  children, 
  ...props 
}) {
  const variantClass = {
    default: "btn-default",
    destructive: "btn-destructive",
    outline: "btn-outline",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    link: "btn-link",
  }[variant] || "btn-default";

  const sizeClass = {
    default: "btn-md",
    sm: "btn-sm",
    lg: "btn-lg",
    icon: "btn-icon",
  }[size] || "btn-md";

  return (
    <button
      className={`btn ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };
