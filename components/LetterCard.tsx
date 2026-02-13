"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Heart, Sparkles } from "lucide-react";
import "./template.css";

type LetterCardProps = {
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    name: string;
  };
  name1: string;
  name2: string;
  message: string;
  bigTitle: string;
  font: string;
  onYes: () => void;
  onNoHover: () => void;
  noBtnRef: React.RefObject<HTMLButtonElement>;
};

// Fun, playful messages (not begging!)
// const PLAYFUL_HINTS = [
//   "Think about it... 💭",
//   "Take your time 🌸",
//   "No pressure! 😊",
//   "Just wondering... 💫",
//   "Still here! ✨",
// ];

export default function LetterCard({
  theme,
  name1,
  name2,
  message,
  bigTitle,
  font,
  onYes,
  onNoHover,
  noBtnRef,
}: LetterCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noSize, setNoSize] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState("");

  useEffect(() => {
    const timer1 = setTimeout(() => setRevealed(true), 300);
    const timer2 = setTimeout(() => setShowContent(true), 800);
    const timer3 = setTimeout(() => setShowButtons(true), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleNoHover = useCallback(() => {
    setHoverCount((prev) => {
      const newCount = prev + 1;

      // Grow yes button gradually
      setYesScale(1 + newCount * 0.15);

      // Shrink no button gradually
      setNoSize(Math.max(0.4, 1 - newCount * 0.12));

      // Show playful hint every 2 hovers
      if (newCount % 2 === 0 && newCount < 10) {
        // setCurrentHint(
        //   PLAYFUL_HINTS[Math.floor(newCount / 2) % PLAYFUL_HINTS.length],
        // );
        setShowHint(true);
        setTimeout(() => setShowHint(false), 2000);
      }

      // Move no button around (after 3 hovers)
      if (newCount >= 3) {
        const maxX = window.innerWidth - 150;
        const maxY = window.innerHeight - 100;
        setNoPosition({
          x: Math.random() * maxX,
          y: Math.random() * maxY,
        });
      }

      return newCount;
    });

    onNoHover();
  }, [onNoHover]);

  const handleNoClick = useCallback(() => {
    // Same as hover - just moves it away
    handleNoHover();
  }, [handleNoHover]);

  return (
    <div className="letter-card-wrapper" style={{ fontFamily: font }}>
      <div className={`letter-card ${revealed ? "revealed" : ""}`}>
        <div className="letter-paper">
          {/* Decorative elements */}
          <div className="paper-grain" />
          <div className="corner-flourish top-left">❦</div>
          <div className="corner-flourish top-right">❦</div>
          <div className="corner-flourish bottom-left">❦</div>
          <div className="corner-flourish bottom-right">❦</div>

          {/* Content */}
          <div className={`letter-content ${showContent ? "visible" : ""}`}>
            <div className="letter-date">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>

            <div className="letter-greeting">My Dearest {name2},</div>

            <div
              className="letter-title"
              style={{
                color: theme.primary,
              }}
            >
              {bigTitle}
            </div>

            <div className="letter-message">{message}</div>

            <div className="letter-signature">
              <div className="signature-line">Forever yours,</div>
              <div className="signature-name" style={{ color: theme.primary }}>
                {name1}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className={`letter-buttons ${showButtons ? "visible" : ""}`}>
            {/* Playful hint (not begging) */}
            {showHint && <div className="playful-hint">{currentHint}</div>}

            <div className="buttons-row">
              <button
                className="yes-button"
                onClick={onYes}
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                  transform: `scale(${yesScale})`,
                }}
              >
                <Heart size={20} fill="white" />
                <span>Yes! ❤️</span>
                {yesScale > 1.5 && (
                  <Sparkles size={16} className="sparkle-icon" />
                )}
              </button>

              <button
                ref={noBtnRef}
                className={`no-button ${hoverCount >= 3 ? "floating" : ""}`}
                onClick={handleNoClick}
                onMouseEnter={handleNoHover}
                style={
                  hoverCount >= 3
                    ? {
                        position: "fixed",
                        left: `${noPosition.x}px`,
                        top: `${noPosition.y}px`,
                        transform: `scale(${noSize})`,
                        opacity: Math.max(0.3, 1 - hoverCount * 0.08),
                      }
                    : {
                        transform: `scale(${noSize})`,
                      }
                }
              >
                {hoverCount === 0
                  ? "No"
                  : hoverCount < 5
                    ? "Not yet"
                    : "Maybe?"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
