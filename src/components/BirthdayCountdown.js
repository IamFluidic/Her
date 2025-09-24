import React, { useState, useEffect } from "react";
import "./BirthdayCountdown.css";
import BalloonCanvas from "./BalloonCanvas";

function BirthdayCountdown() {
    const [countdown, setCountdown] = useState({
        months: 0,
        days: 0,
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    const [isOpen, setIsOpen] = useState(false);
    const [celebrate, setCelebrate] = useState(false);

    useEffect(() => {
        const getNextBirthday = () => {
            const now = new Date();
            const currentYear = now.getFullYear();
            let birthday = new Date(currentYear, 9, 13, 0, 0, 0); // Oct 13
            if (now > birthday) birthday = new Date(currentYear + 1, 9, 13, 0, 0, 0);
            return birthday;
        };

        const updateCountdown = () => {
            const now = new Date();
            const birthday = getNextBirthday();
            const msDiff = birthday - now;
            const totalSeconds = Math.floor(msDiff / 1000);

            let months =
                (birthday.getFullYear() - now.getFullYear()) * 12 +
                (birthday.getMonth() - now.getMonth());
            if (birthday.getDate() < now.getDate()) months -= 1;

            const days = Math.floor(totalSeconds / (3600 * 24));
            const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            setCountdown({
                months: Math.max(months, 0),
                days,
                hours: hours.toString().padStart(2, "0"),
                minutes: minutes.toString().padStart(2, "0"),
                seconds: seconds.toString().padStart(2, "0"),
            });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    const openModal = () => {
        setIsOpen(true);
        setCelebrate(false); // ensure canvas is hidden initially
    };

    const closeModal = () => {
        setIsOpen(false);
        setCelebrate(false); // reset celebrate when modal closes
    };

    

    return (
        <>
            {/* Countdown Container */}
            <div
                className="birthday-countdown-clock"
                // onClick={() => setIsOpen(true)}
                onClick={openModal}
                style={{ cursor: "pointer" }}
            >
                <h3 className="fade-in clock-title" >🎂 Her Birthday 🎂</h3>
                <div className="clock-display">
                    {["months", "days", "hours", "minutes", "seconds"].map((unit) => (
                        <div key={unit} className="clock-unit">
                            <span className="clock-number" >{countdown[unit]}</span>
                            <div className="clock-label">
                                {unit.charAt(0).toUpperCase() + unit.slice(1)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gifts with hover fly animation */}
                <p className="open-gift">
                    <span
                        onMouseEnter={(e) => {
                            e.currentTarget.querySelectorAll(".gift-emoji").forEach((el) => {
                                el.classList.remove("bounce-gift");
                                const directions = ["fly-up", "fly-down", "fly-left", "fly-right", "spin"];
                                const dir = directions[Math.floor(Math.random() * directions.length)];
                                el.classList.add("fly-gift", dir);
                            });
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.querySelectorAll(".gift-emoji").forEach((el) => {
                                el.classList.remove(
                                    "fly-gift",
                                    "fly-up",
                                    "fly-down",
                                    "fly-left",
                                    "fly-right",
                                    "spin"
                                );
                                el.classList.add("bounce-gift");
                            });
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        Open{" "}
                        <span className="gift-emoji bounce-gift">🎁</span>{" "}
                        <span className="gift-emoji bounce-gift">🎁</span>
                    </span>
                </p>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content slide-in" onClick={(e) => e.stopPropagation()}>
                        {/* <button className="close-btn" onClick={() => setIsOpen(false)}> */}
                        <button className="close-btn" onClick={closeModal}>
                            ❌
                        </button>
                        <h2>🎉 Countdown to Her Birthday 🎉</h2>

                        {/* Modal countdown in vertical units */}
                        <div className="clock-display" style={{ justifyContent: "center", margin: "24px 0" }}>
                            {["months", "days", "hours", "minutes", "seconds"].map((unit) => (
                                <div key={unit} className="clock-unit">
                                    <span className="clock-number">{countdown[unit]}</span>
                                    <div className="clock-label">
                                        {unit.charAt(0).toUpperCase() + unit.slice(1)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Gift triggers BalloonCanvas rendering */}
                        <div
                            className="gift-box"
                            onClick={() => setCelebrate(true)}
                            style={{ cursor: "pointer"}}
                        >
                            🎁
                        </div>
                        {celebrate && (
                            <div style={{ width: "100%", height: "300px", marginTop: "16px" }}>
                                <BalloonCanvas />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default BirthdayCountdown;
