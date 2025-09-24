// import React, { useMemo, useState, useEffect } from "react";
// import NoteModal from "./NoteModal";
// import "./FloatingSky.css";

// const NUM_STARS = 10;

// // small SVG icons used for stars and moon
// function StarIcon({ size = 28 }) {
//   return (
//     <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
//       <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.17L12 18.896 4.664 23.168l1.402-8.17L.132 9.21l8.2-1.192z"/>
//     </svg>
//   );
// }

// function MoonIcon({ size = 42 }) {
//   return (
//     <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
//       <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
//     </svg>
//   );
// }

// function FloatingSky({ notes = null }) {
//   const defaultNotes = useMemo(() => [
//     "I love you more than words can hold. 💖",
//     "Thank you for always being there. 🌟",
//     "You make my days brighter. ☀️",
//     "Forever grateful for you. 🙏",
//     "You're my favorite hello and hardest goodbye. 😘",
//     "Your smile is my favorite song. 🎵",
//     "We make the best memories together. 🥰",
//     "Thank you for believing in me. 💪",
//     "Every moment with you is magic. ✨",
//     "I love how you laugh — it's everything. 😂",
//     "A little moonlight thank you — you mean so much."
//   ], []);

//   const items = useMemo(() => {
//     const source = Array.isArray(notes) && notes.length >= NUM_STARS + 1 ? notes : defaultNotes;
//     return [
//       ...Array.from({ length: NUM_STARS }, (_, i) => ({
//         id: `star-${i}`,
//         type: "star",
//         text: source[i % source.length],
//       })),
//       { id: "moon-0", type: "moon", text: source[NUM_STARS % source.length] },
//     ];
//   }, [notes, defaultNotes]);

//   const [activeNote, setActiveNote] = useState(null);
//   const [positions, setPositions] = useState({});
  
//   // Stable animations array
//   const animations = useMemo(() => ["floatY-1","floatY-2","floatY-3","floatY-4"], []);

//   // generate random positions and animation per item
//   useEffect(() => {
//     const arr = {};
//     items.forEach((it, i) => {
//       const left = Math.round(Math.random() * 90);        // 0% - 90%
//       const top = Math.round(4 + Math.random() * 45);     // 4% - 49%
//       const duration = (6 + Math.random() * 8).toFixed(1); // 6s - 14s
//       const delay = (Math.random() * 4).toFixed(2);
//       const animationName = animations[i % animations.length];
//       arr[it.id] = { left, top, duration, delay, animationName };
//     });
//     setPositions(arr);
//   }, [items, animations]);

//   return (
//     <>
//       <div className="floating-sky" aria-hidden={false}>
//         {items.map((it) => {
//           const pos = positions[it.id];
//           if (!pos) return null;
//           const className = `floating-item ${it.type}`;
//           return (
//             <button
//               key={it.id}
//               className={className}
//               style={{
//                 left: `${pos.left}%`,
//                 top: `${pos.top}%`,
//                 animationDuration: `${pos.duration}s`,
//                 animationDelay: `${pos.delay}s`,
//                 animationName: pos.animationName,
//               }}
//               onClick={() => setActiveNote(it)}
//               title={it.type === "moon" ? "Moon — open note" : "Star — open note"}
//               aria-label={it.type === "moon" ? "Open moon note" : `Open star note ${it.id}`}
//             >
//               {it.type === "moon" ? <MoonIcon /> : <StarIcon />}
//             </button>
//           );
//         })}
//       </div>

//       {activeNote && (
//         <NoteModal
//           title={activeNote.type === "moon" ? "A Moon Note" : "A Star Note"}
//           text={activeNote.text}
//           onClose={() => setActiveNote(null)}
//         />
//       )}
//     </>
//   );
// }

// export default FloatingSky;

import React, { useState, useEffect, useMemo } from "react";
import NoteModal from "./NoteModal";
import "./FloatingSky.css";

const NUM_INTERACTABLE_STARS = 20;

// --- SVG Icons ---
function StarIcon({ size = 5 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.17L12 18.896 4.664 23.168l1.402-8.17L.132 9.21l8.2-1.192z"/>
    </svg>
  );
}

function MoonIcon({ size = 12 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  );
}

