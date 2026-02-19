# Simple in-memory restaurant credentials (MVP)
RESTAURANTS = {
    "greenbowl": "password123",
    "urbantiffins": "tiffins123"
}

def authenticate_restaurant(username: str, password: str) -> bool:
    if username in RESTAURANTS and RESTAURANTS[username] == password:
        return True
    return False
