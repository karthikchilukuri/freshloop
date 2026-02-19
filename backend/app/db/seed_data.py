from app.db.database import SessionLocal
from app.db.models import Restaurant, Surplus
from passlib.context import CryptContext
import random

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

db = SessionLocal()

def hash_password(password):
    return pwd_context.hash(password)

# ---------- YOUR MENU ----------
menu = [
    "Vegetable Biryani",
    "Paneer Biryani",
    "Kaju Biryani",
    "Raitha",
    "Paneer Curry",
    "Chicken Biryani",
    "Mutton Biryani",
    "Chicken Curry",
    "Paneer Butter Masala",
    "Chitti Nayudu Chicken Biryani",
    "Dum Biryani",
    "Mutton Masala Curry",
    "Chicken Leg Piece Biryani",
    "Boti Curry",
    "Masala Gravy"
]

restaurants = []

# ---------- CREATE RESTAURANTS ----------
for i in range(1, 21):

    r = Restaurant(
        name=f"Restaurant {i}",
        email=f"rest{i}@freshloop.com",
        hashed_password=hash_password("test123"),
        city="Hyderabad",
        latitude=17.3850 + random.random() / 100,
        longitude=78.4867 + random.random() / 100,
        delivery_radius_km=5,
        serving_model="batch",
        fssai_number=f"FSSAI{i:05}",
        is_verified=True
    )

    db.add(r)
    restaurants.append(r)

db.commit()

# ---------- ADD REAL MENU ITEMS ----------
for r in restaurants:
    selected = random.sample(menu, 5)

    for dish in selected:
        price = random.randint(80, 250)
        discount = random.randint(40, 70)

        item = Surplus(
            restaurant_id=r.id,
            item=dish,  # ✅ REAL NAME
            original_price=price,
            expires_in_minutes=random.choice([30, 45, 60]),
            discount_percentage=discount,
            discount_price=price * (100 - discount) / 100
        )

        db.add(item)

db.commit()

print("✅ Real menu data inserted!")

