"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  ArrowRight,
  Sparkles,
  Check,
  Lock,
  Mail,
  Type,
  Palette,
  MessageSquare,
  User,
  Eye,
  RefreshCcw,
  Send,
  Star,
  X,
  Github,
  Shield,
  Instagram,
} from "lucide-react";
import confetti from "canvas-confetti";
import LetterCard from "@/components/LetterCard";

// --- Types ---
type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  name: string;
  text?: string;
};

type ProposalData = {
  bigTitle: string;
  n1: string;
  n2: string;
  msg: string;
  p: string;
  s: string;
  a: string;
  font: string;
};

const THEMES: Theme[] = [
  {
    primary: "#ff6b9d",
    secondary: "#c44569",
    accent: "#ff8fab",
    name: "Rose Romance",
  },
  {
    primary: "#a29bfe",
    secondary: "#6c5ce7",
    accent: "#b8b5ff",
    name: "Lavender Dream",
  },
  {
    primary: "#fd79a8",
    secondary: "#e84393",
    accent: "#ff9abe",
    name: "Pink Passion",
  },
  {
    primary: "#00b894",
    secondary: "#00cec9",
    accent: "#55efc4",
    name: "Ocean Love",
  },
  {
    primary: "#fdcb6e",
    secondary: "#e17055",
    accent: "#ffeaa7",
    name: "Sunset Bliss",
  },
  {
    primary: "#e056fd",
    secondary: "#9c27b0",
    accent: "#f06bff",
    name: "Purple Heart",
  },
];

const FONTS = [
  { name: "Classic", value: "'Georgia', serif" },
  { name: "Romantic", value: "'Dancing Script', cursive" },
  { name: "Modern", value: "'Poppins', sans-serif" },
  { name: "Elegant", value: "'Playfair Display', serif" },
];

// --- Encryption Utilities ---
const CIPHER_KEY = "LOVELETTERKEY2024";

function customEncrypt(text: string): string {
  const encoded = btoa(encodeURIComponent(text));
  let result = "";
  for (let i = 0; i < encoded.length; i++) {
    const charCode = encoded.charCodeAt(i);
    const keyChar = CIPHER_KEY.charCodeAt(i % CIPHER_KEY.length);
    result += String.fromCharCode(charCode ^ keyChar);
  }
  return btoa(result).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function customDecrypt(encrypted: string): string {
  try {
    encrypted = encrypted.replace(/-/g, "+").replace(/_/g, "/");
    while (encrypted.length % 4) encrypted += "=";
    const decoded = atob(encrypted);
    let result = "";
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i);
      const keyChar = CIPHER_KEY.charCodeAt(i % CIPHER_KEY.length);
      result += String.fromCharCode(charCode ^ keyChar);
    }
    return decodeURIComponent(atob(result));
  } catch {
    return "";
  }
}

// --- Components ---

