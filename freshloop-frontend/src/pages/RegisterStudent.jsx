import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    student_id: "",
    college_name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      user_type: "student",
      student_id: form.student_id,
      college_name: form.college_name,
    };

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/customer/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Student registered successfully ✅");

        // 🔥 SAVE DATA FOR LOGIN
        localStorage.setItem("name", form.name);
        localStorage.setItem("userType", "student");

        navigate("/login");
      } else {
        alert(data.detail || "Registration failed ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error — check backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>🎓 Student Registration</h1>
        <p style={subtitle}>Join the community</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <Input placeholder="Full Name" name="name" onChange={handleChange} />

          <Input
            placeholder="E-mail"
            name="email"
            type="email"
            onChange={handleChange}
          />

          {/* PASSWORD AFTER EMAIL */}
          <Input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <Input
            placeholder="Student ID"
            name="student_id"
            onChange={handleChange}
          />

          <Input
            placeholder="College Name"
            name="college_name"
            onChange={handleChange}
          />

          <button style={button} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p style={loginText}>
          Already have an account?{" "}
          <span style={loginLink} onClick={() => navigate("/login")}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

function Input({ placeholder, name, type = "text", onChange }) {
  return (
    <div style={inputWrap}>
      <input
        style={input}
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
        required
      />
    </div>
  );
}

/* ===== STYLES ===== */

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "radial-gradient(circle at center, #08120f 0%, #030504 70%)",
  color: "white",
};

const card = {
  width: 420,
  padding: 40,
  borderRadius: 22,
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(18px)",
  border: "2px solid #00ff88",
  boxShadow:
    "0 0 35px rgba(0,255,136,0.25), 0 20px 60px rgba(0,0,0,0.8)",
};

const title = { textAlign: "center", marginBottom: 6 };
const subtitle = { textAlign: "center", opacity: 0.7, marginBottom: 25 };

const formStyle = { display: "flex", flexDirection: "column", gap: 14 };

const inputWrap = {
  borderRadius: 10,
  border: "2px solid #00ff88",
  boxShadow: "0 0 12px rgba(0,255,136,0.4)",
};

const input = {
  width: "100%",
  padding: "14px",
  border: "none",
  outline: "none",
  background: "transparent",
  color: "white",
  fontSize: 16,
};

const button = {
  marginTop: 10,
  padding: "14px",
  borderRadius: 10,
  border: "none",
  background: "linear-gradient(135deg,#00ff88,#00cc66)",
  color: "black",
  fontWeight: "bold",
  fontSize: 17,
  cursor: "pointer",
  boxShadow: "0 0 20px rgba(0,255,136,0.6)",
};

const loginText = { textAlign: "center", marginTop: 20, opacity: 0.8 };

const loginLink = {
  color: "#00ff88",
  cursor: "pointer",
  textDecoration: "underline",
};
