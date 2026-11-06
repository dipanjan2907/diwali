
import React, { useState } from "react";

const diyaList = [1, 2, 3, 4, 5, 6];

function DiyaSection() {
  const [litDiyas, setLitDiyas] = useState([]);

  const toggleDiya = (id) => {
    setLitDiyas((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const allLit = litDiyas.length === diyaList.length;

  return (
    <section className="diya-section" id="diya">

      <div className="section-heading">
        <p className="section-label">A MOMENT OF LIGHT</p>

        <h2>
          Light Up Your <span>Diya</span>
        </h2>

        <p>
          Every little flame carries a beautiful wish.
          Light a diya and spread happiness this Diwali.
        </p>
      </div>

      <div className="diya-grid">
        {diyaList.map((id) => {
          const isLit = litDiyas.includes(id);

          return (
            <button
              key={id}
              className={`mini-diya ${isLit ? "active" : ""}`}
              onClick={() => toggleDiya(id)}
              aria-label={`${isLit ? "Extinguish" : "Light"} diya ${id}`}
            >
              <span className="mini-glow"></span>
              <span className="mini-flame">🔥</span>
              <span className="mini-bowl">🪔</span>
              <span className="diya-number">{id}</span>
            </button>
          );
        })}
      </div>

      <div className="diya-progress">
        <div className="progress-info">
          <span>YOUR LIGHTS</span>
          <span>{litDiyas.length} / {diyaList.length}</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${(litDiyas.length / diyaList.length) * 100}%`
            }}
          ></div>
        </div>
      </div>

      {allLit ? (
        <div className="celebration-message">
          <span>✨ 🪔 ✨</span>
          <h3>You've Spread the Light!</h3>
          <p>
            May your life always shine with happiness,
            love and prosperity.
          </p>
          <button onClick={() => setLitDiyas([])}>
            Celebrate Again
          </button>
        </div>
      ) : (
        <p className="diya-hint">
          ✨ Tap each diya to light it up
        </p>
      )}

    </section>
  );
}

export default DiyaSection;
