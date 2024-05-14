from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime 

from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/sets",
    tags=["Flashcard Sets"]
)

@router.get("/", response_model=List[schemas.FlashcardSet])
def get_flashcard_sets(db: Session = Depends(get_db)):
    flashcard_sets = db.query(models.FlashcardSet).all()
    return flashcard_sets 

@router.get("/{id}", response_model=List[schemas.FlashcardSet])
def get_flashcard_set(id: int, db: Session = Depends(get_db)):
    flashcard_set = db.query(models.FlashcardSet).filter(models.FlashcardSet.id == id).first()

    if not flashcard_set: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Flashcard set with id: {id} was not found')
    
    flashcard_set.latest_access = datetime.now()
    db.commit()

    return flashcard_set


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.FlashcardSet)
def create_flashcard_set(sets: schemas.FlashcardSetCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    new_flashcard_set = models.FlashcardSet(owner_id=current_user.id, title=sets.title, description=sets.description)
    db.add(new_flashcard_set)
    db.commit()
    db.refresh(new_flashcard_set)

    for flashcard in sets.flashcards:
        new_flashcard = models.Flashcard(flashcard_set_id=new_flashcard_set.id, **flashcard.model_dump())
        db.add(new_flashcard)

    db.commit()
    db.refresh(new_flashcard_set)

    return new_flashcard_set

@router.put("/{id}", status_code=status.HTTP_201_CREATED, response_model=schemas.FlashcardSet)
def update_flashcard_set(id: int, sets: schemas.FlashcardSetCreate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    flashcard_set_query = db.query(models.FlashcardSet).filter(models.FlashcardSet.id == id)
    flashcard_set = flashcard_set_query.first()

    if not flashcard_set:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Flashcard set with id: {id} was not found')
    
    if flashcard_set.owner_id != current_user.id: 
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")
    
    flashcard_set_query.update({"title": sets.title, "description": sets.description, "updated_at": datetime.now()}, synchronize_session=False)
    db.commit()
    
    for flashcard in sets.flashcards:
        new_flashcard = models.Flashcard(flashcard_set_id=flashcard_set.id, **flashcard.model_dump())
        db.add(new_flashcard)
    
    db.commit()
    return flashcard_set_query.first()

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_flashcard_set(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    flashcard_set_query = db.query(models.FlashcardSet).filter(models.FlashcardSet.id == id)
    flashcard_set = flashcard_set_query.first()

    if not flashcard_set:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Flashcard set with id: {id} was not found')
    
    if flashcard_set.owner_id != current_user.id: 
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")
    
    flashcard_set_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)