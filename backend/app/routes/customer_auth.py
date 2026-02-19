from fastapi import APIRouter, HTTPException, status
from app.models.customer_schema import CustomerRegister, CustomerLogin
from app.services.customer_service import (
    create_customer,
    authenticate_customer
)
from app.services.jwt_service import create_access_token

router = APIRouter(
    prefix="/customer",
    tags=["Customer Auth"]
)


# ---------- REGISTER ----------
@router.post("/register")
def register_customer(data: CustomerRegister):

    customer = create_customer(data)

    if not customer:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    return {
        "message": "Customer registered successfully",
        "email": customer.email
    }


# ---------- LOGIN ----------
@router.post("/login")
def login_customer(data: CustomerLogin):

    customer = authenticate_customer(
        data.email,
        data.password
    )

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = create_access_token({"sub": customer.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }
