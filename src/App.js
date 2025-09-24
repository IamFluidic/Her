// import React, { useState, useEffect } from "react";
import React, { useState, useEffect, useRef } from "react";
import NameChallenge from "./components/NameChallenge";
import QualitiesGame from "./components/QualitiesGame";
import BestPerson from "./components/BestPerson";
import Proposal from "./components/Proposal";
import LoveNote from "./components/LoveNote";
//import Confetti from "react-confetti";
import SpotifyPlayer from "./components/SpotifyPlayer"; // Import the new Spotify component
//import TimeTogether from "./components/TimeTogether";
import BirthdayCountdown from "./components/BirthdayCountdown";
import FloatingSky from "./components/FloatingSky";
import StarBackground from "./components/StarBackground";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [showLoveNote, setShowLoveNote] = useState(false);
  const [showDialog, setShowDialog] = useState(false); // Shared dialog state
  const [timeTogether, setTimeTogether] = useState(""); // State for elapsed time

  const spotifyRef = useRef(null);

  const nextStep = () => setStep(step + 1);
  const resetStep = () => setStep(1);

  useEffect(() => {
    const audio = new Audio('/bg-music.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(err => console.error("Audio play failed:", err));
    return () => audio.pause();
  }, []);

  useEffect(() => {
    console.log("💖 You're amazing! Thanks for being here! 😘");
  }, []);

  useEffect(() => {
    const startDate = new Date(2025, 8, 8); // September 6, 2025 (months are 0-based)
    const updateTimer = () => {
      const now = new Date();
      const timeDiff = now - startDate; // Time difference in milliseconds
      if (timeDiff < 0) {
        console.warn("Start date is in the future:", startDate);
        setTimeTogether("Countdown not started");
        return;
      }

      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      const remainingHours = hours % 24;
      const remainingMinutes = minutes % 60;
      const remainingSeconds = seconds % 60;

      const timeString = `${days}d ${remainingHours}h ${remainingMinutes}m ${remainingSeconds}s`;
      console.log("Timer update:", timeString); // Debug log
      setTimeTogether(timeString);
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    // measure spotify height and reserve space in .App so content doesn't get hidden
    function updateAppPadding() {
      try {
        const spotifyEl = spotifyRef.current;
        const appEl = document.querySelector(".App");
        if (!spotifyEl || !appEl) return;
        // include bottom gap (20px + extra breathing room)
        const height = Math.ceil(spotifyEl.getBoundingClientRect().height);
        appEl.style.paddingBottom = `${height + 40}px`;
      } catch (err) {
        console.warn("Failed to update App padding:", err);
      }
    }

    updateAppPadding();
    window.addEventListener("resize", updateAppPadding);
    const t = setTimeout(updateAppPadding, 600); // after fonts load
    return () => {
      window.removeEventListener("resize", updateAppPadding);
      clearTimeout(t);
      // optional: reset padding on unmount
      const appEl = document.querySelector(".App");
      if (appEl) appEl.style.paddingBottom = "";
    };
  }, [/* no deps - runs on mount */]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Time Together",
        text: `We've been together for ${timeTogether}! ❤️`,
        url: window.location.href,
      }).catch((error) => console.error("Share failed:", error));
    } else {
      alert(`Share this: We've been together for ${timeTogether}! ❤️\n${window.location.href}`);
    }
  };

  return (
    <div className="App">
      <StarBackground /> 
      <FloatingSky />
      <h1 className="fade-in" style={{ margin: "0", color: "#e11d48" }}>❤️ A Surprise for You ❤️</h1>
      <div className="step">
        {step === 1 && <BirthdayCountdown />}
        {step === 1 && <NameChallenge nextStep={nextStep} showDialog={showDialog} setShowDialog={setShowDialog} />}
        {step === 2 && <QualitiesGame nextStep={nextStep} />}
        {step === 3 && <BestPerson nextStep={nextStep} />}
        {step === 4 && <Proposal resetStep={resetStep} />}
      </div>

      <h2 className="fade-in" style={{ marginTop: "40px" }}>
        {/* P.S. Check the console for a little surprise 😉 */}
      </h2>
      {step === 1 && !showDialog && (
        <>
          <button
            className="fade-in"
            style={{ marginTop: "20px" }}
            onClick={() => setShowLoveNote(true)}
          >
            Write a Love Note 💌
          </button>

        </>
      )}
      {showLoveNote && <LoveNote onClose={() => setShowLoveNote(false)} />}

      {step === 1 && (
        <>
          <div className="time-container">
            <h1 className="fade-in" style={{ margin: "0", color: "#e11d48" }}>
              ❤️ Time Together ❤️<br />
            </h1>
            <br />
            <h2 className="fade-in" style={{ margin: "0", color: "#3a8debff" }}>
              {timeTogether}
            </h2>
            <button
              className="fade-in"
              style={{ marginTop: "10px" }}
              onClick={handleShare}
            >
              📤 Share
            </button>
          </div>

          {/* <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
            recycle={true}
            colors={['#ff69b4', '#ff1493', '#ff69b4']}
            emoji={['❤️']}
            gravity={0.02}
          /> */}
        </>
      )}
      {step === 1 && (
        <div className="spotify-container" ref={spotifyRef}>
          <SpotifyPlayer />
        </div>
      )}


      {/* <div className="time-container"> */}
      {/* <p className="fade-in" style={{ margin: "0", color: "#e11d48" }}>
          Time Together: {timeTogether}
        </p> */}
      {/* <h1 className="fade-in" style={{ margin: "0", color: "#e11d48" }}>❤️ Time Together ❤️<br></br> </h1> {timeTogether}
      </div> */}

      {/* <div className="time-container">
        <h1 className="fade-in" style={{ margin: "0", color: "#e11d48" }}>
          ❤️ Time Together ❤️<br />
        </h1>
        <br />
        <h2 className="fade-in" style={{ margin: "0", color: "#3a8debff" }}>
          {timeTogether}
        </h2>
        <button
          className="fade-in"
          style={{ marginTop: "10px" }}
          onClick={handleShare}
        >
          📤 Share
        </button>
      </div> */}

      <audio autoPlay loop>
        <source src="/bg-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;