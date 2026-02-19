from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from app.services.customer_service import (
    create_customer,
    authenticate_customer
)
from app.services.jwt_service import create_access_token


router = APIRouter(
    prefix="/customer",
    tags=["Customer Auth"]
)


# =========================================================
# SCHEMAS
# =========================================================

class CustomerRegister(BaseModel):
    name: str
    email: str
    password: str
    user_type: str

    student_id: str | None = None
    college_name: str | None = None

    employee_id: str | None = None
    company_name: str | None = None


class LoginRequest(BaseModel):
    email: str
    password: str


# =========================================================
# REGISTER CUSTOMER
# =========================================================

@router.post("/register")
def register_customer(data: CustomerRegister):

    customer = create_customer(data)

    return {
        "message": "Customer registered successfully",
        "email": customer.email
    }


# =========================================================
# LOGIN CUSTOMER
# =========================================================

@router.post("/login")
def login_customer(data: LoginRequest):

    customer = authenticate_customer(
        data.email,
        data.password
    )

    token = create_access_token({"sub": customer.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }
