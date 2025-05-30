from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# User schemas (Derrick)
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

# Journal schemas (Allan)
class JournalCreate(BaseModel):
    content: str
    mood: Optional[str] = None

class JournalUpdate(BaseModel):
    content: Optional[str] = None
    mood: Optional[str] = None

class JournalResponse(BaseModel):
    id: int
    content: str
    mood: Optional[str]
    created_at: datetime
    user_id: int

    class Config:
        from_attributes = True