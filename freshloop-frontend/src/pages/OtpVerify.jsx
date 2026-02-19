import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move forward
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move back on delete
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const verifyOTP = () => {
    const code = otp.join("");

    if (code.length !== 6) {
      alert("Enter complete OTP");
      return;
    }

    alert("OTP Verified ✅");

    // Example next step
    navigate("/address");
  };

  const resendOTP = () => {
    alert("OTP resent");
  };

  return (
    <div style={page}>
      {/* Circuit background */}
      <div style={bgPattern}></div>

      <div style={card}>
        <h1 style={title}>
          🔒 Verify OTP
        </h1>

        {/* OTP INPUT BOXES */}
        <div style={otpContainer}>
          {otp.map((digit, i) => (
            <input
              key={i}
              type="text"
              value={digit}
              maxLength={1}
              onChange={(e) =>
                handleChange(e.target.value, i)
              }
              onKeyDown={(e) =>
                handleKeyDown(e, i)
              }
              ref={(el) => (inputs.current[i] = el)}
              style={otpBox}
            />
          ))}
        </div>

        {/* RESEND */}
        <p style={resend} onClick={resendOTP}>
          Resend OTP
        </p>

        {/* VERIFY BUTTON */}
        <button style={button} onClick={verifyOTP}>
          Verify OTP
        </button>

        <p style={help}>Need Help?</p>
      </div>
    </div>
  );
}

/* =========================
   PREMIUM STYLES
========================= */

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

/* Circuit pattern */
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

const title = {
  marginBottom: 25,
  fontWeight: 700,
};

/* OTP boxes container */
const otpContainer = {
  display: "flex",
  justifyContent: "center",
  gap: 10,
  marginBottom: 10,
  padding: 10,
  borderRadius: 12,
  border: "2px solid #00ff88",
  boxShadow: "0 0 18px rgba(0,255,136,0.6)",
};

/* Individual OTP box */
const otpBox = {
  width: 45,
  height: 55,
  fontSize: 24,
  textAlign: "center",
  borderRadius: 8,
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.9)",
};

/* Resend link */
const resend = {
  marginBottom: 18,
  opacity: 0.7,
  cursor: "pointer",
  textDecoration: "underline",
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
