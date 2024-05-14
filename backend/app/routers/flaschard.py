from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session 
from .. import models

from .. import schemas
from ..database import get_db

router = APIRouter(
    prefix="/sets",
    tags=['Flashcards']
)

@router.get("/{id}/flashcards", response_model=List[schemas.Flashcard])
def get_flashcards(id: int, db: Session = Depends(get_db)):

    flashcards = db.query(models.Flashcard).filter(models.Flashcard.flashcard_set_id == id).all()

    return flashcards
