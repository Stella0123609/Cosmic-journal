import React, { useEffect, useRef } from 'react';
import { useStarMap } from '../../hooks/useStarMap';

const StarMap = () => {
  const canvasRef = useRef(null);
  const { stars, constellations, fetchStarMapData, isLoading, error } = useStarMap();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
s
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.brightness * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    });

    ctx.strokeStyle = '#4b5e7a';
    ctx.lineWidth = 1;
    constellations.forEach(constellation => {
      ctx.beginPath();
      constellation.lines.forEach(([start, end]) => {
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
      });
      ctx.stroke();
    });
  }, [stars, constellations]);

  useEffect(() => {
    fetchStarMapData();
  }, [fetchStarMapData]);

  if (isLoading) return <div className="text-white">Loading Star Map...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="border border-gray-700 rounded-lg" />
    </div>
  );
};

export default StarMap;