const FloatingHearts = ({ theme }: { theme: Theme }) => {
  return (
    <div className="floating-hearts-container">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${15 + i * 2}s`,
          }}
        >
          <Heart
            size={20 + (i % 3) * 10}
            fill={i % 2 === 0 ? theme.primary : theme.secondary}
            color={i % 2 === 0 ? theme.primary : theme.secondary}
            opacity={0.6}
          />
        </div>
      ))}
    </div>
  );
};

const ProgressSteps = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  const steps = [
    { icon: Type, label: "Details" },
    { icon: MessageSquare, label: "Message" },
    { icon: Palette, label: "Design" },
    { icon: Send, label: "Share" },
  ];

  return (
    <div className="progress-steps">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={index} className="step-item">
            <div
              className={`step-circle ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
            >
              {isCompleted ? <Check size={16} /> : <Icon size={16} />}
            </div>
            <span className="step-label">{step.label}</span>
            {index < steps.length - 1 && (
              <div className={`step-line ${isCompleted ? "completed" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

const EnvelopeReveal = ({
  theme,
  name1,
  name2,
  bigTitle,
  onOpen,
}: {
  theme: Theme;
  name1: string;
  name2: string;
  bigTitle: string;
  onOpen: () => void;
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(onOpen, 800);
  };

  return (
    <div className="envelope-reveal-container">
      <div
        className={`envelope ${isOpening ? "opening" : ""}`}
        onClick={handleClick}
      >
        {/* Envelope Flap */}
        <div
          className="envelope-flap"
          style={{
            borderBottomColor: theme.primary,
            background: `linear-gradient(180deg, ${theme.primary}08, ${theme.primary}12)`,
          }}
        >
          <div className="wax-seal" style={{ background: theme.primary }}>
            <Heart size={20} fill="white" color="white" />
          </div>
        </div>

        {/* Envelope Body */}
        <div className="envelope-body">
          {/* Elegant Header */}
          {/* <div className="envelope-from-to">
            <span style={{ color: theme.primary }}>{name1}</span>
            <Heart
              size={14}
              fill={theme.primary}
              color={theme.primary}
              opacity={0.6}
            />
            <span style={{ color: theme.primary }}>{name2}</span>
          </div> */}

          {/* Main Title */}
          <div className="envelope-content">
            <div
              className="title-ornament"
              style={{ background: theme.primary }}
            />
            <h3
              className="envelope-title"
              style={{ color: theme.text || "#2d2d2d" }}
            >
              {bigTitle}
            </h3>
            <div
              className="title-ornament"
              style={{ background: theme.primary }}
            />
          </div>

          {/* Subtle Hint */}
          <div className="tap-hint">
            <span style={{ color: theme.primary }}>A Piece of My Heart..!</span>
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div
          className="corner-ornament top-left"
          style={{ borderColor: theme.primary }}
        />
        <div
          className="corner-ornament top-right"
          style={{ borderColor: theme.primary }}
        />
        <div
          className="corner-ornament bottom-left"
          style={{ borderColor: theme.primary }}
        />
        <div
          className="corner-ornament bottom-right"
          style={{ borderColor: theme.primary }}
        />
      </div>
    </div>
  );
};

const CelebrationView = ({
  theme,
  name1,
  name2,
}: {
  theme: Theme;
  name1: string;
  name2: string;
}) => {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: [theme.primary, theme.secondary, theme.accent],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: [theme.primary, theme.secondary, theme.accent],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [theme]);

  return (
    <div className="celebration-view">
      <div className="celebration-card">
        <div
          className="celebration-icon"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          }}
        >
          <Heart size={48} fill="white" color="white" />
        </div>
        <h1 className="celebration-title">
          Today, My Heart Found Where It Truly Belongs 💍
        </h1>
        <div className="celebration-names">
          <span>{name1}</span>
          <Heart size={20} fill={theme.primary} color={theme.primary} />
          <span>{name2}</span>
        </div>
        <p className="celebration-subtitle">
          This is the beginning of your beautiful forever...
        </p>
        <div className="celebration-quote">
          "In all the world, there is no heart for me like yours.
          <br />
          In all the world, there is no love for you like mine."
          <span className="quote-author">— Maya Angelou</span>
        </div>
        <button
          className="celebration-btn"
          onClick={() => window.location.reload()}
          style={{
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
          }}
        >
          <Sparkles size={18} />
          Create Your Own Love Letter
        </button>
      </div>
    </div>
  );
};

// --- Main Application ---
export default function ValentineApp() {
  const [step, setStep] = useState(0);
  const [bigTitle, setBigTitle] = useState("Will You Be Mine?");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState<Theme>(THEMES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[1]);

  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const noBtnRef = useRef<HTMLButtonElement>(null);
  const totalSteps = 4;

  useEffect(() => {
    setIsClient(true);
    const params = new URLSearchParams(window.location.search);
    const encrypted = params.get("d");

    if (encrypted) {
      try {
        const decrypted = customDecrypt(encrypted);
        const data: ProposalData = JSON.parse(decrypted);

        setBigTitle(data.bigTitle || "Will You Be Mine?");
        setName1(data.n1 || "");
        setName2(data.n2 || "");
        setMessage(data.msg || "");
        if (data.p && data.s && data.a) {
          setTheme({
            primary: data.p,
            secondary: data.s,
            accent: data.a,
            name: "Custom",
          });
        }
        setStep(99);
      } catch (error) {
        console.error("Failed to decrypt link");
      }
    }
  }, []);

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleCreateLink = () => {
    const data: ProposalData = {
      bigTitle,
      n1: name1,
      n2: name2,
      msg: message,
      p: theme.primary,
      s: theme.secondary,
      a: theme.accent,
      font: selectedFont.value,
    };

    const encrypted = customEncrypt(JSON.stringify(data));
    const url = `${window.location.origin}${window.location.pathname}?d=${encrypted}`;

    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isClient) {
    return (
      <div className="loading-screen">
        <Heart
          size={48}
          className="pulse-heart"
          style={{ color: THEMES[0].primary }}
        />
        <span>Loading your love letter...</span>
      </div>
    );
  }

  // Landing Page
  if (step === 0) {
    return (
      <div className="app-wrapper">
        <FloatingHearts theme={theme} />

        <div className="landing-page">
          <div className="hero-section">
            <div className="hero-icon">
              <Heart
                size={64}
                fill={theme.primary}
                color={theme.primary}
                className="hero-heart"
              />
            </div>

            <h1 className="hero-title">
              <span
                className="gradient-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                }}
              >
                A Letter I Couldn’t Keep Inside
              </span>
            </h1>

            <p className="hero-subtitle">
              Create a beautiful, personalized proposal that will make their
              heart skip a beat
            </p>

            <button
              className="cta-button"
              onClick={nextStep}
              style={{
                background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
              }}
            >
              Start Creating Magic
              <ArrowRight size={20} />
            </button>
            <br />

            <button className="dev-trigger" onClick={() => setShowPopup(true)}>
              Developer's Note
              <Heart size={14} fill="currentColor" />
            </button>
            {showPopup && (
              <div
                className="popup-overlay"
                onClick={() => setShowPopup(false)}
              >
                <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="popup-close"
                    onClick={() => setShowPopup(false)}
                  >
                    <X size={20} />
                  </button>

                  <h3>Hey there 👋</h3>

                  <p className="dev-signature">
                    I am Sunil V
                    <a
                      href="https://instagram.com/sivasunil_v"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="instagram-link"
                    >
                      <Instagram size={16} />
                    </a>
                  </p>

                  <p>I was bored, so I created this.</p>

                  <p>
                    This runs entirely in your browser. No servers, no
                    databases, no sneaky data collection. Your letters are
                    encrypted in the URL{" "}
                  </p>
                  <p>
                    {" "}
                    I literally <em>can not</em> see them. and no AI can break
                    my algorithm used in the link , the link is important
                  </p>

                  <p>
                    Code is open source because secrets are for magicians, not
                    developers.
                  </p>

                  <a
                    href="https://github.com/Sivasunil03/Proposal-Site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popup-link"
                  >
                    <Github size={18} />
                    Check the code on GitHub
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Names & Title
  if (step === 1) {
    return (
      <div className="app-wrapper">
        <FloatingHearts theme={theme} />

        <div className="form-page">
          <ProgressSteps currentStep={0} totalSteps={totalSteps} />

          <div className="form-card">
            <div
              className="card-icon"
              style={{ background: `${theme.primary}20` }}
            >
              <Type size={28} style={{ color: theme.primary }} />
            </div>

            <h2 className="card-title">Let's Start With The Basics</h2>
            <p className="card-subtitle">Tell us who this love letter is for</p>

            <div className="form-content">
              <div className="input-group featured">
                <label className="input-label">
                  <Sparkles size={16} />
                  The Big Question
                </label>
                <input
                  type="text"
                  value={bigTitle}
                  onChange={(e) => setBigTitle(e.target.value)}
                  placeholder="Will You Marry Me?"
                  className="input-field large"
                  style={{ borderColor: bigTitle ? theme.primary : undefined }}
                />
                <span className="input-hint">
                  This will be the main headline
                </span>
              </div>

              <div className="divider">
                <span>From</span>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label className="input-label">
                    <User size={16} />
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Alex"
                    className="input-field"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <Heart size={16} />
                    Their Name
                  </label>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Jordan"
                    className="input-field"
                  />
                </div>
              </div>

              {showPreview && (
                <div
                  className="preview-box"
                  style={{ borderColor: theme.primary }}
                >
                  <h3 style={{ color: theme.primary }}>{bigTitle}</h3>
                  <p>
                    From <strong>{name1 || "You"}</strong> to{" "}
                    <strong>{name2 || "Them"}</strong>
                  </p>
                </div>
              )}

              <button
                className="preview-toggle"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye size={16} />
                {showPreview ? "Hide" : "Show"} Preview
              </button>
            </div>

            <div className="card-actions">
              <button className="btn-secondary" onClick={prevStep}>
                Back
              </button>
              <button
                className="btn-primary"
                onClick={nextStep}
                disabled={!name1 || !name2 || !bigTitle}
                style={{
                  background:
                    name1 && name2 && bigTitle
                      ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                      : undefined,
                }}
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Message
  if (step === 2) {
    return (
      <div className="app-wrapper">
        <FloatingHearts theme={theme} />

        <div className="form-page">
          <ProgressSteps currentStep={1} totalSteps={totalSteps} />

          <div className="form-card">
            <div
              className="card-icon"
              style={{ background: `${theme.primary}20` }}
            >
              <MessageSquare size={28} style={{ color: theme.primary }} />
            </div>

            <h2 className="card-title">Your Heartfelt Message</h2>
            <p className="card-subtitle">
              Express your feelings in your own words
            </p>

            <div className="form-content">
              <div className="input-group">
                <label className="input-label">Personal Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="From the moment I met you, I knew you were special. Every day with you is a blessing..."
                  className="textarea-field"
                  rows={6}
                  maxLength={500}
                />
                <div className="char-counter">
                  <span>{message.length}</span> / 500
                </div>
              </div>

              <div className="quick-suggestions">
                <span className="suggestions-label">Need inspiration?</span>
                <div className="suggestion-chips">
                  {[
                    "You complete me",
                    "Every moment with you is magical",
                    "I can't imagine life without you",
                  ].map((phrase) => (
                    <button
                      key={phrase}
                      className="chip"
                      onClick={() =>
                        setMessage((prev) =>
                          prev ? prev + " " + phrase : phrase,
                        )
                      }
                    >
                      + {phrase}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn-secondary" onClick={prevStep}>
                Back
              </button>
              <button
                className="btn-primary"
                onClick={nextStep}
                disabled={!message}
                style={{
                  background: message
                    ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                    : undefined,
                }}
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Theme & Style
  if (step === 3) {
    return (
      <div className="app-wrapper">
        <FloatingHearts theme={theme} />

        <div className="form-page">
          <ProgressSteps currentStep={2} totalSteps={totalSteps} />

          <div className="form-card wide">
            <div
              className="card-icon"
              style={{ background: `${theme.primary}20` }}
            >
              <Palette size={28} style={{ color: theme.primary }} />
            </div>

            <h2 className="card-title">Choose Your Style</h2>
            <p className="card-subtitle">
              Pick colors and fonts that feel right
            </p>

            <div className="form-content">
              <div className="style-section">
                <h3 className="section-heading">Color Theme</h3>
                <div className="theme-grid">
                  {THEMES.map((t) => (
                    <button
                      key={t.name}
                      className={`theme-option ${theme.name === t.name ? "selected" : ""}`}
                      onClick={() => setTheme(t)}
                    >
                      <div
                        className="theme-swatch"
                        style={{
                          background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                        }}
                      >
                        {theme.name === t.name && (
                          <Check size={20} color="white" />
                        )}
                      </div>
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="style-section">
                <h3 className="section-heading">Font Style</h3>
                <div className="font-grid">
                  {FONTS.map((font) => (
                    <button
                      key={font.name}
                      className={`font-option ${selectedFont.name === font.name ? "selected" : ""}`}
                      onClick={() => setSelectedFont(font)}
                      style={{ fontFamily: font.value }}
                    >
                      {font.name}
                      {selectedFont.name === font.name && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="btn-secondary" onClick={prevStep}>
                Back
              </button>
              <button
                className="btn-primary"
                onClick={nextStep}
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                }}
              >
                Continue
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 4: Review & Share
  if (step === 4) {
    return (
      <div className="app-wrapper">
        <FloatingHearts theme={theme} />

        <div className="form-page">
          <ProgressSteps currentStep={3} totalSteps={totalSteps} />

          <div className="form-card">
            <div
              className="card-icon success"
              style={{ background: `${theme.primary}20` }}
            >
              <Check size={28} style={{ color: theme.primary }} />
            </div>

            <h2 className="card-title">You're All Set!</h2>
            <p className="card-subtitle">Review and share your love letter</p>

            <div className="review-summary">
              <div
                className="summary-header"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}15, ${theme.secondary}15)`,
                }}
              >
                <Heart size={24} fill={theme.primary} color={theme.primary} />
                <h3>{bigTitle}</h3>
              </div>

              <div className="summary-content">
                <div className="summary-row">
                  <span className="label">From</span>
                  <span className="value">{name1}</span>
                </div>
                <div className="summary-row">
                  <span className="label">To</span>
                  <span className="value">{name2}</span>
                </div>
                <div className="summary-row message">
                  <span className="label">Message</span>
                  <span className="value">
                    "{message.substring(0, 80)}
                    {message.length > 80 ? "..." : ""}"
                  </span>
                </div>
                <div className="summary-row">
                  <span className="label">Theme</span>
                  <div className="theme-badge">
                    <div
                      className="badge-swatch"
                      style={{
                        background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                      }}
                    />
                    <span>{theme.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {!copied ? (
              <button
                className="share-button"
                onClick={handleCreateLink}
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                }}
              >
                <Lock size={20} />
                Generate Secure Link
                <Sparkles size={20} />
              </button>
            ) : (
              <div className="success-state">
                <div
                  className="success-icon"
                  style={{ background: `${theme.primary}20` }}
                >
                  <Check size={32} style={{ color: theme.primary }} />
                </div>
                <h3>Link Copied!</h3>
                <p>Send it to {name2} and wait for the magic 💌</p>
              </div>
            )}

            <div className="card-actions">
              <button className="btn-secondary" onClick={prevStep}>
                Edit
              </button>
              <button
                className="btn-text"
                onClick={() => window.location.reload()}
              >
                <RefreshCcw size={16} />
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 99: Proposal View
  if (step === 99) {
    if (answered) {
      return <CelebrationView theme={theme} name1={name1} name2={name2} />;
    }

    if (!envelopeOpen) {
      return (
        <div className="app-wrapper">
          <FloatingHearts theme={theme} />
          <EnvelopeReveal
            theme={theme}
            name1={name1}
            name2={name2}
            bigTitle={bigTitle}
            onOpen={() => setEnvelopeOpen(true)}
          />
        </div>
      );
    }

    return (
      <div className="app-wrapper">
        <FloatingHearts theme={theme} />
        <LetterCard
          theme={theme}
          name1={name1}
          name2={name2}
          message={message}
          bigTitle={bigTitle}
          font={selectedFont.value}
          onYes={() => setAnswered(true)}
          onNoHover={() => {}}
          noBtnRef={noBtnRef}
        />
      </div>
    );
  }

  return null;
}
