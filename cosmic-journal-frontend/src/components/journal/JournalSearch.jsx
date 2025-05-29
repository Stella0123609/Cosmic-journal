import { useState, useContext } from 'react';
import { JournalContext } from '../contexts/JournalContext';

const JournalSearch = () => {
  const { entries, setEntries } = useContext(JournalContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      const filtered = entries.filter(
        (entry) =>
          entry.content.toLowerCase().includes(term) ||
          (entry.mood && entry.mood.toLowerCase().includes(term))
      );
      setEntries(filtered);
    } else {
      setEntries(entries);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by content or mood..."
        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default JournalSearch;