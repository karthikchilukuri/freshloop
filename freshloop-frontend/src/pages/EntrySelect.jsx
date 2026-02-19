import { useNavigate } from "react-router-dom";

export default function EntrySelect() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <div style={card}>
        <h1>Welcome to FreshLoop 🌙</h1>
        <p>Select your role</p>

        {/* RESTAURANT OWNER */}
        <button
          style={btn}
          onClick={() => navigate("/restaurant/register")}
        >
          🏪 Restaurant Owner
        </button>

        {/* CUSTOMER → STUDENT/EMPLOYEE SELECTION */}
        <button
          style={btn}
          onClick={() => navigate("/register/student")}
        >
          👤 Customer
        </button>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const page = {
  minHeight: "100vh",
  background: "#0b0b0b",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const card = {
  background: "#111",
  padding: 40,
  borderRadius: 16,
  textAlign: "center",
  boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
};

const btn = {
  display: "block",
  width: 240,
  margin: "15px auto",
  padding: 14,
  background: "#00ff88",
  border: "none",
  borderRadius: 12,
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: 16,
};
