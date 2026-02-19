import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <div style={card}>
        <h1>✅ Order Placed!</h1>
        <p>Your food is being prepared 🍲</p>

        <button style={btn} onClick={() => navigate("/tracking")}>
          Track Order
        </button>
      </div>
    </div>
  );
}

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
  textAlign: "center",
};

const btn = {
  marginTop: 20,
  padding: 12,
  background: "#00ff88",
  border: "none",
  borderRadius: 10,
};
