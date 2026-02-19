from fastapi import Depends, HTTPException, status
from jose import jwt
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.db.models import Restaurant

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"


def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()


def get_current_restaurant(token: str, db: Session = Depends(get_db)):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    restaurant = db.query(Restaurant).filter(
        Restaurant.email == email
    ).first()

    if not restaurant:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Restaurant not found"
        )

    return restaurant
