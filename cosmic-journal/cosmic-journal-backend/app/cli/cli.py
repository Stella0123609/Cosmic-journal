import click
from app.database.session import SessionLocal
from app.database.models import JournalEntry, User
from datetime import datetime

@click.group()
def cli():
    """Cosmic Journal CLI"""
    pass

# Journal commands (Allan)
@cli.command()
@click.argument('content')
@click.option('--mood', default=None, help='Mood for the journal entry')
def create_journal(content, mood):
    """Create a new journal entry"""
    db = SessionLocal()
    try:
        journal = JournalEntry(content=content, mood=mood, user_id=1, created_at=datetime.utcnow())
        db.add(journal)
        db.commit()
        click.echo(f"Journal entry created with ID {journal.id}")
    finally:
        db.close()

@cli.command()
def list_journals():
    """List all journal entries"""
    db = SessionLocal()
    try:
        journals = db.query(JournalEntry).filter(JournalEntry.user_id == 1).all()
        for journal in journals:
            click.echo(f"ID: {journal.id}, Content: {journal.content}, Mood: {journal.mood}, Created: {journal.created_at}")
    finally:
        db.close()

# Placeholder for Derrick's user commands
@cli.command()
@click.argument('email')
@click.argument('password')
def create_user(email, password):
    """Create a new user (placeholder for Derrick's auth)"""
    click.echo(f"User creation for {email} (to be implemented by Derrick)")

# Placeholder for Stella's visualization commands
@cli.command()
def visualize():
    """Visualize journal data (placeholder for Stella)"""
    click.echo("Visualization command (to be implemented by Stella)")

if __name__ == "__main__":
    cli()