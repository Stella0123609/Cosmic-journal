import React from 'react';
import { useStarMap } from '../../hooks/useStarMap';

const ConstellationInfo = () => {
  const { selectedConstellation } = useStarMap();

  if (!selectedConstellation) {
    return <div className="text-gray-400">Select a constellation to view details</div>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-2">{selectedConstellation.name}</h2>
      <p className="mb-2">{selectedConstellation.description}</p>
      <h3 className="text-lg font-semibold">Stars</h3>
      <ul className="list-disc pl-5">
        {selectedConstellation.stars.map(star => (
          <li key={star.id} className="text-sm">
            {star.name} (Brightness: {star.brightness})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConstellationInfo;