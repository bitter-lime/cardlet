from sqlalchemy import Boolean, Column, Integer, String, ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text 
from sqlalchemy.orm import relationship
from .database import Base 

class Flashcard(Base):
    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True, nullable=False)
    question = Column(String, nullable=False)
    answer = Column(String, nullable=False)
    is_starred = Column(Boolean, nullable=False, server_default='FALSE') 

    flashcard_set_id = Column(Integer, ForeignKey("flashcard_sets.id", ondelete="CASCADE"), nullable=False)

class FlashcardSet(Base):
    __tablename__ = "flashcard_sets"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False, server_default="")
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    is_public = Column(Boolean, nullable=False, server_default="TRUE")
    is_published = Column(Boolean, nullable=False, server_default="FALSE")
    latest_access = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))

    flashcards = relationship("Flashcard")

    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    owner = relationship("User")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))