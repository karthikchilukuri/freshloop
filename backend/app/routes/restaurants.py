from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from math import radians, cos, sin, asin, sqrt
from datetime import datetime
import pytz

from app.db.database import SessionLocal
from app.db.models import Restaurant, Surplus

router = APIRouter(prefix="/restaurants", tags=["Restaurants"])


# ---------- MARKET TIME CHECK ----------
def is_market_open():
    return True

    


# ---------- HAVERSINE DISTANCE ----------
def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    return 6371 * c


# ---------- DB dependency ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================================================
# ✅ STEP 7 — LIST VERIFIED RESTAURANTS (Marketplace View)
# =========================================================
@router.get("/")
def list_restaurants(db: Session = Depends(get_db)):

    if not is_market_open():
        return {"message": "Marketplace opens at 9 PM"}

    restaurants = db.query(Restaurant).filter(
        Restaurant.is_verified == True
    ).all()

    return [
        {
            "id": r.id,
            "name": r.name,
            "city": r.city,
            "serving_model": r.serving_model,
            "verified": r.is_verified,
            "fssai": r.fssai_number
        }
        for r in restaurants
    ]


# =========================================================
# ✅ STEP 6 — NEARBY RESTAURANTS (Geographic Logic)
# =========================================================
@router.get("/nearby")
def get_nearby_restaurants(
    lat: float = Query(...),
    lon: float = Query(...),
    db: Session = Depends(get_db)
):

    if not is_market_open():
        return {"message": "Marketplace opens at 9 PM"}

    restaurants = db.query(Restaurant).filter(
        Restaurant.is_verified == True
    ).all()

    nearby = []

    for r in restaurants:
        distance = haversine(lat, lon, r.latitude, r.longitude)

        if distance <= r.delivery_radius_km:
            nearby.append({
                "id": r.id,
                "name": r.name,
                "city": r.city,
                "distance_km": round(distance, 2),
                "delivery_radius_km": r.delivery_radius_km,
                "verified": r.is_verified,
                "fssai": r.fssai_number
            })

    return sorted(nearby, key=lambda x: x["distance_km"])


# =========================================================
# ✅ STEP 8 — SHOW ITEMS OF SELECTED RESTAURANT
# =========================================================
@router.get("/{restaurant_id}/surplus")
def get_restaurant_surplus(
    restaurant_id: int,
    db: Session = Depends(get_db)
):

    if not is_market_open():
        return {"message": "Marketplace opens at 9 PM"}

    restaurant = db.query(Restaurant).filter(
        Restaurant.id == restaurant_id,
        Restaurant.is_verified == True
    ).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    items = db.query(Surplus).filter(
        Surplus.restaurant_id == restaurant_id
    ).all()

    return {
        "restaurant": restaurant.name,
        "verified": restaurant.is_verified,
        "fssai": restaurant.fssai_number,
        "items": [
            {
                "id": i.id,
                "item": i.item,
                "original_price": i.original_price,
                "discount_price": i.discount_price,
                "expires_in_minutes": i.expires_in_minutes
            }
            for i in items
        ]
    }

