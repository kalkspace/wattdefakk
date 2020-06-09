import React from "react";
import "./canvas.scss";

const Canvas = () => {
  return (
    <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="2" height="10" x="30" y="200" />
      <rect width="2" height="10" x="35" y="200" />
      <rect width="2" height="10" x="40" y="200" />
      <rect width="2" height="10" x="45" y="200" />
      <rect width="2" height="10" x="50" y="200" />

      <rect width="2" height="20" x="55" y="200" />
      <rect width="2" height="20" x="60" y="200" />
      <rect width="2" height="20" x="65" y="200" />
      <circle cx="75" cy="200" r="6" fill="orange" />
      <circle cx="90" cy="200" r="6" fill="orange" />
    </svg>
  );
};

export default Canvas;
