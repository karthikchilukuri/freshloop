import { useNavigate } from "react-router-dom";

export default function EntryPage() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>
          Welcome to FreshLoop 🌙
        </h1>

        <p style={subtitle}>Select your role</p>

        <div style={roles}>
          {/* Restaurant Owner */}
          <div
            style={roleCard}
            onClick={() => navigate("/restaurant/register")}
          >
            <div style={icon}>🏪</div>

            <h3 style={roleTitle}>Restaurant Owner</h3>

            <p style={desc}>
              Manage inventory & deals
            </p>
          </div>

          {/* Customer */}
          <div
            style={roleCard}
            onClick={() => navigate("/customer/type")}
          >
            <div style={icon}>👤</div>

            <h3 style={roleTitle}>Customer</h3>

            <p style={desc}>
              Discover food & savings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   ELITE STYLES
========================= */

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "radial-gradient(circle at center, #1a1035 0%, #050308 70%)",
  color: "white",
};

/* Main glass container */
const card = {
  padding: "60px 70px",
  borderRadius: 26,
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(0,255,136,0.35)",
  boxShadow:
    "0 0 40px rgba(0,255,136,0.2), 0 20px 60px rgba(0,0,0,0.7)",
  textAlign: "center",
};

/* Title */
const title = {
  fontSize: "2.5rem",
  marginBottom: 8,
};

/* Subtitle */
const subtitle = {
  opacity: 0.75,
  marginBottom: 35,
};

/* Role container */
const roles = {
  display: "flex",
  gap: 28,
  justifyContent: "center",
};

/* Role card */
const roleCard = {
  width: 240,
  padding: "26px 20px",
  borderRadius: 18,
  background: "rgba(0,0,0,0.6)",
  border: "2px solid #00ff88",
  cursor: "pointer",
  transition: "0.25s",
  boxShadow: "0 0 20px rgba(0,255,136,0.3)",
};

/* Icon */
const icon = {
  fontSize: 40,
  marginBottom: 12,
};

/* Role title */
const roleTitle = {
  fontSize: "1.2rem",
  marginBottom: 6,
};

/* Description */
const desc = {
  opacity: 0.7,
  fontSize: 14,
};
