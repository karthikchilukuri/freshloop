from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import razorpay

from app.core.config import (
    RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET
)

router = APIRouter(
    prefix="/payment",
    tags=["Payment"]
)

# Razorpay client
client = razorpay.Client(
    auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
)

# ======================================================
# REQUEST MODEL (IMPORTANT 🔥)
# ======================================================

class OrderRequest(BaseModel):
    amount: int  # in paise


# ======================================================
# TEST ROUTE
# ======================================================

@router.get("/test")
def test_payment():
    return {"message": "Payment route working ✅"}


# ======================================================
# CREATE ORDER API
# ======================================================

@router.post("/create-order")
def create_order(data: OrderRequest):

    try:
        order = client.order.create({
            "amount": data.amount,
            "currency": "INR",
            "payment_capture": 1
        })

        return {
            "order_id": order["id"],
            "amount": order["amount"],
            "key": RAZORPAY_KEY_ID
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
