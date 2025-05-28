import React from 'react';
import StarMap from '../components/starmap/StarMap';
import ConstellationInfo from '../components/starmap/ConstellationInfo';
import CelestialEvents from '../components/starmap/CelestialEvents';

const StarMapPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Cosmic Journal Star Map</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <StarMap />
        </div>
        <div className="space-y-6">
          <ConstellationInfo />
          <CelestialEvents />
        </div>
      </div>
    </div>
  );
};

export default StarMapPage;