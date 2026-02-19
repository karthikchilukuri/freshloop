import { useNavigate } from "react-router-dom";

export default function CustomerProfile() {
  const navigate = useNavigate();

  // ✅ SAFE USER LOAD (NO CRASH)
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>👤 My Profile</h1>

        <div style={info}>
          <Row label="Name" value={user.name || "Guest"} />
          <Row label="Mobile" value={user.mobile || "-"} />
          <Row label="Role" value={user.role || "Customer"} />
        </div>

        <button style={btn} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={row}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}

/* STYLES */

const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0b0b0b",
  color: "white",
};

const card = {
  background: "#111",
  padding: 40,
  borderRadius: 16,
  width: 400,
  boxShadow: "0 0 30px rgba(0,255,136,0.2)",
};

const title = { textAlign: "center", marginBottom: 20 };

const info = { marginBottom: 20 };

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
};

const btn = {
  width: "100%",
  padding: 14,
  background: "#00ff88",
  border: "none",
  borderRadius: 10,
  fontWeight: "bold",
  cursor: "pointer",
};
