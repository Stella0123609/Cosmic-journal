VALID_MOODS = {"reflective", "joyful", "calm", "excited"}

def validate_mood(mood: str) -> str:
    """Validate a mood tag."""
    if mood and mood not in VALID_MOODS:
        raise ValueError(f"Invalid mood: {mood}. Must be one of {VALID_MOODS}")
    return mood