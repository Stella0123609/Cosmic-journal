import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-starlight"></div>
      <span className="ml-2 text-nebula">Mapping the stars...</span>
    </div>
  );
}

export default LoadingSpinner;