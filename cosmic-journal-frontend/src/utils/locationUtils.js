export async function getCoordinates(city, apiKey) {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(city)}&apiKey=${apiKey}`
    );
    const data = await response.json();
    if (data.features.length === 0) throw new Error('City not found');
    return {
      latitude: data.features[0].properties.lat,
      longitude: data.features[0].properties.lon,
    };
  } catch (error) {
    throw new Error(`Failed to get coordinates: ${error.message}`);
  }
}