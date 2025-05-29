import requests
from fastapi import HTTPException

def get_coordinates(city: str, api_key: str) -> tuple[float, float]:
    """Get latitude and longitude for a city using Geoapify."""
    url = f"https://api.geoapify.com/v1/geocode/search?text={city}&apiKey={api_key}"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch coordinates")
    data = response.json()
    if not data["features"]:
        raise HTTPException(status_code=400, detail="City not found")
    return (
        data["features"][0]["properties"]["lat"],
        data["features"][0]["properties"]["lon"],
    )