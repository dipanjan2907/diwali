
import React, { useState } from "react";
import "./diya.css";

const diyaNumbers = [1, 2, 3, 4, 5, 6];

function DiyaLamp({ number, isLit, onClick }) {
  return (
    <button
      className={`ad-lamp ${isLit ? "ad-lit" : ""}`}
      onClick={onClick}
      aria-label={`${isLit ? "Extinguish" : "Light"} diya ${number}`}
      aria-pressed={isLit}
    >
      <span className="ad-light-glow" />

      <span className="ad-flame-area">
        <span className="ad-flame">
          <span className="ad-inner-flame" />
        </span>
      </span>

      <span className="ad-wick" />

      <span className="ad-oil">
        <span />
      </span>

      <span className="ad-bowl">
        <span className="ad-rim" />
        <span className="ad-ornament">✦</span>
        <span className="ad-ornament ad-ornament-two">✦</span>
        <span className="ad-ornament ad-ornament-three">•</span>
      </span>

      <span className="ad-base" />

      <span className="ad-lamp-number">
        {String(number).padStart(2, "0")}
      </span>

      <span className="ad-lamp-status">
        {isLit ? "GLOWING" : "TAP TO LIGHT"}
      </span>
    </button>
  );
}

export default function DiyaSection() {
  const [litDiyas, setLitDiyas] = useState([]);

  const toggleDiya = (id) => {
    setLitDiyas((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const lightAll = () => setLitDiyas([...diyaNumbers]);
  const extinguishAll = () => setLitDiyas([]);

  const count = litDiyas.length;
  const complete = count === diyaNumbers.length;

  return (
    <main className="ad-page">
      <div className="ad-background-glow" />
      <div className="ad-grain" />

      <header className="ad-header">
        <span className="ad-brand">
          <span>✦</span> AURORA DIWALI
        </span>
        <span className="ad-header-right">THE FESTIVAL OF LIGHTS</span>
      </header>

      <section className="ad-intro">
        <p className="ad-eyebrow">
          <span /> A SACRED MOMENT <span />
        </p>

        <h1>
          Let There Be <em>Light.</em>
        </h1>

        <p className="ad-description">
          Every flame begins with a spark.
          Light your diyas and let warmth, hope and happiness
          illuminate your Diwali.
        </p>
      </section>

      <section className="ad-temple">
        <div className="ad-temple-decoration">
          <span>✧</span>
          <span>✦</span>
          <span>✧</span>
        </div>

        <div className="ad-arch">
          <div className="ad-arch-border">
            <div className="ad-arch-content">
              <div className="ad-temple-title">
                <span>✦</span>
                <p>THE LIGHTING CEREMONY</p>
                <span>✦</span>
              </div>

              <div className="ad-lamp-grid">
                {diyaNumbers.map((number) => (
                  <DiyaLamp
                    key={number}
                    number={number}
                    isLit={litDiyas.includes(number)}
                    onClick={() => toggleDiya(number)}
                  />
                ))}
              </div>

              <p className="ad-temple-blessing">
                शुभ दीपावली · SHUBH DEEPAVALI
              </p>
            </div>
          </div>
        </div>

        <div className="ad-platform">
          <span>✦</span>
          <div />
          <span>✧</span>
          <div />
          <span>✦</span>
        </div>
      </section>

      <section className="ad-console">
        <div className="ad-console-info">
          <div>
            <p className="ad-console-label">YOUR LIGHTS</p>
            <h2>
              {String(count).padStart(2, "0")}
              <span> / 06</span>
            </h2>
          </div>

          <div className="ad-console-status">
            <span className={count > 0 ? "ad-online" : ""} />
            {complete
              ? "All flames are glowing"
              : count > 0
              ? "Your light is spreading"
              : "Waiting for your first spark"}
          </div>
        </div>

        <div className="ad-progress">
          <div style={{ width: `${(count / 6) * 100}%` }} />
        </div>

        <div className="ad-actions">
          <button
            className="ad-primary-btn"
            onClick={lightAll}
            disabled={complete}
          >
            ✧ Light All Diyas
          </button>

          <button
            className="ad-secondary-btn"
            onClick={extinguishAll}
            disabled={count === 0}
          >
            Extinguish All
          </button>
        </div>
      </section>

      {complete ? (
        <section className="ad-completion">
          <div className="ad-completion-icon">✧ 🪔 ✧</div>
          <h2>A Thousand Lights, One Beautiful Wish.</h2>
          <p>
            May your home be filled with peace, your heart with joy,
            and your life with endless possibilities.
          </p>
          <button onClick={extinguishAll}>
            Begin Another Celebration
          </button>
        </section>
      ) : (
        <p className="ad-bottom-note">
          ✦ CLICK A DIYA TO IGNITE YOUR LITTLE WORLD ✦
        </p>
      )}

      <footer className="ad-footer">
        <span>MADE WITH LIGHT & LOVE</span>
        <span>✧ AURORA DIWALI ✧</span>
      </footer>
    </main>
  );
}
