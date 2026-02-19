import { useNavigate } from "react-router-dom";
import { useState } from "react";

/* ============================================================
   🔥 RAZORPAY SCRIPT LOADER (ADD ABOVE COMPONENT)
============================================================ */

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });

/* ============================================================
   💳 PAYMENT PAGE COMPONENT
============================================================ */

export default function PaymentPage() {
  const navigate = useNavigate();

  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  /* ---------- EMPTY CART SAFETY ---------- */

  if (cart.length === 0) {
    return (
      <div style={page}>
        <div style={card}>
          <h2>Your cart is empty 🛒</h2>
          <button style={btn} onClick={() => navigate("/restaurants")}>
            Browse Deals
          </button>
        </div>
      </div>
    );
  }

  /* ---------- BILL CALC ---------- */

  const subtotal = cart.reduce((sum, i) => sum + i.discount_price, 0);
  const delivery = 30;
  const nightFee = 15;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + nightFee + tax;

  /* ============================================================
     🚀 PLACE ORDER
  ============================================================ */

  const placeOrder = async () => {
    if (!method) {
      alert("Please select payment method");
      return;
    }

    /* ===============================
       💵 CASH ON DELIVERY
    =============================== */

    if (method === "COD") {
      localStorage.setItem(
        "order",
        JSON.stringify({
          items: cart,
          total,
          payment: "COD",
          status: "Preparing",
          time: Date.now(),
        })
      );

      localStorage.removeItem("cart");
      navigate("/tracking");
      return;
    }

    /* ===============================
       💳 ONLINE PAYMENT (RAZORPAY)
    =============================== */

    try {
      setLoading(true);

      // 🔥 1. LOAD RAZORPAY SCRIPT
      const sdkLoaded = await loadRazorpay();

      if (!sdkLoaded) {
        alert("Failed to load payment gateway");
        return;
      }

      // 🔥 2. CREATE ORDER FROM BACKEND
      const res = await fetch(
        "http://127.0.0.1:8000/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total * 100, // rupees → paise
          }),
        }
      );

      const data = await res.json();

      // 🔥 3. CONFIGURE RAZORPAY POPUP

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "FreshLoop",
        description: "Order Payment",
        order_id: data.order_id,

        handler: function (response) {
          // PAYMENT SUCCESS

          localStorage.setItem(
            "order",
            JSON.stringify({
              items: cart,
              total,
              payment: "ONLINE",
              razorpay_payment_id: response.razorpay_payment_id,
              status: "Preparing",
              time: Date.now(),
            })
          );

          localStorage.removeItem("cart");
          navigate("/tracking");
        },

        theme: {
          color: "#00ff88",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================ */

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={{ marginBottom: 20 }}>💳 Payment</h2>

        {/* 🧾 BILL SUMMARY */}

        <div style={bill}>
          <h3>Order Summary</h3>

          <Row label="Subtotal" value={subtotal} />
          <Row label="Delivery Fee" value={delivery} />
          <Row label="Night Fee" value={nightFee} />
          <Row label="Tax (5%)" value={tax} />

          <hr style={{ margin: "15px 0", borderColor: "#333" }} />

          <Row label="Total" value={total} big />
        </div>

        {/* 💰 METHODS */}

        <div style={methods}>
          <h3>Select Payment Method</h3>

          <MethodCard
            title="Cash on Delivery"
            desc="Pay when order arrives"
            selected={method === "COD"}
            onClick={() => setMethod("COD")}
          />

          <MethodCard
            title="Pay Online"
            desc="UPI / Card / NetBanking"
            selected={method === "ONLINE"}
            onClick={() => setMethod("ONLINE")}
          />
        </div>

        {/* 🚀 BUTTON */}

        <button style={btn} onClick={placeOrder} disabled={loading}>
          {loading ? "Processing..." : `Pay ₹${total}`}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   SMALL COMPONENTS
============================================================ */

function Row({ label, value, big }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontWeight: big ? "bold" : "normal",
        fontSize: big ? 18 : 14,
        marginTop: 6,
      }}
    >
      <span>{label}</span>
      <span>₹{value}</span>
    </div>
  );
}

function MethodCard({ title, desc, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: selected ? "#00ff88" : "#1a1a1a",
        color: selected ? "#000" : "#fff",
        padding: 15,
        borderRadius: 12,
        cursor: "pointer",
        marginTop: 10,
        border: selected ? "none" : "1px solid #333",
      }}
    >
      <strong>{title}</strong>
      <p style={{ margin: 0, fontSize: 13 }}>{desc}</p>
    </div>
  );
}

/* ============================================================
   STYLES
============================================================ */

const page = {
 minHeight: "100vh",
display: "flex",
alignItems: "center",
justifyContent: "center",
paddingTop: 80,   // ⭐ IMPORTANT
boxSizing: "border-box",

};

const card = {
  background: "#111",
  padding: 30,
  borderRadius: 16,
  width: 380,
  boxShadow: "0 0 30px rgba(0,255,136,0.15)",
};

const bill = {
  background: "#1a1a1a",
  padding: 15,
  borderRadius: 12,
};

const methods = {
  marginTop: 20,
};

const btn = {
  marginTop: 20,
  width: "100%",
  padding: 16,
  background: "#00ff88",
  border: "none",
  fontWeight: "bold",
  borderRadius: 12,
  fontSize: 16,
  cursor: "pointer",
};
