import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RestaurantLogin() {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Invalid credentials");
        return;
      }

      /* ✅ SAVE TOKEN */
      localStorage.setItem("token", data.access_token);

      /* ✅ SAVE RESTAURANT SESSION USER */

      const userData = {
        role: "restaurant",
        type: null,
        name: data.restaurant_name || "Restaurant",
        email: form.email,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      /* ✅ REDIRECT */
      navigate("/restaurant/dashboard");

    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={glassCard}>
        <h2 style={title}>Restaurant Login 👨‍🍳</h2>

        <form onSubmit={handleLogin} style={formStyle}>
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

          <button style={button} disabled={loading}>
            {loading ? "Logging in..." : "LOG IN"}
          </button>
        </form>

        <div style={links}>
          <span style={link}>Forgot Password?</span>

          <span
            style={link}
            onClick={() => navigate("/restaurant/register")}
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================
   STYLES
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
};

const glassCard = {
  width: 420,
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
  gap: 16,
};

const input = {
  padding: "14px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 16,
};

const button = {
  marginTop: 10,
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
  justifyContent: "space-between",
  marginTop: 18,
  fontSize: 14,
  color: "#333",
};

const link = {
  cursor: "pointer",
  textDecoration: "underline",
};
