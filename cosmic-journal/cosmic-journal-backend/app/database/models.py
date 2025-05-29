from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    journal_entries = relationship("JournalEntry", back_populates="user", cascade="all, delete-orphan")

    @property
    def is_valid(self):
        return bool(self.email and self.hashed_password)

    @classmethod
    def create(cls, session, email, hashed_password):
        user = cls(email=email, hashed_password=hashed_password)
        session.add(user)
        session.commit()
        return user

    @classmethod
    def delete(cls, session, user_id):
        user = session.query(cls).filter(cls.id == user_id).first()
        if user:
            session.delete(user)
            session.commit()
            return True
        return False

    @classmethod
    def get_all(cls, session):
        return session.query(cls).all()

    @classmethod
    def find_by_id(cls, session, user_id):
        return session.query(cls).filter(cls.id == user_id).first()

class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    mood = Column(String, nullable=True)
    city = Column(String, nullable=True)
    user = relationship("User", back_populates="journal_entries")

    @property
    def is_valid(self):
        return bool(self.content and self.user_id) 