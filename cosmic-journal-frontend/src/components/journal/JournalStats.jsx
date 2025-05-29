import { useContext } from 'react';
import { JournalContext } from '../contexts/JournalContext';

const JournalStats = () => {
  const { entries } = useContext(JournalContext);
  const totalEntries = entries.length;
  const moods = entries.reduce((acc, entry) => {
    if (entry.mood) {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-6">
      <h2 className="text-xl font-bold text-white mb-2">Journal Statistics</h2>
      <p className="text-gray-300">Total Entries: {totalEntries}</p>
      <p className="text-gray-300">Moods:</p>
      <ul className="list-disc list-inside text-gray-400">
        {Object.entries(moods).map(([mood, count]) => (
          <li key={mood}>{mood}: {count}</li>
        ))}
      </ul>
    </div>
  );
};

export default JournalStats;