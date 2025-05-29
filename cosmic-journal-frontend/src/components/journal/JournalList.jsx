import { useState } from 'react';
import JournalEntry from './JournalEntry';

const JournalList = ({ entries }) => {
  const [expandedEntry, setExpandedEntry] = useState(null);

  if (entries.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">No journal entries yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <JournalEntry
          key={entry.id}
          entry={entry}
          isExpanded={expandedEntry === entry.id}
          onToggleExpand={() => setExpandedEntry(
            expandedEntry === entry.id ? null : entry.id
          )}
        />
      ))}
    </div>
  );
};

export default JournalList;