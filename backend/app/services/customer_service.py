from passlib.context import CryptContext
from app.db.database import SessionLocal
from app.db.models import Customer

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()


# ---------- PASSWORD ----------
def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


# ---------- REGISTER ----------
def create_customer(data):

    db = get_db()

    existing = db.query(Customer).filter(
        Customer.email == data.email
    ).first()

    if existing:
        return None

    customer = Customer(
        name=data.name,
        email=data.email,
        hashed_password=hash_password(data.password),
        user_type=data.user_type,
        student_id=data.student_id,
        college_name=data.college_name,
        employee_id=data.employee_id,
        company_name=data.company_name
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    return customer


# ---------- LOGIN ----------
def authenticate_customer(email: str, password: str):

    db = get_db()

    customer = db.query(Customer).filter(
        Customer.email == email
    ).first()

    if not customer:
        return None

    if not verify_password(password, customer.hashed_password):
        return None

    return customer
