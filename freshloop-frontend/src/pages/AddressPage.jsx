import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddressPage() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     GET CURRENT LOCATION
  ========================= */

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocoding using OpenStreetMap (free)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const data = await res.json();

          setAddress(data.display_name || "Location found");
        } catch {
          setAddress(`${latitude}, ${longitude}`);
        }

        setLoading(false);
      },
      () => {
        alert("Location permission denied");
        setLoading(false);
      }
    );
  };

  /* =========================
     CONTINUE
  ========================= */

  const handleContinue = () => {
    if (!address.trim()) {
      alert("Enter your delivery address");
      return;
    }

    localStorage.setItem("address", address);
    navigate("/restaurants");
  };

  return (
    <div style={page}>
      <div style={bgPattern}></div>

      <div style={card}>
        <h1 style={title}>📍 Delivery Address</h1>

        {/* CURRENT LOCATION BUTTON */}
        <button style={locationBtn} onClick={getLocation}>
          {loading ? "Detecting location..." : "📍 Use Current Location"}
        </button>

        <div style={inputWrap}>
          <textarea
            placeholder="Enter your complete delivery address, including street, building and landmark"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={input}
          />
        </div>

        <button style={button} onClick={handleContinue}>
          Continue
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
  marginBottom: 20,
  fontWeight: 700,
};

/* LOCATION BUTTON */
const locationBtn = {
  width: "100%",
  padding: "12px",
  marginBottom: 18,
  borderRadius: 12,
  border: "1px solid #00ff88",
  background: "rgba(0,255,136,0.12)",
  color: "#00ff88",
  fontWeight: "bold",
  cursor: "pointer",
};

/* Neon input */
const inputWrap = {
  borderRadius: 12,
  border: "2px solid #00ff88",
  boxShadow: "0 0 18px rgba(0,255,136,0.6)",
  marginBottom: 20,
};

const input = {
  width: "100%",
  minHeight: 90,
  padding: 16,
  borderRadius: 12,
  border: "none",
  outline: "none",
  fontSize: 15,
  background: "rgba(255,255,255,0.9)",
  resize: "none",
};

/* Continue button */
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
