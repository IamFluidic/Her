// src/components/TimeTogether.js
import React, { useState, useEffect } from "react";

const TimeTogether = () => {
  const [time, setTime] = useState({
    years: "00",
    months: "00",
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const startDate = new Date("2024-09-06");

    const updateTimer = () => {
      const now = new Date();
      const diff = now - startDate;

      const totalSeconds = Math.floor(diff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);

      const years = String(Math.floor(totalDays / 365)).padStart(2, "0");
      const months = String(Math.floor((totalDays % 365) / 30)).padStart(2, "0");
      const days = String(totalDays % 30).padStart(2, "0");
      const hours = String(totalHours % 24).padStart(2, "0");
      const minutes = String(totalMinutes % 60).padStart(2, "0");
      const seconds = String(totalSeconds % 60).padStart(2, "0");

      setTime({ years, months, days, hours, minutes, seconds });
    };

    updateTimer(); // Run immediately on mount
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }); // Removed dependency array

  const cardStyle =
    "bg-pink-200 rounded-2xl p-4 text-center min-w-[80px] shadow-md";
  const valueStyle = "text-3xl font-bold text-pink-600";
  const labelStyle = "text-sm font-medium text-gray-700 mt-1";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-pink-50 rounded-3xl text-center relative">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">Time Together</h2>
      <div className="flex justify-center gap-4">
        <div className={cardStyle}>
          <div className={valueStyle}>{time.years}</div>
          <div className={labelStyle}>Years</div>
        </div>
        <div className={cardStyle}>
          <div className={valueStyle}>{time.months}</div>
          <div className={labelStyle}>Months</div>
        </div>
        <div className={cardStyle}>
          <div className={valueStyle}>{time.days}</div>
          <div className={labelStyle}>Days</div>
        </div>
        <div className={cardStyle}>
          <div className={valueStyle}>{time.hours}</div>
          <div className={labelStyle}>Hours</div>
        </div>
        <div className={cardStyle}>
          <div className={valueStyle}>{time.minutes}</div>
          <div className={labelStyle}>Minutes</div>
        </div>
        <div className={cardStyle}>
          <div className={valueStyle}>{time.seconds}</div>
          <div className={labelStyle}>Seconds</div>
        </div>
      </div>
      <span className="absolute left-6 bottom-6 text-2xl text-red-500">❤️</span>
    </div>
  );
};

export default TimeTogether;