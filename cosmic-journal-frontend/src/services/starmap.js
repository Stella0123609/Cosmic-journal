import { useState, useCallback } from 'react';
import { getStarMapData, getCelestialEvents } from '../services/starmap';

export const useStarMap = () => {
  const [stars, setStars] = useState([]);
  const [constellations, setConstellations] = useState([]);
  const [selectedConstellation, setSelectedConstellation] = useState(null);
  const [celestialEvents, setCelestialEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStarMapData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { stars, constellations } = await getStarMapData();
      setStars(stars);
      setConstellations(constellations);
      setError(null);
    } catch (err) {
      setError('Failed to fetch star map data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCelestialEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const events = await getCelestialEvents();
      setCelestialEvents(events);
      setError(null);
    } catch (err) {
      setError('Failed to fetch celestial events');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    stars,
    constellations,
    selectedConstellation,
    setSelectedConstellation,
    celestialEvents,
    fetchStarMapData,
    fetchCelestialEvents,
    isLoading,
    error,
  };
};