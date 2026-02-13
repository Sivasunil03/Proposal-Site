"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Heart, Mail, ArrowRight, Check } from "lucide-react";
import confetti from "canvas-confetti";
import "./proposal.css";

interface Theme {
  primary: string;
  secondary: string;
}

function ProposalContent() {
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const name1 = decodeURIComponent(searchParams.get("n1") || "Someone");
  const name2 = decodeURIComponent(searchParams.get("n2") || "You");
  const message = decodeURIComponent(
    searchParams.get("msg") || "Will you be mine?",
  );
  const theme: Theme = {
    primary: `#${searchParams.get("p") || "c9a227"}`,
    secondary: `#${searchParams.get("s") || "8b7355"}`,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowLetter(true), 500);
  };

  const handleYes = () => {
    setAnswered(true);
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: [theme.primary, theme.secondary, "#ffffff"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: [theme.primary, theme.secondary, "#ffffff"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  if (!mounted) {
    return <div className="loading-screen" />;
  }

  return (
    <div
      className="proposal-page"
      style={
        {
          "--primary": theme.primary,
          "--secondary": theme.secondary,
        } as React.CSSProperties
      }
    >
      {/* Background */}
      <div className="bg-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${4 + Math.random() * 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <main className="main-content">
        {!answered ? (
          <div className="envelope-wrapper">
            {/* Envelope */}
            {!isOpen && (
              <div className="envelope" onClick={handleOpen}>
                <div className="envelope-body">
                  <div className="envelope-meta">
                    <span>From: {name1}</span>
                    <span>To: {name2}</span>
                  </div>
                  <div className="envelope-center">
                    <div className="seal">
                      <Mail size={28} />
                    </div>
                  </div>
                  <div className="envelope-hint">
                    <span>Click to open</span>
                  </div>
                </div>
                <div className="envelope-flap" />
              </div>
            )}

            {/* Opening transition */}
            {isOpen && !showLetter && (
              <div className="opening-transition">
                <Heart size={48} fill="white" />
              </div>
            )}

            {/* Letter */}
            {showLetter && (
              <div className="letter-card">
                <div className="letter-header">
                  <div className="wax-seal">
                    <Heart size={20} fill="white" />
                  </div>
                </div>

                <div className="letter-content">
                  <p className="recipient">Dear {name2},</p>
                  <h1 className="title">Will You Be Mine?</h1>
                  <p className="message">{message}</p>
                  <div className="signature">
                    <span>With love,</span>
                    <strong>{name1}</strong>
                  </div>
                </div>

                <div className="letter-actions">
                  <button
                    onClick={handleYes}
                    className="btn-yes"
                    style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                    }}
                  >
                    Yes, absolutely
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Success */
          <div className="success-card">
            <div
              className="success-icon"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              <Heart size={32} fill="white" />
            </div>
            <h2>Yes!</h2>
            <p className="couple">
              {name1} <span>&</span> {name2}
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="btn-return"
            >
              Create your own
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ProposalPage() {
  return (
    <Suspense
      fallback={
        <div className="loading-screen">
          <div className="spinner" />
        </div>
      }
    >
      <ProposalContent />
    </Suspense>
  );
}
