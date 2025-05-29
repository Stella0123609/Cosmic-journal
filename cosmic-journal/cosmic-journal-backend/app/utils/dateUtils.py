from datetime import datetime

def parse_date(date_str: str) -> datetime:
    """Parse a date string to a datetime object."""
    try:
        return datetime.fromisoformat(date_str.replace('Z', '+00:00'))
    except ValueError as e:
        raise ValueError(f"Invalid date format: {e}")

def format_date(dt: datetime) -> str:
    """Format a datetime object to a readable string."""
    return dt.strftime("%Y-%m-%d %H:%M:%S")