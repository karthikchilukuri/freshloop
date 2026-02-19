import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  /* ===== QUANTITY ===== */
  const changeQty = (index, delta) => {
    const updated = [...cart];
    updated[index].qty = Math.max(
      1,
      (updated[index].qty || 1) + delta
    );

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  /* ===== REMOVE ===== */
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  /* ===== BILL ===== */
  const subtotal = cart.reduce(
    (sum, i) =>
      sum + i.discount_price * (i.qty || 1),
    0
  );

  const tax = Math.round(subtotal * 0.05);
  const delivery = 30;
  const nightFee = 15;
  const total = subtotal + tax + delivery + nightFee;

  const placeOrder = () => navigate("/payment");

  return (
    <div style={page}>
      <div style={bgPattern}></div>

      <div style={card}>
        {/* HEADER */}
        <div style={header}>
          🧾 <h1 style={{ margin: 0 }}>Checkout</h1>
        </div>

        {/* ITEMS */}
        {cart.map((i, idx) => (
          <div key={idx} style={itemRow}>
            <span style={itemName}>{i.item}</span>

            {/* QTY */}
            <div style={qtyBox}>
              <button
                style={qtyBtn}
                onClick={() => changeQty(idx, -1)}
              >
                −
              </button>

              <span>{i.qty || 1}</span>

              <button
                style={qtyBtn}
                onClick={() => changeQty(idx, 1)}
              >
                +
              </button>
            </div>

            <span>₹{i.discount_price}</span>

            <button
              style={removeBtn}
              onClick={() => removeItem(idx)}
            >
              ✕
            </button>
          </div>
        ))}

        <hr style={divider} />

        {/* BILLING */}
        <div style={billRow}>
          Billing Summary <span>₹{subtotal}</span>
        </div>

        <div style={billRow}>
          Taxes <span>₹{tax}</span>
        </div>

        <div style={billRow}>
          Delivery Fee <span>₹{delivery}</span>
        </div>

        <div style={billRow}>
          Night Fee <span>₹{nightFee}</span>
        </div>

        <hr style={divider} />

        <h2 style={totalText}>Total: ₹{total}</h2>

        <p style={help}>Need Help?</p>

        {/* BUTTON */}
        <button style={orderBtn} onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "radial-gradient(circle at center,#04130f 0%,#010201 70%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  paddingtop:120
};

/* Circuit background */
const bgPattern = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(rgba(0,255,136,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.07) 1px, transparent 1px)",
  backgroundSize: "60px 60px",
  opacity: 0.25,
};

/* Card */
const card = {
  width: 500,
  padding: 30,
  borderRadius: 22,
  background: "rgba(0,0,0,0.85)",
  backdropFilter: "blur(16px)",
  border: "2px solid #00ff88",
  boxShadow:
    "0 0 45px rgba(0,255,136,0.6), 0 25px 80px rgba(0,0,0,0.9)",
  zIndex: 1,
};

/* Header */
const header = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 20,
};

/* Item row */
const itemRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#0e0e0e",
  padding: 12,
  borderRadius: 12,
  marginBottom: 10,
};

const itemName = { flex: 1 };

/* Quantity */
const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "#1a1a1a",
  padding: "6px 10px",
  borderRadius: 10,
};

const qtyBtn = {
  background: "#333",
  border: "none",
  color: "white",
  padding: "2px 8px",
  borderRadius: 6,
  cursor: "pointer",
};

/* Remove */
const removeBtn = {
  background: "#ff2b2b",
  border: "none",
  color: "white",
  borderRadius: 8,
  padding: "4px 10px",
  cursor: "pointer",
};

/* Billing */
const billRow = {
  display: "flex",
  justifyContent: "space-between",
  margin: "6px 0",
};

const divider = {
  borderColor: "#00ff88",
  opacity: 0.3,
};

const totalText = {
  marginTop: 10,
};

/* Help */
const help = {
  opacity: 0.7,
  fontSize: 14,
  marginBottom: 10,
};

/* Button */
const orderBtn = {
  width: "100%",
  padding: 16,
  borderRadius: 14,
  border: "none",
  fontSize: 18,
  fontWeight: "bold",
  background:
    "linear-gradient(135deg,#00ff88,#00cc66)",
  color: "black",
  cursor: "pointer",
  boxShadow: "0 0 25px rgba(0,255,136,0.8)",
};
