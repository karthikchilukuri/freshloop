import { useNavigate } from "react-router-dom";

export default function RestaurantDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));


  return (
    <div style={page}>
      <div style={container}>
        <h1 style={title}>Restaurant Owner Dashboard</h1>

        {/* Top Actions */}
        <div style={topRow}>
          <button
            style={addButton}
            onClick={() => navigate("/restaurant/add-surplus")}
          >
            ➕ Add New Deal
          </button>

          <span style={tutorial}>
            ⓘ Tutorial: Create Deals
          </span>
        </div>

        {/* Main Glass Panel */}
        <div style={panel}>
          <div style={activeCard}>
            <h3 style={cardTitle}>Active Deals</h3>

            <p style={emptyText}>
              No active surplus deals yet
            </p>

            <div style={icon}>🍽️</div>
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
  background:
    "radial-gradient(circle at center, #0c0c0f 0%, #050308 70%)",
  color: "white",
  padding: "40px",
};

const container = {
  maxWidth: 1100,
  margin: "0 auto",
};

const title = {
  fontSize: "2rem",
  marginBottom: 25,
};

/* Top row */
const topRow = {
  display: "flex",
  alignItems: "center",
  gap: 20,
  marginBottom: 20,
};

/* Add button */
const addButton = {
  padding: "12px 20px",
  borderRadius: 10,
  border: "none",
  background: "#00ff88",
  color: "black",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 0 18px rgba(0,255,136,0.6)",
};

/* Tutorial text */
const tutorial = {
  opacity: 0.7,
};

/* Big glass panel */
const panel = {
  padding: 40,
  borderRadius: 20,
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(0,255,136,0.4)",
  boxShadow:
    "0 0 40px rgba(0,255,136,0.15), 0 20px 60px rgba(0,0,0,0.7)",
};

/* Active deals card */
const activeCard = {
  width: 260,
  padding: 24,
  borderRadius: 16,
  background: "rgba(0,0,0,0.6)",
  border: "2px solid #00ff88",
  boxShadow: "0 0 18px rgba(0,255,136,0.4)",
};

const cardTitle = {
  marginBottom: 10,
};

const emptyText = {
  opacity: 0.7,
};

const icon = {
  fontSize: 40,
  marginTop: 20,
  textAlign: "center",
};
