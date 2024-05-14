from fastapi import status, HTTPException, Depends, APIRouter, Response

from sqlalchemy.orm import Session 
from .. import models, schemas, utils, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/users",
    tags=['Users']
)

@router.get("/{id}", response_model=schemas.UserOut)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()

    if user == None: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id: {id} does not exist")
    
    return user 

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    hashed_pwd = utils.hash(user.password)
    user.password = hashed_pwd
    new_user = models.User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.put("/{id}", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def update_user(id: int, username: schemas.UserUpdate, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    user_query = db.query(models.User).filter(models.User.id == id)
    user = user_query.first()

    if not user: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id: {id} does not exist")
    
    if user.id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")

    user_query.update({"username": username.username}, synchronize_session=False)
    
    db.commit()

    return user_query.first()

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(id: int, db: Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):
    user_query = db.query(models.User).filter(models.User.id == id)
    user = user_query.first()

    if not user: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id: {id} does not exist")
    
    if user.id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action")

    user_query.delete(synchronize_session=False)
    db.commit()
    
    return Response(status_code=status.HTTP_204_NO_CONTENT)
