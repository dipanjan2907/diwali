
import { useEffect, useRef, useState } from "react";
import "./Fireworks.css";

const COLORS = [
  "#FFD700",
  "#FF5E78",
  "#55D6FF",
  "#C77DFF",
  "#FF9F43",
  "#FFFFFF",
  "#7CFFB2",
];

function Fireworks() {
  const canvasRef = useRef(null);
  const fireworksRef = useRef([]);
  const particlesRef = useRef([]);
  const [autoLaunch, setAutoLaunch] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationId;
    let lastLaunch = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const launchFirework = (x, y) => {
      const startX = x ?? Math.random() * canvas.clientWidth;
      const targetY =
        y ?? canvas.clientHeight * (0.15 + Math.random() * 0.4);

      fireworksRef.current.push({
        x: startX,
        y: canvas.clientHeight,
        targetY,
        speed: 5 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        trail: [],
      });
    };

    const explode = (x, y, color) => {
      const count = 65 + Math.floor(Math.random() * 45);

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 1.5 + Math.random() * 4;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: 0.009 + Math.random() * 0.012,
          radius: 1 + Math.random() * 2,
          color,
          gravity: 0.035,
        });
      }
    };

    const animate = (time) => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.clearRect(0, 0, width, height);

      // Automatic fireworks
      if (autoLaunch && time - lastLaunch > 850) {
        launchFirework();
        lastLaunch = time;
      }

      // Firework rockets
      fireworksRef.current = fireworksRef.current.filter((rocket) => {
        rocket.trail.push({ x: rocket.x, y: rocket.y });

        if (rocket.trail.length > 7) rocket.trail.shift();

        rocket.y -= rocket.speed;

        ctx.beginPath();
        ctx.moveTo(rocket.x, rocket.y + 8);
        ctx.lineTo(rocket.x, rocket.y);
        ctx.strokeStyle = rocket.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        rocket.trail.forEach((point, index) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = rocket.color;
          ctx.globalAlpha = index / rocket.trail.length;
          ctx.fill();
          ctx.globalAlpha = 1;
        });

        if (rocket.y <= rocket.targetY) {
          explode(rocket.x, rocket.y, rocket.color);
          return false;
        }

        return true;
      });

      // Explosion particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += particle.gravity;
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        particle.alpha -= particle.decay;

        if (particle.alpha <= 0) return false;

        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = particle.color;
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    canvas.launchFirework = launchFirework;

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [autoLaunch]);

  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    canvasRef.current.launchFirework(x, y);
  };

  return (
    <section className="fireworks-section">
      <div className="fireworks-heading">
        <span className="fireworks-eyebrow">THE GRAND FINALE</span>

        <h1>
          Let the Sky <span>Shine</span>
        </h1>

        <p>
          Celebrate the magic of Diwali with a sky full of lights.
          Click anywhere and create your own fireworks.
        </p>
      </div>

      <div className="fireworks-stage">
        <canvas
          ref={canvasRef}
          className="fireworks-canvas"
          onClick={handleCanvasClick}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            const rect = canvasRef.current.getBoundingClientRect();

            canvasRef.current.launchFirework(
              touch.clientX - rect.left,
              touch.clientY - rect.top
            );
          }}
        />

        <div className="fireworks-stage-caption">
          ✦ CLICK ANYWHERE TO LAUNCH ✦
        </div>
      </div>

      <div className="fireworks-controls">
        <button
          className="fireworks-button"
          onClick={() => setAutoLaunch((previous) => !previous)}
        >
          {autoLaunch ? "Ⅱ Pause Auto Fireworks" : "▶ Start Auto Fireworks"}
        </button>

        <button
          className="fireworks-button secondary"
          onClick={() => canvasRef.current.launchFirework()}
        >
          ✨ Launch Firework
        </button>
      </div>

      <p className="fireworks-footer">
        Made with light, love & a little Diwali magic.
      </p>
    </section>
  );
}

export default Fireworks;
