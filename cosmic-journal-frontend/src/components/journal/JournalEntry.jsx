import { useContext } from 'react';
import { JournalContext } from '../contexts/JournalContext';

const JournalEntry = ({ entry }) => {
  const { deleteEntry, setEditEntry } = useContext(JournalContext);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <p className="text-white">{entry.content}</p>
      {entry.mood && <p className="text-gray-400">Mood: {entry.mood}</p>}
      <p className="text-gray-500 text-sm">Created: {new Date(entry.created_at).toLocaleString()}</p>
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={() => setEditEntry(entry)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Edit
        </button>
        <button
          onClick={() => deleteEntry(entry.id)}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JournalEntry;