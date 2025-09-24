import React, { useRef, useEffect } from "react";

export default function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let stars = [];
    const NUM_STARS = 2000;
    const COMET_CHANCE = 0.02; // chance per frame for a comet to appear

    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 1.5;
        this.alpha = Math.random();
        this.alphaChange = 0.005 + Math.random() * 0.005;
        this.speed = 0.05 + Math.random() * 0.05;
      }
      update() {
        this.alpha += this.alphaChange;
        if (this.alpha <= 0 || this.alpha >= 1) this.alphaChange *= -1;
        this.y -= this.speed;
        if (this.y < 0) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.fill();
      }
    }

    class Comet {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height/2;
        this.length = 100 + Math.random() * 150;
        this.speedX = 2 + Math.random() * 2;
        this.speedY = 1 + Math.random();
        this.alpha = 1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.005;
      }
      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y - this.length/2);
        ctx.strokeStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    stars = Array.from({ length: NUM_STARS }, () => new Star());
    let comets = [];

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // draw stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // maybe add a comet
      if (Math.random() < COMET_CHANCE) {
        comets.push(new Comet());
      }

      // draw comets
      comets.forEach((comet, idx) => {
        comet.update();
        comet.draw();
        if (comet.alpha <= 0) comets.splice(idx, 1);
      });

      requestAnimationFrame(animate);
    }

    animate();

    // handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1, // behind everything
        background: "#010118",
      }}
    />
  );
}
