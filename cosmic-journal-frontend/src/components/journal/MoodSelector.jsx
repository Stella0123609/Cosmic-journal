import { useState } from 'react';

const MoodSelector = ({ selectedMood, onMoodChange }) => {
  const moods = [
    { value: '', label: 'Select a mood' },
    { value: 'Happy', label: 'Happy' },
    { value: 'Sad', label: 'Sad' },
    { value: 'Excited', label: 'Excited' },
    { value: 'Calm', label: 'Calm' },
    { value: 'Anxious', label: 'Anxious' },
    { value: 'Angry', label: 'Angry' },
  ];

  return (
    <div className="mb-4">
      <label htmlFor="mood" className="block text-gray-300 mb-2">Mood (Optional)</label>
      <select
        id="mood"
        value={selectedMood || ''}
        onChange={(e) => onMoodChange(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
      >
        {moods.map((mood) => (
          <option key={mood.value} value={mood.value}>
            {mood.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MoodSelector;