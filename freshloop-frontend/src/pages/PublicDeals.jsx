import { useNavigate } from "react-router-dom";

/* ========= ORIGINAL PRICES ========= */

const PRICES = {
  "Vegetable Biryani": 200,
  "Panner Biryani": 230,
  "Kaju Biriyani": 250,
  "Raitha": 50,
  "Panner curry": 180,
  "Chicken biryani": 250,
  "Mutton biryani": 300,
  "Chicken curry": 200,
  "Panner butter masala": 200,
  "Chiti nayadu chicken biryani": 280,
  "Dum Biryani": 249,
  "Mutton masala curry": 250,
  "Chicken leg piece biriyani": 250,
  "Boti curry": 280,
  "Masala gravy": 100,
};

/* ========= RESTAURANT DATA ========= */

const RESTAURANTS = [
  ["Vegetable Biryani","Panner Biryani","Kaju Biriyani","Raitha","Panner curry"],
  ["Chicken biryani","Mutton biryani","Chicken curry","Panner Biryani","Panner butter masala"],
  ["Chiti nayadu chicken biryani","Dum Biryani","Raitha","Panner curry","Mutton masala curry"],
  ["Chicken leg piece biriyani","Boti curry","Panner Biryani","Raitha","Masala gravy"],
  ["Chicken biryani","Mutton biryani","Chicken curry","Panner Biryani","Panner butter masala"],
  ["Vegetable Biryani","Panner Biryani","Kaju Biriyani","Raitha","Panner curry"],
  ["Chicken biryani","Mutton biryani","Chicken curry","Panner Biryani","Panner butter masala"],
  ["Chiti nayadu chicken biryani","Dum Biryani","Raitha","Panner curry","Mutton masala curry"],
  ["Chicken leg piece biriyani","Boti curry","Panner Biryani","Raitha","Masala gravy"],
  ["Chicken biryani","Mutton biryani","Chicken curry","Panner Biryani","Panner butter masala"],
  ["Vegetable Biryani","Panner Biryani","Kaju Biriyani","Raitha","Panner curry"],
  ["Chicken biryani","Mutton biryani","Chicken curry","Panner Biryani","Panner butter masala"],
  ["Chiti nayadu chicken biryani","Dum Biryani","Raitha","Panner curry","Mutton masala curry"],
  ["Chicken leg piece biriyani","Boti curry","Panner Biryani","Raitha","Masala gravy"],
  ["Chicken biryani","Mutton biryani","Chicken curry","Panner Biryani","Panner butter masala"],
  ["Vegetable Biryani","Panner Biryani","Kaju Biriyani","Raitha","Panner curry"],
  ["Chicken biryani","Mutton biryani","Chicken curry","Panner Biryani","Panner butter masala"],
  ["Chiti nayadu chicken biryani","Dum Biryani","Raitha","Panner curry","Mutton masala curry"],
  ["Chicken leg piece biriyani","Boti curry","Panner Biryani","Raitha","Masala gravy"],
  ["Chicken biryani","Mutton biryani","Chicken curry","Panner Biryani","Panner butter masala"],
];

/* ========= IMAGE MAP ========= */

const getImage = (name) => {
  const n = name.toLowerCase();

  if (n.includes("vegetable")) return "/foods/veg-biryani.jpg";
  if (n.includes("paneer butter")) return "/foods/paneer-butter-masala.jpg";
  if (n.includes("paneer curry")) return "/foods/paneer-curry.jpg";
  if (n.includes("paneer biryani")) return "/foods/paneer-biryani.jpg";
  if (n.includes("kaju")) return "/foods/kaju-biryani.jpg";
  if (n.includes("mutton masala")) return "/foods/mutton-masala.jpg";
  if (n.includes("mutton biryani")) return "/foods/mutton-biryani.jpg";
  if (n.includes("chicken leg")) return "/foods/leg-piece-biryani.jpg";
  if (n.includes("chitti")) return "/foods/chitti-nayudu-biryani.jpg";
  if (n.includes("dum")) return "/foods/dum-biryani.jpg";
  if (n.includes("boti")) return "/foods/boti-curry.jpg";
  if (n.includes("masala gravy")) return "/foods/masala-gravy.jpg";
  if (n.includes("raitha")) return "/foods/raitha.jpg";
  if (n.includes("chicken curry")) return "/foods/chicken-curry.jpg";

  return "/foods/chicken-biryani.jpg";
};

/* ========= ALWAYS-ACTIVE DISCOUNT ========= */
/* NO TIME RESTRICTION */

const getDiscount = () => {
  const now = new Date();

  const totalSeconds =
    now.getMinutes() * 60 + now.getSeconds();

  // Smooth dynamic discount 10% → 50%
  const progress = totalSeconds / 3600;

  const discount = 10 + progress * 40;

  return Math.round(discount);
};

export default function PublicDeals() {
  const navigate = useNavigate();

  const addToCart = (item) => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    navigate("/checkout");
  };

  const discount = getDiscount();

  return (
    <div style={page}>
      <h1>🌙 FreshLoop Deals</h1>

      {RESTAURANTS.map((menu, idx) => (
        <div key={idx} style={restaurantBox}>
          <h2>🏪 Restaurant {idx + 1}</h2>

          <div style={grid}>
            {menu.map((name, i) => {
              const price = PRICES[name];

              const discountPrice = Math.round(
                price * (1 - discount / 100)
              );

              return (
                <div key={i} style={card}>
                  <img
                    src={getImage(name)}
                    alt={name}
                    style={img}
                  />

                  <h3>{name}</h3>

                  <p>
                    <span style={old}>₹{price}</span>
                    <span style={newP}>
                      {" "}
                      ₹{discountPrice}
                    </span>
                  </p>

                  <p style={discountText}>
                    {discount}% OFF
                  </p>

                  <button
                    style={btn}
                    onClick={() =>
                      addToCart({
                        item: name,
                        original_price: price,
                        discount_price: discountPrice,
                        restaurant: `Restaurant ${idx + 1}`,
                      })
                    }
                  >
                    Add Item
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========= STYLES ========= */

const page = {
  paddingTop: 130,   // ⭐ ADD THIS
  background: "#0b0b0b",
  color: "white",
  padding: 60,
};


const restaurantBox = { marginBottom: 40 };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 16,
};

const card = {
  background: "#1a1a1a",
  padding: 12,
  borderRadius: 12,
  textAlign: "center",
};

const img = {
  width: "100%",
  height: 140,
  objectFit: "cover",
  borderRadius: 10,
};

const old = {
  textDecoration: "line-through",
  opacity: 0.6,
};

const newP = {
  color: "#00ff88",
  fontWeight: "bold",
};

const discountText = {
  color: "#00ff88",
  fontWeight: "bold",
  marginTop: 4,
};

const btn = {
  marginTop: 8,
  padding: 10,
  width: "100%",
  background: "#00ff88",
  border: "none",
  borderRadius: 8,
  fontWeight: "bold",
};
