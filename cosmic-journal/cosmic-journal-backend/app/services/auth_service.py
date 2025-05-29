from sqlalchemy.orm import Session
from app.database.models import User
from app.utils.security import hash_password, verify_password

def create_user(db: Session, email: str, password: str):
    hashed_password = hash_password(password)
    user = User.create(db, email=email, hashed_password=hashed_password)
    return user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if user and verify_password(password, user.hashed_password):
        return user
    return None