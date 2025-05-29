import { useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { JournalContext } from '../contexts/JournalContext';

const JournalEntry = ({ entry }) => {
  const { deleteEntry, setEditEntry } = useContext(JournalContext);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-indigo-500/30 hover:shadow-xl transition-shadow duration-300">
      <p className="text-white">{entry.content}</p>
      {entry.mood && (
        <p className="text-indigo-300 flex items-center gap-2">
          <span className="text-sm">Mood:</span> {entry.mood}
        </p>
      )}
      <p className="text-gray-500 text-sm">Created: {new Date(entry.created_at).toLocaleString()}</p>
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={() => setEditEntry(entry)}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 flex items-center gap-1 transition-colors duration-300"
        >
          <FaEdit /> Edit
        </button>
        <button
          onClick={() => deleteEntry(entry.id)}
          className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-500 flex items-center gap-1 transition-colors duration-300"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default JournalEntry;