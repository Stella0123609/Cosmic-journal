from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class JournalEntryBase(BaseModel):
    content: str
    mood: Optional[str] = None
    city: Optional[str] = None

class JournalEntryCreate(JournalEntryBase):
    user_id: int

class JournalEntryResponse(JournalEntryBase):
    id: int
    created_at: datetime
    user_id: int

    class Config:
        orm_mode = True