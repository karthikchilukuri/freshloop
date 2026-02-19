import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/customer/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            user_type: "student",
            student_id: "TEMP",
            college_name: "TEMP",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.detail || "Registration failed ❌");
        return;
      }

      alert("Account created 🎉");
      navigate("/login");

    } catch (err) {
      alert("Server error ❌");
      console.error(err);
    }
  };

  return (
    <div style={box}>
      <h2>Create Account</h2>

      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button style={btn}>Register</button>
      </form>
    </div>
  );
}

const box = {
  padding: 40,
  maxWidth: 400,
  margin: "auto",
};

const btn = {
  padding: 12,
  background: "#00ff88",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};
