import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <div style={card}>
        <h2>💳 Choose Payment</h2>

        <button style={btn} onClick={() => window.open("https://pay.google.com")}>
          Pay Online (UPI)
        </button>

        <button style={secondary} onClick={() => navigate("/tracking")}>
          Cash on Delivery
        </button>
      </div>
    </div>
  );
}

const page = { minHeight: "100vh", background: "#0b0b0b", display: "flex", alignItems: "center", justifyContent: "center" };
const card = { background: "#111", padding: 40, borderRadius: 16, width: 340, display: "flex", flexDirection: "column", gap: 14 };
const btn = { padding: 14, background: "#00ff88", border: "none", borderRadius: 10, fontWeight: "bold" };
const secondary = { padding: 14, background: "#1a1a1a", border: "1px solid #444", borderRadius: 10, color: "white" };
