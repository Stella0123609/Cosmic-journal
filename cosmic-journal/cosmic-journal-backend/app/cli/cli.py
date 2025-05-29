import click
from app.database.models import JournalEntry
from app.database.session import get_db
from app.utils.dateUtils import parse_date
from sqlalchemy.orm import Session

@click.group()
def cli():
    """Cosmic Journal CLI"""
    pass

# Stella's contribution: Journal commands
@cli.command()
@click.option('--user-id', required=True, help='User ID')
@click.option('--content', required=True, help='Journal entry content')
@click.option('--date', required=True, help='Entry date (YYYY-MM-DD)')
@click.option('--mood', help='Mood tag')
@click.option('--city', required=True, help='City for star map')
def create_journal(user_id: str, content: str, date: str, mood: str, city: str):
    """Create a new journal entry."""
    db: Session = next(get_db())
    try:
        entry = JournalEntry(
            user_id=user_id,
            content=content,
            date=parse_date(date),
            mood=mood,
            city=city,
        )
        db.add(entry)
        db.commit()
        click.echo(f"Journal entry created: {content[:50]}...")
    except Exception as e:
        click.echo(f"Error: {str(e)}")
    finally:
        db.close()

@cli.command()
@click.option('--user-id', required=True, help='User ID')
def list_journals(user_id: str):
    """List all journal entries for a user."""
    db: Session = next(get_db())
    try:
        entries = db.query(JournalEntry).filter(JournalEntry.user_id == user_id).all()
        for entry in entries:
            click.echo(f"ID: {entry.id}, Date: {entry.date}, Mood: {entry.mood}, City: {entry.city}")
            click.echo(f"Content: {entry.content[:50]}...")
    except Exception as e:
        click.echo(f"Error: {str(e)}")
    finally:
        db.close()

if __name__ == '__main__':
    cli()