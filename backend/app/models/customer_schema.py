from pydantic import BaseModel
from typing import Optional


class CustomerRegister(BaseModel):
    name: str
    email: str
    password: str

    user_type: str  # student / employee

    student_id: Optional[str] = None
    college_name: Optional[str] = None

    employee_id: Optional[str] = None
    company_name: Optional[str] = None


class CustomerLogin(BaseModel):
    email: str
    password: str
