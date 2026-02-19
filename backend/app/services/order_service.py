from app.db.database import SessionLocal
from app.db.models import Order


def create_order(
    customer_id: int,
    restaurant_id: int,
    surplus_id: int,
    quantity: int,
    total_price: float
):

    db = SessionLocal()

    order = Order(
        customer_id=customer_id,
        restaurant_id=restaurant_id,
        surplus_id=surplus_id,
        quantity=quantity,
        total_price=total_price
    )

    db.add(order)
    db.commit()
    db.refresh(order)

    return order


def get_customer_orders(customer_id: int):

    db = SessionLocal()

    return db.query(Order).filter(
        Order.customer_id == customer_id
    ).all()
