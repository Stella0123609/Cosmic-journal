import React, { useEffect } from 'react';
import { useStarMap } from '../../hooks/useStarMap';

const CelestialEvents = () => {
  const { celestialEvents, fetchCelestialEvents, isLoading, error } = useStarMap();

  useEffect(() => {
    fetchCelestialEvents();
  }, [fetchCelestialEvents]);

  if (isLoading) return <div className="text-white">Loading Events...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!celestialEvents.length) return <div className="text-gray-400">No upcoming events</div>;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-2">Upcoming Celestial Events</h2>
      <ul className="space-y-2">
        {celestialEvents.map(event => (
          <li key={event.id} className="border-b border-gray-700 pb-2">
            <h3 className="text-lg">{event.name}</h3>
            <p className="text-sm">Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-sm">Type: {event.type}</p>
            <p className="text-sm">{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CelestialEvents;