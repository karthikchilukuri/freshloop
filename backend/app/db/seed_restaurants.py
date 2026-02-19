from app.db.database import SessionLocal
from app.db.models import Restaurant

db = SessionLocal()

restaurants = [

    Restaurant(
        name="Paradise Biryani",
        email="paradise@freshloop.com",
        hashed_password="dummy",
        serving_model="batch",
        is_verified=True,
        city="Hyderabad",
        latitude=17.4399,
        longitude=78.4983,
        delivery_radius_km=8
    ),

    Restaurant(
        name="Bawarchi",
        email="bawarchi@freshloop.com",
        hashed_password="dummy",
        serving_model="batch",
        is_verified=True,
        city="Hyderabad",
        latitude=17.3997,
        longitude=78.4902,
        delivery_radius_km=7
    ),

    Restaurant(
        name="Shah Ghouse",
        email="shahghouse@freshloop.com",
        hashed_password="dummy",
        serving_model="batch",
        is_verified=True,
        city="Hyderabad",
        latitude=17.4056,
        longitude=78.4288,
        delivery_radius_km=6
    ),

    Restaurant(
        name="Kritunga",
        email="kritunga@freshloop.com",
        hashed_password="dummy",
        serving_model="batch",
        is_verified=True,
        city="Hyderabad",
        latitude=17.4483,
        longitude=78.3915,
        delivery_radius_km=6
    ),

    Restaurant(
        name="Street 9 Food Court",
        email="street9@freshloop.com",
        hashed_password="dummy",
        serving_model="batch",
        is_verified=True,
        city="Hyderabad",
        latitude=17.4435,
        longitude=78.3486,
        delivery_radius_km=5
    ),
]

db.add_all(restaurants)
db.commit()

print("Restaurants added successfully")

