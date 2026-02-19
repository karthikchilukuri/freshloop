from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from app.services.restaurant_service import (
    create_restaurant,
    authenticate_restaurant
)
from app.services.jwt_service import create_access_token


router = APIRouter(
    prefix="/auth",
    tags=["Restaurant Auth"]
)


# -----------------------------
# Schemas
# -----------------------------

class RestaurantRegister(BaseModel):
    owner_name: str
    restaurant_name: str
    place: str
    email: str
    password: str
    fssai_number: str


class LoginRequest(BaseModel):
    email: str
    password: str


# -----------------------------
# Register restaurant
# -----------------------------

@router.post("/register")
def register_restaurant(data: RestaurantRegister):

    success = create_restaurant(
        owner_name=data.owner_name,
        restaurant_name=data.restaurant_name,
        place=data.place,
        email=data.email,
        password=data.password,
        fssai_number=data.fssai_number
    )

    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Restaurant already exists"
        )

    return {
        "message": "Restaurant registered successfully",
        "email": data.email
    }


# -----------------------------
# Login restaurant
# -----------------------------

@router.post("/login")
def login_restaurant(data: LoginRequest):

    is_valid = authenticate_restaurant(
        data.email,
        data.password
    )

    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = create_access_token({"sub": data.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }
