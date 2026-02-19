from datetime import datetime, time
import pytz

IST = pytz.timezone("Asia/Kolkata")


def calculate_discount():
    now = datetime.now(IST).time()

    start = time(23, 0)   # 11 PM
    total_minutes = 4 * 60  # 4 hours → 240 minutes

    # Minutes passed since 11 PM
    if now >= start:
        minutes_passed = (now.hour - 23) * 60 + now.minute
    else:
        minutes_passed = (now.hour + 1) * 60 + now.minute

    progress = max(0, min(minutes_passed / total_minutes, 1))

    discount = 10 + progress * 40  # 10% → 50%

    return round(discount)


def get_discounted_price(original_price):
    discount = calculate_discount()
    new_price = original_price * (1 - discount / 100)
    return round(new_price), discount
