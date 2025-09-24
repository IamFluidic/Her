import React from "react";
import "./FloatingSky.css"; // Reuse modal styles from the same CSS

function NoteModal({ title, text, onClose }) {
  return (
    <div className="note-modal-backdrop" onClick={onClose}>
      <div
        className="note-modal"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button className="note-close" onClick={onClose} aria-label="Close note">
          &times;
        </button>
        <h3>{title}</h3>
        <p>{text}</p>
        <button className="note-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default NoteModal;
