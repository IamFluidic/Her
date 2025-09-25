import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const Proposal = ({ resetStep }) => {
  const [answer, setAnswer] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [size, setSize] = useState(100); // width in px
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (answer === "Yes") {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        resetStep();
      }, 30000); // Redirect to step 1 after 30 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [answer, resetStep]);

  const moveNoButton = () => {
    const top = Math.floor(Math.random() * 60) + 20; // 20% to 80%
    const left = Math.floor(Math.random() * 60) + 20;
    setNoButtonStyle({
      position: "absolute",
      top: `${top}%`,
      left: `${left}%`,
      transform: "translate(-50%, -50%)",
      width: `${size}px`,
      transition: "top 0.2s, left 0.2s",
    });
    setSize((prev) => Math.max(prev - 5, 40));
    setAttempts(attempts + 1);
  };

  // return (
  //   <div className="step fade-in" style={{ position: "relative", height: "300px" }}>
  //     {showConfetti && <Confetti />}
  //     <h2>Will you be my Valentine? ❤️</h2>

  //     {/* NO button dodges progressively */}
  //     <button
  //       style={noButtonStyle}
  //       onMouseEnter={moveNoButton}
  //     >
  //       No
  //     </button>

  //     {/* YES button */}
  //     <button
  //       style={{ marginLeft: "20px", position: "relative" }}
  //       onClick={() => setAnswer("Yes")}
  //     >
  //       Yes
  //     </button>

  //     {answer === "No" && <p className="fade-in">You actually clicked "No"? 😅</p>}
  //     {answer === "Yes" && (
  //       <p className="fade-in">
  //         Yay! I love you! 💖 <br />
  //         🎉 You made it through the challenges!
  //       </p>
  //     )}
  return (
    <div className="step fade-in" style={{ position: "relative", height: "300px", background: "transparent", zIndex: 1000 }}>
      {showConfetti && <Confetti />}
      <h2 style={{color: "#e11d48" }}>Will you be my Valentine? ❤️</h2>

      {answer === "" && (
        <>
          <button
            style={noButtonStyle}
            onMouseEnter={moveNoButton}
          >
            No
          </button>
          <button
            style={{ marginLeft: "20px", position: "relative" }}
            onClick={() => setAnswer("Yes")}
          >
            Yes
          </button>
        </>
      )}

      {answer === "No" && <p className="fade-in">You actually clicked "No"? 😅</p>}
      {answer === "Yes" && (
        <div style={{ position: "relative", zIndex: 1002, pointerEvents: "auto" }}>
          <p className="fade-in" style={{color: "#e11d48", fontSize: 18}}>
            Yay! I love you! 💖 <br />
            🎉 You made it through the challenges!
          </p>
          <button
            className="fade-in glow"
            style={{ marginTop: "20px", position: "relative", zIndex: 1003, pointerEvents: "auto" }}
            onClick={resetStep}
          >
            Bye bebu
          </button>
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1000, pointerEvents: "none" }}>
            <img
              src="/images/heart.gif"
              alt="Hearts"
              className="heart-gif full-screen-gif"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Proposal;