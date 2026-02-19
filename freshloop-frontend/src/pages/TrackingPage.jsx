import React, { useEffect, useState } from "react";

export default function TrackingPage() {
  /* ===== DELIVERY STAGES ===== */

  const steps = [
    "Order Placed",
    "Preparing Food",
    "Out for Delivery",
    "Delivered",
  ];

  const [currentStep, setCurrentStep] = useState(1);

  /* ===== SIMULATED LIVE TRACKING ===== */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ===== LOAD ORDER DATA (NOT CART) ===== */

  const order = JSON.parse(localStorage.getItem("order") || "{}");

  const items = order.items || [];
  const total = order.total || 0;
  const paymentMethod = order.payment || "ONLINE";

  /* ===== PAYMENT DISPLAY LOGIC ===== */

  const showTotal =
    paymentMethod === "ONLINE" ||
    currentStep === steps.length;

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>🚚 Track Your Order</h1>

        <p style={eta}>Arriving in ~25 mins</p>

        {/* ===== PROGRESS BAR ===== */}

        <div style={progressWrapper}>
          <div
            style={{
              ...progressFill,
              width: `${(currentStep / steps.length) * 100}%`,
            }}
          />
        </div>

        {/* ===== STEPS ===== */}

        <div style={stepsWrap}>
          {steps.map((step, i) => {
            const active = i + 1 <= currentStep;

            return (
              <div key={i} style={stepItem}>
                <div
                  style={{
                    ...circle,
                    background: active ? "#00ff88" : "#2a2a2a",
                  }}
                >
                  {active ? "✓" : i + 1}
                </div>

                <p
                  style={{
                    ...stepText,
                    color: active ? "#00ff88" : "#aaa",
                  }}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>

        {/* ===== ORDER SUMMARY ===== */}

        <div style={summary}>
          <h2>🧾 Order Summary</h2>

          {items.map((i, idx) => (
            <div key={idx} style={item}>
              <span>{i.item}</span>
              <span>₹{i.discount_price}</span>
            </div>
          ))}

          <hr style={{ opacity: 0.3 }} />

          <h2>
            Total: ₹
            {showTotal
              ? total
              : paymentMethod === "COD"
              ? "Pay on Delivery"
              : 0}
          </h2>
        </div>

        <p style={help}>Need Help?</p>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  paddingTop: 120,
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "radial-gradient(circle at center, #04130f 0%, #010201 70%)",
  color: "white",
};

const card = {
  width: 520,
  padding: 40,
  borderRadius: 22,
  background: "rgba(0,0,0,0.9)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 0 45px rgba(0,255,136,0.35), 0 25px 80px rgba(0,0,0,0.9)",
  border: "1px solid rgba(0,255,136,0.35)",
};

const title = {
  textAlign: "center",
  marginBottom: 10,
};

const eta = {
  textAlign: "center",
  opacity: 0.8,
  marginBottom: 25,
};

const progressWrapper = {
  height: 8,
  background: "#2a2a2a",
  borderRadius: 20,
  overflow: "hidden",
  marginBottom: 30,
};

const progressFill = {
  height: "100%",
  background: "linear-gradient(90deg,#00ff88,#00cc66)",
  transition: "width 0.5s",
};

const stepsWrap = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 30,
};

const stepItem = {
  textAlign: "center",
  width: "25%",
};

const circle = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 8px",
  fontWeight: "bold",
  color: "black",
};

const stepText = {
  fontSize: 13,
};

const summary = {
  background: "#121212",
  padding: 20,
  borderRadius: 14,
  marginTop: 10,
};

const item = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 6,
};

const help = {
  textAlign: "center",
  marginTop: 20,
  opacity: 0.7,
  cursor: "pointer",
};
