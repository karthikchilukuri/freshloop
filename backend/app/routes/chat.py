from fastapi import APIRouter

# Create router object
router = APIRouter()


# ==============================
# POST /chat
# ==============================

@router.post("/chat")
def chat(message: dict):
    text = message.get("message", "").lower()

    # Simple smart replies

    if "order" in text:
        return {"reply": "Your order is being prepared 🍽️"}

    elif "delivery" in text:
        return {"reply": "Delivery usually takes 20–30 minutes 🚚"}

    elif "refund" in text:
        return {"reply": "Refunds are processed within 24 hours 💰"}

    elif "hi" in text or "hello" in text:
        return {"reply": "Hello 👋 Welcome to FreshLoop Support"}

    else:
        return {"reply": "FreshLoop Support here 💬 How can I help?"}
