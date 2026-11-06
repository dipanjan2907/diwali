
import React, { useState } from "react";

function GreetingGenerator() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState(
    "May your life shine brighter than a thousand diyas. Wishing you happiness, prosperity and endless joy!"
  );

  const [theme, setTheme] = useState("gold");

  const themes = [
    { id: "gold", name: "Royal Gold", color: "#E8BD73" },
    { id: "purple", name: "Mystic Purple", color: "#C4A0FF" },
    { id: "rose", name: "Rose Gold", color: "#E9A99C" }
  ];

  const shareGreeting = () => {
    const text = `🪔 Happy Diwali ${receiver || "Dear Friend"}! 🪔\n\n${message}\n\nWith love,\n${sender || "Your Friend"}\n\n✨ Created with Aurora Diwali`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="greeting-section" id="greetings">

      <div className="section-heading">
        <p className="section-label">A GIFT FROM THE HEART</p>

        <h2>
          Create Your <span>Diwali Wish</span>
        </h2>

        <p>
          Personalise your wishes and spread happiness
          with the people you love.
        </p>
      </div>

      <div className="greeting-layout">

        {/* INPUT FORM */}

        <div className="greeting-form">

          <h3>Create Your Greeting</h3>

          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            maxLength={35}
          />

          <label>Receiver's Name</label>
          <input
            type="text"
            placeholder="Who are you wishing?"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            maxLength={35}
          />

          <label>Your Personal Message</label>
          <textarea
            placeholder="Write your Diwali wishes..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={250}
            rows={4}
          />

          <div className="message-count">
            {message.length}/250 characters
          </div>

          <label>Choose Your Theme</label>

          <div className="theme-options">
            {themes.map((item) => (
              <button
                key={item.id}
                className={`theme-btn ${
                  theme === item.id ? "selected" : ""
                }`}
                onClick={() => setTheme(item.id)}
                style={{ "--theme-color": item.color }}
              >
                <span></span>
                {item.name}
              </button>
            ))}
          </div>

          <button
            className="share-btn"
            onClick={shareGreeting}
          >
            Share on WhatsApp ↗
          </button>

        </div>

        {/* LIVE PREVIEW */}

        <div className="greeting-preview">

          <p className="preview-label">LIVE PREVIEW</p>

          <div className={`greeting-card theme-${theme}`}>

            <div className="card-decoration top-decoration">
              ✦ ✧ ✦
            </div>

            <div className="card-diya">🪔</div>

            <p className="card-small-title">
              WITH LOVE & LIGHT
            </p>

            <h2>Happy Diwali</h2>

            <div className="card-divider">✧</div>

            <h3>
              {receiver.trim() || "Dear Friend"}
            </h3>

            <p className="card-message">
              {message}
            </p>

            <div className="card-signature">
              With love,
              <strong>{sender.trim() || "Your Friend"}</strong>
            </div>

            <div className="card-decoration bottom-decoration">
              ✦ ✧ ✦
            </div>

          </div>

          <p className="preview-hint">
            ✨ Your greeting updates as you type
          </p>

        </div>

      </div>

    </section>
  );
}

export default GreetingGenerator;
