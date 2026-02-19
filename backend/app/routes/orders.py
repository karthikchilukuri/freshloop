from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.services.jwt_service import decode_access_token
from app.services.order_service import create_order, get_customer_orders

router = APIRouter(tags=["Orders"])

security = HTTPBearer()


# -------------------------------
# PLACE ORDER
# -------------------------------
@router.post("/orders")
def place_order(
    surplus_id: int,
    restaurant_id: int,
    quantity: int,
    total_price: float,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    payload = decode_access_token(credentials.credentials)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    customer_id = payload.get("sub")

    order = create_order(
        customer_id,
        restaurant_id,
        surplus_id,
        quantity,
        total_price
    )

    return {
        "message": "Order placed successfully",
        "order_id": order.id,
        "status": order.status
    }


# -------------------------------
# MY ORDERS
# -------------------------------
@router.get("/orders/my")
def my_orders(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    payload = decode_access_token(credentials.credentials)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    customer_id = payload.get("sub")

    orders = get_customer_orders(customer_id)

    return [
        {
            "id": o.id,
            "surplus_id": o.surplus_id,
            "quantity": o.quantity,
            "total_price": o.total_price,
            "status": o.status
        }
        for o in orders
    ]

