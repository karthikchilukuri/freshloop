export default function Cart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  return (
    <div style={{ padding: 30 }}>
      <h1>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((i, idx) => (
          <div key={idx}>
            {i.item} — ₹{i.price}
          </div>
        ))
      )}
    </div>
  );
}
