from passlib.context import CryptContext
from app.db.database import SessionLocal
from app.db.models import Restaurant

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# -------------------------
# DB SESSION
# -------------------------

def get_db():
    return SessionLocal()


# -------------------------
# PASSWORD UTILITIES
# -------------------------

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# -------------------------
# REGISTER RESTAURANT
# -------------------------

def create_restaurant(
    owner_name: str,
    restaurant_name: str,
    place: str,
    email: str,
    password: str,
    fssai_number: str
) -> bool:

    db = get_db()

    existing = db.query(Restaurant).filter(
        Restaurant.email == email
    ).first()

    if existing:
        db.close()
        return False

    restaurant = Restaurant(
        owner_name=owner_name,
        name=restaurant_name,
        place=place,
        email=email,
        hashed_password=hash_password(password),
        fssai_number=fssai_number,
        is_verified=True   # verified for demo
    )

    db.add(restaurant)
    db.commit()
    db.close()

    return True


# -------------------------
# LOGIN RESTAURANT
# -------------------------

def authenticate_restaurant(email: str, password: str) -> bool:

    db = get_db()

    restaurant = db.query(Restaurant).filter(
        Restaurant.email == email
    ).first()

    if not restaurant:
        db.close()
        return False

    valid = verify_password(password, restaurant.hashed_password)

    db.close()

    return valid
