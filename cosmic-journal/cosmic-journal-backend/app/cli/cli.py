from app.database.session import SessionLocal
from app.database.models import User
from app.utils.security import hash_password
import click

def validate_email(email):
    return "@" in email and "." in email

@click.group()
def cli():
    pass

@cli.command()
@click.option('--email', prompt='Email', help='User email')
@click.option('--password', prompt='Password', hide_input=True, help='User password')
def create_user(email, password):
    if not validate_email(email):
        click.echo("Invalid email format.")
        return
    db = SessionLocal()
    try:
        user = User.create(db, email=email, hashed_password=hash_password(password))
        click.echo(f"User created with ID: {user.id}")
    finally:
        db.close()

@cli.command()
@click.option('--user_id', prompt='User ID', type=int, help='User ID to delete')
def delete_user(user_id):
    db = SessionLocal()
    try:
        if User.delete(db, user_id):
            click.echo(f"User {user_id} deleted.")
        else:
            click.echo(f"User {user_id} not found.")
    finally:
        db.close()

@cli.command()
def list_users():
    db = SessionLocal()
    try:
        users = User.get_all(db)
        for user in users:
            click.echo(f"ID: {user.id}, Email: {user.email}")
    finally:
        db.close()

@cli.command()
@click.option('--user_id', prompt='User ID', type=int, help='User ID to find')
def find_user(user_id):
    db = SessionLocal()
    try:
        user = User.find_by_id(db, user_id)
        if user:
            click.echo(f"ID: {user.id}, Email: {user.email}")
            entries = user.journal_entries
            for entry in entries:
                click.echo(f"  Entry ID: {entry.id}, Content: {entry.content}, Mood: {entry.mood}, City: {entry.city}")
        else:
            click.echo(f"User {user_id} not found.")
    finally:
        db.close()

if __name__ == '__main__':
    cli()