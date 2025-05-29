import { useState, useContext } from 'react';
import { FaPlus, FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../contexts/ThemeContext';
import JournalForm from '../components/JournalForm';
import JournalList from '../components/JournalList';
import JournalSearch from '../components/JournalSearch';
import JournalStats from '../components/JournalStats';

const DashboardPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br from-gray-900 to-indigo-900 dark:from-gray-900 dark:to-indigo-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-white flex items-center gap-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-400 dark:to-purple-500">
            Cosmic Journal
          </span>
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <button
        onClick={() => { setShowForm(true); setEditEntry(null); }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 flex items-center gap-2 transition-colors duration-300 dark:bg-blue-600 dark:hover:bg-blue-500"
      >
        <FaPlus /> New Entry
      </button>
      <JournalSearch />
      <JournalStats />
      {showForm && (
        <JournalForm
          entry={editEntry}
          onClose={() => setShowForm(false)}
        />
      )}
      <JournalList />
    </div>
  );
};

export default DashboardPage;