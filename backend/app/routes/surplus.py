from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import datetime, time
import pytz
from math import radians, cos, sin, sqrt, atan2

from app.db.deps import get_db
from app.db.models import Surplus, Restaurant
from app.services.jwt_service import decode_access_token
from app.models.surplus_schema import SurplusCreate

router = APIRouter(tags=["Surplus"])
security = HTTPBearer()

IST = pytz.timezone("Asia/Kolkata")

# --------------------------------------------------
# 🌍 DISTANCE FUNCTION
# --------------------------------------------------
def distance_km(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))

    return R * c


# --------------------------------------------------
# 🌙 MARKET TIME (11 PM — 3 AM)
# --------------------------------------------------
def is_market_open():
    now = datetime.now(IST).time()
    return now >= time(23, 0) or now <= time(3, 0)


# --------------------------------------------------
# 💰 DYNAMIC DISCOUNT (10% → 50%)
# --------------------------------------------------
def calculate_discount():
    now = datetime.now(IST).time()
    start = time(23, 0)
    total_minutes = 4 * 60  # 240 minutes

    if now >= start:
        minutes_passed = (now.hour - 23) * 60 + now.minute
    else:
        minutes_passed = (now.hour + 1) * 60 + now.minute

    progress = max(0, min(minutes_passed / total_minutes, 1))
    discount = 10 + progress * 40  # 10 → 50%

    return round(discount)


# --------------------------------------------------
# ➕ CREATE SURPLUS ITEM (Restaurant side)
# --------------------------------------------------
@router.post("/surplus")
def create_surplus_item(
    data: SurplusCreate,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials
    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    restaurant = db.query(Restaurant).filter(
        Restaurant.email == payload.get("sub")
    ).first()

    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    surplus = Surplus(
        restaurant_id=restaurant.id,
        item=data.item,
        original_price=data.original_price,
        expires_in_minutes=data.expires_in_minutes
    )

    db.add(surplus)
    db.commit()
    db.refresh(surplus)

    return {"message": "Item added", "id": surplus.id}


# --------------------------------------------------
# 🌍 PUBLIC MARKETPLACE
# --------------------------------------------------
@router.get("/surplus/public")
def list_public_surplus(db: Session = Depends(get_db)):

    if not is_market_open():
        return {"message": "Marketplace opens at 11 PM"}

    items = (
        db.query(Surplus)
        .join(Restaurant)
        .filter(Restaurant.is_verified == True)
        .all()
    )

    result = []

    for i in items:

        # ⏰ Expired items auto-hidden
        if i.expires_in_minutes <= 0:
            continue

        discount = calculate_discount()
        discount_price = round(i.original_price * (1 - discount / 100))

        result.append({
            "id": i.id,
            "restaurant": i.restaurant.name,
            "verified": i.restaurant.is_verified,
            "fssai": i.restaurant.fssai_number,
            "item": i.item,
            "original_price": i.original_price,
            "discount_percentage": discount,
            "discount_price": discount_price,
            "expires_in_minutes": i.expires_in_minutes
        })

    return result


# --------------------------------------------------
# 📍 NEARBY SURPLUS
# --------------------------------------------------
@router.get("/surplus/nearby")
def nearby_surplus(lat: float, lon: float, db: Session = Depends(get_db)):

    items = db.query(Surplus).join(Restaurant).all()
    result = []

    for i in items:

        if i.expires_in_minutes <= 0:
            continue

        dist = distance_km(
            lat, lon,
            i.restaurant.latitude,
            i.restaurant.longitude
        )

        if dist <= i.restaurant.delivery_radius_km:

            discount = calculate_discount()
            price = round(i.original_price * (1 - discount / 100))

            result.append({
                "id": i.id,
                "restaurant": i.restaurant.name,
                "distance_km": round(dist, 2),
                "item": i.item,
                "discount_price": price
            })

    return result

