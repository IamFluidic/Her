import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function LoveNote({ onClose }) {
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const modalRef = useRef(null);
  const textareaRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    // Save and restore focus
    previouslyFocused.current = document.activeElement;
    // Prevent background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus textarea when modal opens
    requestAnimationFrame(() => {
      if (textareaRef.current) textareaRef.current.focus();
      else if (modalRef.current) modalRef.current.focus();
    });

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
      // Simple focus-trap: keep focus inside modal on Tab
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'a[href], area[href], input:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = prevOverflow; // restore
      // restore focus
      try {
        previouslyFocused.current?.focus?.();
      } catch (err) {
        /* ignore */
      }
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note) return;

    const serviceID = "service_8pob7al";
    const templateID = "template_raboksn";
    const publicKey = "SKgsi9_T6mE5_kk4H";

    // emailjs.send(serviceID, templateID, { ... }, publicKey) is okay,
    // but you can also call emailjs.sendForm / init if you prefer.
    emailjs
      .send(
        serviceID,
        templateID,
        {
          message: note,
          to_email: "abhisheek133@gmail.com",
        },
        publicKey
      )
      .then(
        () => {
          setSubmitted(true);
        },
        (err) => {
          alert("Failed to send email: " + (err?.text || err));
        }
      );
  };

  return (
    <div
      className="dialog-overlay"
      onClick={onClose}
      aria-hidden={false}
    >
      <div
        ref={modalRef}
        className="dialog-content love-note-container fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="loveNoteTitle"
        onClick={(e) => e.stopPropagation()} // prevent overlay click from closing when clicking inside
        tabIndex={-1} // allow programmatic focus
      >
        <button
          onClick={onClose}
          className="close-btn"
          aria-label="Close"
          title="Close"
        >
          ×
        </button>

        <h2 id="loveNoteTitle">💌 Write Your Love Note 💌</h2>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              rows={5}
              cols={40}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your love note here..."
              required
            />
            <br />
            <button type="submit">Send Note</button>
          </form>
        ) : (
          <div>
            <h3>Your Love Note:</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{note}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoveNote;