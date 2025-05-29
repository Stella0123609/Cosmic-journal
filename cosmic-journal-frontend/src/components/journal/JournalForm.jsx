import { useState, useContext } from 'react';
import { useJournal } from '../hooks/useJournal';
import MoodSelector from './MoodSelector';
import { useNavigate } from 'react-router-dom';

const JournalForm = ({ entry = null, onSuccess }) => {
  const { createEntry, updateEntry } = useJournal();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: entry?.title || '',
    content: entry?.content || '',
    mood: entry?.mood || '',
    location: entry?.location || ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const moodOptions = [
    { value: 'happy', label: '😊 Happy', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'sad', label: '😢 Sad', color: 'bg-blue-100 text-blue-800' },
    { value: 'angry', label: '😠 Angry', color: 'bg-red-100 text-red-800' },
    { value: 'peaceful', label: '😌 Peaceful', color: 'bg-green-100 text-green-800' },
    { value: 'excited', label: '🤩 Excited', color: 'bg-purple-100 text-purple-800' },
    { value: 'grateful', label: '🙏 Grateful', color: 'bg-indigo-100 text-indigo-800' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMoodSelect = (mood) => {
    setFormData(prev => ({ ...prev, mood }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (entry) {
        await updateEntry(entry.id, formData);
      } else {
        await createEntry(formData);
      }
      onSuccess?.();
    } catch (err) {
      setError(err.message || 'Failed to save journal entry');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={100}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="What's on your mind today?"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Your Thoughts *
        </label>
        <textarea
          id="content"
          name="content"
          rows={6}
          value={formData.content}
          onChange={handleChange}
          required
          minLength={10}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Write your thoughts here..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How are you feeling?
        </label>
        <MoodSelector 
          options={moodOptions}
          selectedMood={formData.mood}
          onSelect={handleMoodSelect}
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location (optional)
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Where are you writing from?"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={() => onSuccess?.()}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {entry ? 'Updating...' : 'Creating...'}
            </span>
          ) : (
            entry ? 'Update Entry' : 'Create Entry'
          )}
        </button>
      </div>
    </form>
  );
};

export default JournalForm;