from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
restaurant = relationship("Restaurant")

from .database import Base


from sqlalchemy import Column, Integer, String, Boolean
from app.db.database import Base


class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)

    owner_name = Column(String, nullable=False)

    name = Column(String, nullable=False)  # Restaurant Name

    place = Column(String, nullable=False)  # Location

    email = Column(String, unique=True, index=True, nullable=False)

    hashed_password = Column(String, nullable=False)

    fssai_number = Column(String, nullable=False)

    is_verified = Column(Boolean, default=True)



class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    #  USER TYPE
    user_type = Column(String)  # "student" or "employee"

    #  STUDENT FIELDS
    student_id = Column(String, nullable=True)
    college_name = Column(String, nullable=True)

    #  EMPLOYEE FIELDS
    employee_id = Column(String, nullable=True)
    company_name = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)



from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base


class Surplus(Base):
    __tablename__ = "surplus_items"

    id = Column(Integer, primary_key=True, index=True)

    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))

    item = Column(String, nullable=False)

    original_price = Column(Float, nullable=False)

    expires_in_minutes = Column(Integer, nullable=False)

    restaurant = relationship("Restaurant")




class Promotion(Base):
    __tablename__ = "promotions"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)

    discount_percent = Column(Integer)
    max_discount = Column(Float)

    first_order_only = Column(Boolean, default=False)

    valid_from = Column(DateTime)
    valid_to = Column(DateTime)
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(Integer, ForeignKey("customers.id"))
    restaurant_id = Column(Integer, ForeignKey("restaurants.id"))
    surplus_id = Column(Integer, ForeignKey("surplus_items.id"))

    quantity = Column(Integer, default=1)
    total_price = Column(Float)

    status = Column(String, default="PLACED")
    # PLACED → ACCEPTED → PREPARING → OUT_FOR_DELIVERY → DELIVERED → CANCELLED

    created_at = Column(DateTime, default=datetime.utcnow)

from sqlalchemy import Float, ForeignKey
from sqlalchemy.orm import relationship


