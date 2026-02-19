import { useNavigate } from "react-router-dom";

export default function CustomerType() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Choose Customer Type</h1>

        <div style={options}>
          {/* Student */}
          <div
            style={option}
            onClick={() => navigate("/register/student")}
          >
            🎓 Student
          </div>

          {/* Employee */}
          <div
            style={option}
            onClick={() => navigate("/register/employee")}
          >
            💼 Employee
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== styles ===== */

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#050308",
  color: "white",
};

const card = {
  padding: 50,
  borderRadius: 20,
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(16px)",
  border: "1px solid #00ff88",
  textAlign: "center",
};

const title = {
  marginBottom: 30,
};

const options = {
  display: "flex",
  gap: 30,
};

const option = {
  padding: "20px 30px",
  borderRadius: 12,
  border: "2px solid #00ff88",
  cursor: "pointer",
  fontSize: "1.2rem",
};
