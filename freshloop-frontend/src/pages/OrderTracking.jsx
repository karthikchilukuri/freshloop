export default function OrderTracking() {
  return (
    <div style={page}>
      {/* HEADER */}
      <div style={header}>
        <h2>Preparing your order 🍔</h2>
        <p>36 mins • On time</p>
      </div>

      {/* MAP AREA */}
      <div style={map}>
        <p style={{ opacity: 0.7 }}>Live tracking map</p>
      </div>

      {/* DETAILS */}
      <div style={details}>
        <h3>Indiana Burgers</h3>
        <p>Your order is being prepared</p>

        <div style={statusBar}></div>

        <p style={{ marginTop: 15 }}>
          We’ve asked the restaurant not to send cutlery
        </p>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#0b0b0b",
  color: "white",
};

const header = {
  background: "#1fa64b",
  padding: 20,
  textAlign: "center",
};

const map = {
  height: 300,
  background: "#333",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const details = {
  padding: 20,
};

const statusBar = {
  marginTop: 10,
  height: 8,
  background: "#00ff88",
  borderRadius: 6,
};
