import { createContext, useContext, useState, useEffect } from 'react';
import api from '../../services/api';

const JournalContext = createContext();

export const JournalProvider = ({ children }) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentEntry, setCurrentEntry] = useState(null);

    const fetchEntries = async () => {
        setLoading(true);
        try {
            const response = await api.get('/journal/entries');
            setEntries(response.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch entries');
        } finally {
            setLoading(false);
        }
    };

    const createEntry = async (entryData) => {
        try {
            const response = await api.post('/journal/entries', entryData);
            setEntries(prev => [response.data, ...prev]);
            return response.data;
        } catch (err) {
            throw err.response?.data || { message: 'Failed to create entry' };
        }
    };

    const updateEntry = async (id, entryData) => {
        try {
            const response = await api.put(`/journal/entries/${id}`, entryData);
            setEntries(prev => 
                prev.map(entry => entry.id === id ? response.data : entry)
            );
            return response.data;
        } catch (err) {
            throw err.response?.data || { message: 'Failed to update entry' };
        }
    };

    const deleteEntry = async (id) => {
        try {
            await api.delete(`/journal/entries/${id}`);
            setEntries(prev => prev.filter(entry => entry.id !== id));
            return true;
        } catch (err) {
            throw err.response?.data || { message: 'Failed to delete entry' };
        }
    };

    const getEntryById = (id) => {
        return entries.find(entry => entry.id === id);
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <JournalContext.Provider
            value={{
                entries,
                currentEntry,
                loading,
                error,
                createEntry,
                updateEntry,
                deleteEntry,
                fetchEntries,
                getEntryById,
                setCurrentEntry
            }}
        >
            {children}
        </JournalContext.Provider>
    );
};

export const useJournal = () => useContext(JournalContext);