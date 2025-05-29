import { useState, useEffect } from 'react';
import axios from 'axios';

const useJournal = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/v1/journal');
      setEntries(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch entries');
    } finally {
      setLoading(false);
    }
  };

  const createEntry = async (entry) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/journal', entry);
      setEntries([...entries, response.data]);
      setError(null);
    } catch (err) {
      setError('Failed to create entry');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateEntry = async (id, entry) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/journal/${id}`, entry);
      setEntries(entries.map((e) => (e.id === id ? response.data : e)));
      setError(null);
    } catch (err) {
      setError('Failed to update entry');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8000/api/v1/journal/${id}`);
      setEntries(entries.filter((e) => e.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete entry');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return { entries, loading, error, createEntry, updateEntry, deleteEntry };
};

export default useJournal;