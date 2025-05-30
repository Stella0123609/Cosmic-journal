from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from app.database.models import JournalEntry
from app.database.schemas import JournalCreate, JournalUpdate
from fastapi import HTTPException

class JournalService:
    model = JournalEntry

    @staticmethod
    def create_journal(db: Session, journal: JournalCreate, user_id: int) -> JournalEntry:
        db_journal = JournalEntry(**journal.dict(), user_id=user_id)
        db.add(db_journal)
        db.commit()
        db.refresh(db_journal)
        return db_journal

    @staticmethod
    def get_journal(db: Session, journal_id: int, user_id: int) -> JournalEntry:
        return db.query(JournalEntry).filter(JournalEntry.id == journal_id, JournalEntry.user_id == user_id).first()

    @staticmethod
    def get_journals(db: Session, user_id: int, skip: int = 0, limit: int = 10, search: str = '') -> list[JournalEntry]:
        query = db.query(JournalEntry).filter(JournalEntry.user_id == user_id)
        if search:
            search = f"%{search}%"
            query = query.filter(or_(
                JournalEntry.content.ilike(search),
                and_(JournalEntry.mood != None, JournalEntry.mood.ilike(search))
            ))
        return query.order_by(JournalEntry.created_at.desc()).offset(skip).limit(limit).all()

    @staticmethod
    def update_journal(db: Session, journal_id: int, user_id: int, journal_update: JournalUpdate) -> JournalEntry:
        journal = JournalService.get_journal(db, journal_id, user_id)
        if not journal:
            raise HTTPException(status_code=404, detail="Journal entry not found")
        update_data = journal_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(journal, key, value)
        db.commit()
        db.refresh(journal)
        return journal

    @staticmethod
    def delete_journal(db: Session, journal_id: int, user_id: int):
        journal = JournalService.get_journal(db, journal_id, user_id)
        if not journal:
            raise HTTPException(status_code=404, detail="Journal entry not found")
        db.delete(journal)
        db.commit()