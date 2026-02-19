import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RestaurantRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    owner_name: "",
    restaurant_name: "",
    place: "",
    email: "",
    password: "",
    fssai_number: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Registration successful");
      navigate("/restaurant/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div style={page}>
      <div style={glassCard}>
        <h2 style={title}>Restaurant Registration 🍽️</h2>

        <form onSubmit={handleRegister} style={formStyle}>
          <input
            style={input}
            placeholder="Owner Name"
            name="owner_name"
            onChange={handleChange}
            required
          />

          <input
            style={input}
            placeholder="Restaurant Name"
            name="restaurant_name"
            onChange={handleChange}
            required
          />

          <input
            style={input}
            placeholder="Place / Location"
            name="place"
            onChange={handleChange}
            required
          />

          <input
            style={input}
            placeholder="Email Address"
            name="email"
            type="email"
            onChange={handleChange}
            required
          />

          <input
            style={input}
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            required
          />

          <input
            style={input}
            placeholder="FSSAI Number"
            name="fssai_number"
            onChange={handleChange}
          />

          <button style={button}>Register</button>
        </form>

        <div style={links}>
          <span>Already have an account?</span>

          <span
            style={link}
            onClick={() => navigate("/restaurant/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================
   SAME STYLES AS LOGIN
========================= */

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  paddingTop: 130,
};

const glassCard = {
  width: 460,
  padding: 40,
  borderRadius: 20,
  background: "rgba(255,255,255,0.25)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
  border: "1px solid rgba(255,255,255,0.3)",
};

const title = {
  textAlign: "center",
  fontSize: 28,
  marginBottom: 25,
  color: "#111",
  fontWeight: "700",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const input = {
  padding: "14px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 16,
};

const button = {
  marginTop: 12,
  padding: "14px",
  borderRadius: 8,
  border: "none",
  background: "linear-gradient(135deg,#1f7a4c,#2ecc71)",
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
};

const links = {
  display: "flex",
  justifyContent: "center",
  marginTop: 18,
  fontSize: 14,
  color: "#333",
  gap: 8,
};

const link = {
  cursor: "pointer",
  textDecoration: "underline",
  fontWeight: "bold",
};