// --- FloatingSky Component ---
function FloatingSky({
  notes = null,
  numBackgroundStars = 450,
  maxStarRadius = 1.5,
  twinkleSpeed = 0.009,
  cometFrequency = 0.007
}) {
  const defaultNotes = useMemo(() => [
    "I love you more than words can hold. 💖",
    "Thank you for always being there. 🌟",
    "You make my days brighter. ☀️",
    "Forever grateful for you. 🙏",
    "You're my favorite hello and hardest goodbye. 😘",
    "Your smile is my favorite song. 🎵",
    "We make the best memories together. 🥰",
    "Thank you for believing in me. 💪",
    "Every moment with you is magic. ✨",
    "I love how you laugh — it's everything. 😂",
    "A little moonlight thank you — you mean so much."
  ], []);

  // --- Interactable stars & moon ---
  const items = useMemo(() => {
    const source = Array.isArray(notes) && notes.length >= NUM_INTERACTABLE_STARS + 1 ? notes : defaultNotes;
    return [
      ...Array.from({ length: NUM_INTERACTABLE_STARS }, (_, i) => ({
        id: `star-${i}`,
        type: "star",
        text: source[i % source.length],
      })),
      { id: "moon-0", type: "moon", text: source[NUM_INTERACTABLE_STARS % source.length] },
    ];
  }, [notes, defaultNotes]);

  const [activeNote, setActiveNote] = useState(null);
  const [positions, setPositions] = useState({});
  const animations = useMemo(() => ["floatY-1", "floatY-2", "floatY-3", "floatY-4"], []);

  // --- Random positions & floating animation for interactable stars ---
  useEffect(() => {
    const arr = {};
    items.forEach((it, i) => {
      const left = Math.round(Math.random() * 90);        
      const top = Math.round(4 + Math.random() * 45);     
      const duration = (6 + Math.random() * 8).toFixed(1);
      const delay = (Math.random() * 4).toFixed(2);
      const animationName = animations[i % animations.length];
      arr[it.id] = { left, top, duration, delay, animationName };
    });
    setPositions(arr);
  }, [items, animations]);

  // --- Starfield Background + Comets (diagonal motion) ---
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.className = "starfield-canvas";
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars = Array.from({ length: numBackgroundStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * maxStarRadius,
      alpha: Math.random(),
      alphaChange: twinkleSpeed + Math.random() * twinkleSpeed,
      speedX: 0.01 + Math.random() * 0.05, // diagonal x speed
      speedY: 0.01 + Math.random() * 0.05, // diagonal y speed
    }));

    let comets = [];

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // --- draw stars ---
      stars.forEach(s => {
        s.alpha += s.alphaChange;
        if (s.alpha <= 0 || s.alpha >= 1) s.alphaChange *= -1;

        s.x += s.speedX;
        s.y -= s.speedY;

        if (s.y < 0) s.y = height;
        if (s.x > width) s.x = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });

      // --- maybe spawn comet ---
      if (Math.random() < cometFrequency) {
        comets.push({
          x: Math.random() * width,
          y: Math.random() * height / 2,
          length: 100 + Math.random() * 150,
          speedX: 2 + Math.random() * 2,
          speedY: 1 + Math.random(),
          alpha: 1,
        });
      }

      // --- draw comets ---
      comets.forEach((c, idx) => {
        c.x += c.speedX;
        c.y -= c.speedY; // diagonal up-left
        c.alpha -= 0.005;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.length, c.y + c.length / 2);
        ctx.strokeStyle = `rgba(255,255,255,${c.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        if (c.alpha <= 0) comets.splice(idx, 1);
      });

      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(canvas);
    };
  }, [numBackgroundStars, maxStarRadius, twinkleSpeed, cometFrequency]);

  return (
    <>
      <div className="floating-sky" aria-hidden={false}>
        {items.map(it => {
          const pos = positions[it.id];
          if (!pos) return null;
          const className = `floating-item ${it.type}`;
          return (
            <button
              key={it.id}
              className={className}
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDuration: `${pos.duration}s`,
                animationDelay: `${pos.delay}s`,
                animationName: pos.animationName,
              }}
              onClick={() => setActiveNote(it)}
              title={it.type === "moon" ? "Moon — open note" : "Star — open note"}
              aria-label={it.type === "moon" ? "Open moon note" : `Open star note ${it.id}`}
            >
              {it.type === "moon" ? <MoonIcon /> : <StarIcon />}
            </button>
          );
        })}
      </div>

      {activeNote && (
        <NoteModal
          title={activeNote.type === "moon" ? "A Moon Note" : "A Star Note"}
          text={activeNote.text}
          onClose={() => setActiveNote(null)}
        />
      )}
    </>
  );
}

export default FloatingSky;
