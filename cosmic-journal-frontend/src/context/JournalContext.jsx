import { createContext, useState } from 'react';
import useJournal from '../hooks/useJournal';

export const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
  const { entries, loading, error, createEntry, updateEntry, deleteEntry } = useJournal();
  const [editEntry, setEditEntry] = useState(null);

  return (
    <JournalContext.Provider value={{ entries, loading, error, createEntry, updateEntry, deleteEntry, editEntry, setEditEntry }}>
      {children}
    </JournalContext.Provider>
  );
};