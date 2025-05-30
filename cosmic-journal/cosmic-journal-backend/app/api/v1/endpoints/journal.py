from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from app.database.session import get_db
from app.database.schemas import JournalCreate, JournalUpdate, JournalResponse
from app.services.journal_service import JournalService

router = APIRouter()

def get_current_user_id():
    return 1 
@router.post("/journal", response_model=JournalResponse)
async def create_journal(journal: JournalCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    return JournalService.create_journal(db, journal, user_id)

@router.get("/journal/{journal_id}", response_model=JournalResponse)
async def get_journal(journal_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    journal = JournalService.get_journal(db, journal_id, user_id)
    if not journal:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    return journal

@router.get("/journal", response_model=list[JournalResponse])
async def get_journals(
    skip: int = 0,
    limit: int = 10,
    search: str = '',
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return JournalService.get_journals(db, user_id, skip, limit, search)

@router.put("/journal/{journal_id}", response_model=JournalResponse)
async def update_journal(journal_id: int, journal: JournalUpdate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    return JournalService.update_journal(db, journal_id, user_id, journal)

@router.delete("/journal/{journal_id}")
async def delete_journal(journal_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    JournalService.delete_journal(db, journal_id, user_id)
    return {"success": True, "message": "Journal entry deleted"}