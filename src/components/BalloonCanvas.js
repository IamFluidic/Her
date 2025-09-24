import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";

const BalloonCanvas = () => {
    const canvasRef = useRef(null);
    const [balloons, setBalloons] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
    const balloonRadius = 35;

    // Memoize colorPalette so it doesn't change on every render
    const colorPalette = useMemo(() => [
        "#FF4D4D",
        "#FFB84D",
        "#4D94FF",
        "#4DFF88",
        "#FF4DD0",
        "#FFD700",
        "#FF69B4",
        "#00BFFF",
        "#32CD32",
    ], []);

    // Draw a single balloon
    const drawBalloon = useCallback((ctx, balloon) => {
        ctx.save();
        ctx.translate(balloon.x, balloon.y);
        ctx.rotate(balloon.rotation);

        // Balloon body
        ctx.fillStyle = balloon.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, 20, 35, 0, 0, 2 * Math.PI);
        ctx.fill();

        // Knot
        ctx.fillStyle = "#A9A9A9";
        ctx.beginPath();
        ctx.arc(0, 35, 4, 0, 2 * Math.PI);
        ctx.fill();

        // String
        ctx.strokeStyle = "#555";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const startX = 0, startY = 35, endX = 0, endY = 100;
        const controlX = Math.sin(balloon.wigglePhase) * 15;
        const controlY = (startY + endY) / 2 + Math.cos(balloon.wigglePhase * 0.5) * 5;
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.stroke();

        ctx.restore();
    }, []);

    const drawAllBalloons = useCallback((ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (balloons.length === 0) {
            ctx.fillStyle = "#9ca3af";
            ctx.font = "24px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(
                "Click, tap, or drag to create balloons!",
                ctx.canvas.width / 2,
                ctx.canvas.height / 2
            );
        }
        balloons.forEach((b) => drawBalloon(ctx, b));
    }, [balloons, drawBalloon]);

    const createBalloon = useCallback((x, y) => {
        const rotation = (Math.random() - 0.5) * 0.2;
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        const vx = (Math.random() - 0.5) * 1.5;
        const vy = -1 - Math.random();
        const wigglePhase = Math.random() * Math.PI * 2;
        setBalloons((prev) => [...prev, { x, y, rotation, color, vx, vy, wigglePhase }]);
    }, [colorPalette]);

    const getTouchPosition = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return {
            x: event.touches[0].clientX - rect.left,
            y: event.touches[0].clientY - rect.top
        };
    };

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const setCanvasSize = () => {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            drawAllBalloons(ctx);
        };

        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        let animationFrameId;

        const animate = () => {
            setBalloons((prevBalloons) =>
                prevBalloons
                    .map((b) => ({ ...b, x: b.x + b.vx, y: b.y + b.vy, wigglePhase: b.wigglePhase + 0.05 }))
                    .filter((b) => b.y > -150)
                    .map((b, i, arr) => {
                        arr.forEach((other, j) => {
                            if (i === j) return;
                            const dx = b.x - other.x;
                            const dy = b.y - other.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            if (distance < balloonRadius * 2) {
                                const angle = Math.atan2(dy, dx);
                                const sin = Math.sin(angle);
                                const cos = Math.cos(angle);

                                const v1x = b.vx * cos + b.vy * sin;
                                const v1y = b.vy * cos - b.vx * sin;
                                const v2x = other.vx * cos + other.vy * sin;
                                const v2y = other.vy * cos - other.vx * sin;

                                const vFinal1x = v2x;
                                const vFinal2x = v1x;

                                b.vx = vFinal1x * cos - v1y * sin;
                                b.vy = v1y * cos + vFinal1x * sin;
                                other.vx = vFinal2x * cos - v2y * sin;
                                other.vy = v2y * cos + vFinal2x * sin;
                            }
                        });
                        if (b.x < 0 || b.x > canvas.width) b.vx *= -1;
                        return b;
                    })
            );

            drawAllBalloons(ctx);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [drawAllBalloons]);

    // Mouse & Touch Events
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseDown = (e) => {
            setIsDrawing(true);
            setLastPosition({ x: e.offsetX, y: e.offsetY });
            createBalloon(e.offsetX, e.offsetY);
        };
        const handleMouseMove = (e) => {
            if (!isDrawing) return;
            const currentPosition = { x: e.offsetX, y: e.offsetY };
            const distance = Math.hypot(currentPosition.x - lastPosition.x, currentPosition.y - lastPosition.y);
            if (distance > 30) {
                createBalloon(currentPosition.x, currentPosition.y);
                setLastPosition(currentPosition);
            }
        };
        const stopDrawing = () => setIsDrawing(false);

        const handleTouchStart = (e) => {
            setIsDrawing(true);
            e.preventDefault();
            const pos = getTouchPosition(e);
            setLastPosition(pos);
            createBalloon(pos.x, pos.y);
        };
        const handleTouchMove = (e) => {
            if (!isDrawing) return;
            e.preventDefault();
            const pos = getTouchPosition(e);
            const distance = Math.hypot(pos.x - lastPosition.x, pos.y - lastPosition.y);
            if (distance > 30) {
                createBalloon(pos.x, pos.y);
                setLastPosition(pos);
            }
        };
        const handleTouchEnd = () => setIsDrawing(false);

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseleave", stopDrawing);
        canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
        canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
        canvas.addEventListener("touchend", handleTouchEnd);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", stopDrawing);
            canvas.removeEventListener("mouseleave", stopDrawing);
            canvas.removeEventListener("touchstart", handleTouchStart);
            canvas.removeEventListener("touchmove", handleTouchMove);
            canvas.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isDrawing, lastPosition, createBalloon]); // ✅ add createBalloon here

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] cursor-pointer rounded-xl shadow-lg"
        />
    );
};

export default BalloonCanvas;
