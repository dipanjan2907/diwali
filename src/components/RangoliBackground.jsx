
import React, { useRef, useState } from "react";
import "./rangoli-background.css";

const particles = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 17) % 100}%`,
  delay: `${(i % 9) * -0.8}s`,
  duration: `${5 + (i % 6)}s`,
  size: `${2 + (i % 3)}px`,
}));

export default function RangoliBackground() {
  const areaRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  const handleMove = (event) => {
    if (!areaRef.current) return;

    const rect = areaRef.current.getBoundingClientRect();

    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={areaRef}
      className="rg-background"
      onPointerMove={handleMove}
      onPointerLeave={() => setPointer({ x: 50, y: 50 })}
      style={{
        "--rg-pointer-x": `${pointer.x}%`,
        "--rg-pointer-y": `${pointer.y}%`,
      }}
      aria-hidden="true"
    >
      <div className="rg-mouse-glow" />
      <div className="rg-ambient rg-ambient-one" />
      <div className="rg-ambient rg-ambient-two" />

      <div className="rg-mandala rg-mandala-left">
        <div className="rg-mandala-inner">✺</div>
      </div>

      <div className="rg-mandala rg-mandala-right">
        <div className="rg-mandala-inner">✺</div>
      </div>

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="rg-particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}

      <span className="rg-decoration rg-decoration-one">✧</span>
      <span className="rg-decoration rg-decoration-two">✦</span>
      <span className="rg-decoration rg-decoration-three">✧</span>
      <span className="rg-decoration rg-decoration-four">✺</span>
    </div>
  );
}
