import { useNavigate } from "react-router-dom";
import SupportChat from "./SupportChat";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={nav}>
      {/* Logo */}
      <h2 style={logo} onClick={() => navigate("/")}>
        🌙 FreshLoop
      </h2>

      {/* RIGHT SIDE */}
      <div style={right}>

        {/* Profile button */}
        {user && (
          <button style={profileBtn}>
            👤 {user.name}
          </button>
        )}

        {/* ⭐ CHAT — ONLY FOR CUSTOMERS */}
        {user?.role === "customer" && <SupportChat />}

      </div>
    </div>
  );
}


/* ===== STYLES ===== */

const nav = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 60,
  background: "#0b0b0b",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
  zIndex: 999,
  borderBottom: "1px solid #222",
};

const logo = {
  fontWeight: "bold",
  fontSize: 18,
  cursor: "pointer",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: 10,
};

const profileBtn = {
  padding: "8px 16px",
  background: "#00ff88",
  border: "none",
  borderRadius: 10,
  fontWeight: "bold",
  cursor: "pointer",
};
