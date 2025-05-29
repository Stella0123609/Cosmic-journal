import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

function RadarChartComponent({ data }) {
  // Sample data; replace with actual journal entry counts
  const chartData = data || [
    { constellation: 'Orion', entries: 5 },
    { constellation: 'Ursa Major', entries: 3 },
    { constellation: 'Cassiopeia', entries: 2 },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold text-starlight mb-4">Journal Entries by Constellation</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="constellation" stroke="#e6e6fa" />
          <Radar
            name="Entries"
            dataKey="entries"
            stroke="#e6e6fa"
            fill="#6b7280"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarChartComponent;