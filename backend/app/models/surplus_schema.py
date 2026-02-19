from pydantic import BaseModel, Field

class SurplusCreate(BaseModel):
    restaurant: str | None = None
    item: str
    original_price: float = Field(gt=0)
    expires_in_minutes: int = Field(gt=0)
