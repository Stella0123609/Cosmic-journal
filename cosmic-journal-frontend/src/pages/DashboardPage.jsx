import { useState } from 'react';
import JournalForm from '../components/JournalForm';
import JournalList from '../components/JournalList';
import JournalSearch from '../components/JournalSearch';
import JournalStats from '../components/JournalStats';

const DashboardPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Journal Dashboard</h1>
      <button
        onClick={() => { setShowForm(true); setEditEntry(null); }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        New Entry
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