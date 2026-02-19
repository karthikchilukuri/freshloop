from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.db.database import SessionLocal
from app.db.models import Restaurant

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# -------------------------
# REGISTER
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
        return False

    restaurant = Restaurant(
        owner_name=owner_name,
        name=restaurant_name,
        place=place,
        email=email,
        hashed_password=hash_password(password),
        fssai_number=fssai_number,
        is_verified=True
    )

    db.add(restaurant)
    db.commit()

    return True




# -------------------------
# LOGIN
# -------------------------
def authenticate_restaurant(email: str, password: str) -> bool:

    db = get_db()

    restaurant = db.query(Restaurant).filter(
        Restaurant.email == email
    ).first()

    if not restaurant:
        return False

    return verify_password(password, restaurant.hashed_password)
