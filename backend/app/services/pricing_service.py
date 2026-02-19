def calculate_discount(original_price: float, expires_in_minutes: int):
    """
    FreshLoop dynamic pricing
    10% → 50% based on urgency
    """

    if expires_in_minutes > 120:
        discount_percentage = 0.10  # 10%
    elif expires_in_minutes > 90:
        discount_percentage = 0.20  # 20%
    elif expires_in_minutes > 60:
        discount_percentage = 0.30  # 30%
    elif expires_in_minutes > 30:
        discount_percentage = 0.40  # 40%
    else:
        discount_percentage = 0.50  # 50%

    discount_price = original_price * (1 - discount_percentage)

    return {
        "discount_percentage": int(discount_percentage * 100),
        "discount_price": round(discount_price, 2)
    }
from datetime import datetime, time
import pytz

IST = pytz.timezone("Asia/Kolkata")


def calculate_discount():
    now = datetime.now(IST).time()

    start = time(23, 0)   # 11 PM
    end = time(3, 0)      # 3 AM

    # Handle midnight crossing
    if now >= start:
        minutes_passed = (now.hour - 23) * 60 + now.minute
    else:
        minutes_passed = (now.hour + 1) * 60 + now.minute  # after midnight

    total_minutes = 4 * 60  # 240 minutes

    progress = max(0, min(minutes_passed / total_minutes, 1))

    discount = 10 + progress * 40  # 10% → 50%

    return round(discount)
