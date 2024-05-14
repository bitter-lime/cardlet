from typing import Optional, List
from pydantic import BaseModel, EmailStr
from datetime import datetime 

class UserBase(BaseModel):
    email: EmailStr 
    password: str 

class UserCreate(UserBase):
    username: str

class UserOut(BaseModel):
    id: int 
    username: str 
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True 

class UserUpdate(BaseModel):
    username: str 

class Login(BaseModel):
    email: EmailStr 
    password: str 

class FlashcardBase(BaseModel):
    question: str 
    answer: str 
    is_starred: Optional[bool] = False 

class FlashcardCreate(FlashcardBase):
    pass 

class Flashcard(FlashcardBase): 
    class Config: 
        from_attributes = True

class FlashcardSetBase(BaseModel):
    title: str 
    description: Optional[str] = ""
    flashcards: List[FlashcardBase]

class FlashcardSetCreate(FlashcardSetBase):
    is_public: Optional[bool] = True 
    pass 

class FlashcardSet(FlashcardSetBase):
    id: int 
    created_at: datetime

    class Config: 
        from_attributes = True

class Token(BaseModel):
    access_token: str 
    token_type: str 

class TokenData(BaseModel):
    id: Optional[str] = None 