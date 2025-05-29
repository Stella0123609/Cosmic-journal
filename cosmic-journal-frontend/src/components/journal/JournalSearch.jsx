import { useState, useContext } from 'react';
import { JournalContext } from '../contexts/JournalContext';
import { FaSearch } from 'react-icons/fa';

const JournalSearch = () => {
  const { fetchEntries } = useContext(JournalContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchEntries(1, term); // Reset to page 1 with search term
  };

  return (
    <div className="mb-4 relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by content or mood..."
        className="w-full p-2 pl-10 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500"
        aria-label="Search journal entries"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default JournalSearch;