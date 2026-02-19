import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MobileLogin() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const sendOtp = () => {
    if (mobile.length < 10) return alert("Enter valid number");

    localStorage.setItem("mobile", mobile);
    navigate("/otp");
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2>📱 Login with Mobile</h2>

        <input
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button style={btn} onClick={sendOtp}>
          Send OTP
        </button>
      </div>
    </div>
  );
}

const page = { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0b0b" };
const card = { background: "#111", padding: 40, borderRadius: 16, width: 340, display: "flex", flexDirection: "column", gap: 14 };
const btn = { padding: 14, background: "#00ff88", border: "none", borderRadius: 10, fontWeight: "bold" };
