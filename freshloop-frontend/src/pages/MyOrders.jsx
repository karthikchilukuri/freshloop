import { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/orders/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(o => (
          <div key={o.id} style={card}>
            <h3>Order #{o.id}</h3>
            <p>Status: {o.status}</p>
            <p>Total: ₹{o.total_price}</p>
          </div>
        ))
      )}
    </div>
  );
}

const card = {
  background: "#141414",
  padding: 16,
  borderRadius: 12,
  marginTop: 12,
};
