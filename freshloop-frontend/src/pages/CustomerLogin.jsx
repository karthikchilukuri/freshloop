import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerLogin() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

const handleOTP = () => {
  if (mobile.length !== 10) {
    alert("Enter valid mobile number");
    return;
  }

  // Save mobile
  localStorage.setItem("mobile", mobile);

  // ✅ SAVE FULL USER OBJECT HERE
  const userData = {
    role: "customer",
    name: localStorage.getItem("name") || "Guest",
    mobile: mobile
  };

  localStorage.setItem("user", JSON.stringify(userData));

  // Go to OTP page
  navigate("/otp");
};




  return (
    <div style={page}>
      {/* Background pattern */}
      <div style={bgPattern}></div>

      <div style={card}>
        <h1 style={title}>
          Login to <span style={brand}>FreshLoop</span> 🌙
        </h1>

        <div style={inputWrap}>
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={input}
            maxLength={10}
          />
          <span style={lock}>🔒</span>
        </div>

        <button style={button} onClick={handleOTP}>
          Send OTP
        </button>

        <p style={help}>Need Help?</p>
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
    "radial-gradient(circle at center, #04130f 0%, #010201 70%)",
  position: "relative",
  overflow: "hidden",
  color: "white",
};

const bgPattern = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(rgba(0,255,136,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.07) 1px, transparent 1px)",
  backgroundSize: "60px 60px",
  opacity: 0.25,
};

const card = {
  width: 420,
  padding: 40,
  borderRadius: 22,
  background: "rgba(0,0,0,0.85)",
  backdropFilter: "blur(16px)",
  boxShadow:
    "0 0 45px rgba(0,255,136,0.35), 0 25px 80px rgba(0,0,0,0.9)",
  border: "1px solid rgba(0,255,136,0.35)",
  textAlign: "center",
  position: "relative",
  zIndex: 1,
};

const title = { marginBottom: 25, fontWeight: 700 };

const brand = {
  color: "#00ff88",
  textShadow: "0 0 12px #00ff88",
};

const inputWrap = {
  position: "relative",
  marginBottom: 20,
  borderRadius: 12,
  border: "2px solid #00ff88",
  boxShadow: "0 0 18px rgba(0,255,136,0.6)",
};

const input = {
  width: "100%",
  padding: "16px 45px 16px 16px",
  borderRadius: 12,
  border: "none",
  outline: "none",
  fontSize: 16,
  background: "rgba(255,255,255,0.9)",
};

const lock = {
  position: "absolute",
  right: 14,
  top: "50%",
  transform: "translateY(-50%)",
  opacity: 0.6,
};

const button = {
  width: "100%",
  padding: "16px",
  borderRadius: 14,
  border: "none",
  fontSize: 17,
  fontWeight: "bold",
  cursor: "pointer",
  background: "linear-gradient(135deg, #00ff88, #00cc66)",
  color: "black",
  boxShadow:
    "0 0 25px rgba(0,255,136,0.8), inset 0 -3px 0 rgba(0,0,0,0.2)",
};

const help = {
  marginTop: 18,
  opacity: 0.7,
  fontSize: 14,
  cursor: "pointer",
};
