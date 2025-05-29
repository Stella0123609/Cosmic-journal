import { useState, useContext } from 'react';
import { JournalContext } from '../contexts/JournalContext';

const JournalForm = ({ entry = null, onClose }) => {
  const { createEntry, updateEntry } = useContext(JournalContext);
  const [content, setContent] = useState(entry ? entry.content : '');
  const [mood, setMood] = useState(entry ? entry.mood : '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Content is required');
      return;
    }
    try {
      if (entry) {
        await updateEntry(entry.id, { content, mood });
      } else {
        await createEntry({ content, mood });
      }
      onClose();
    } catch (err) {
      setError('Failed to save entry');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">{entry ? 'Edit Entry' : 'New Journal Entry'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-300 mb-2">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          rows="5"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mood" className="block text-gray-300 mb-2">Mood (Optional)</label>
        <input
          id="mood"
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          {entry ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

export default JournalForm;