from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, surplus, customers, restaurants,orders
from app.routes import customer_auth
from app.db.database import Base, engine
from app.routes import payment
from app.routes import chat






# ---------- CREATE DATABASE TABLES ----------
Base.metadata.create_all(bind=engine)


# ---------- APP ----------
app = FastAPI(title="FreshLoop API")


# ---------- CORS (Frontend connection) ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React/Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- ROUTERS ----------
app.include_router(auth.router)
app.include_router(surplus.router)
app.include_router(customers.router)
app.include_router(restaurants.router)
app.include_router(orders.router)
app.include_router(customer_auth.router)
app.include_router(payment.router)
app.include_router(chat.router)





# ---------- ROOT ----------
@app.get("/")
def root():
    return {"message": "FreshLoop backend is running"}
