import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();

  /* ======================================================
     🧠 AUTO-REDIRECT FOR REPEAT USERS
  ====================================================== */

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    if (user.role === "customer") {
      navigate("/restaurants");
    } else if (user.role === "restaurant") {
      navigate("/restaurant/dashboard");
    }
  }
}, [navigate]);
useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    if (user.role === "restaurant") {
      navigate("/restaurant/dashboard");
    } else {
      navigate("/restaurants");
    }
  }
}, []);



  /* ====================================================== */

  return (
    <div style={page}>
      <div style={glassPanel}>
        <h1 style={logo}>🌙 FreshLoop</h1>

        <p style={tagline}>
          Save food. Save money. Eat smart at night.
        </p>

        <p style={sub}>
          Discover surplus food from nearby restaurants at huge discounts
          between 11 PM — 3 AM.
        </p>

        {/* 🔥 GLOW CTA */}
        <div style={orbWrapper}>
          <button
            style={orbButton}
            onClick={() => navigate("/entry")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================
   PREMIUM STYLES
========================= */

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "radial-gradient(circle at center, #1a1035 0%, #06040d 70%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
};

/* Glass panel */
const glassPanel = {
  textAlign: "center",
  padding: "80px 60px",
  borderRadius: 28,
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.15)",
  boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
  maxWidth: 700,
};

/* Logo */
const logo = {
  fontSize: "3.5rem",
  fontWeight: "700",
  marginBottom: 10,
};

/* Tagline */
const tagline = {
  fontSize: "1.4rem",
  fontWeight: 500,
  marginBottom: 10,
};

/* Sub text */
const sub = {
  opacity: 0.8,
  maxWidth: 520,
  margin: "0 auto 40px",
};

/* ===== GLOW ORB ===== */

const orbWrapper = {
  position: "relative",
  display: "inline-block",
};

/* Animated glowing orb */
const orbButton = {
  width: 180,
  height: 180,
  borderRadius: "50%",
  border: "none",
  fontSize: 18,
  fontWeight: "bold",
  color: "black",
  cursor: "pointer",
  background:
    "radial-gradient(circle, #00ff88 0%, #00cc66 60%, #00994d 100%)",
  boxShadow:
    "0 0 40px #00ff88, 0 0 80px rgba(0,255,136,0.6)",
  transition: "transform 0.2s ease",
};
