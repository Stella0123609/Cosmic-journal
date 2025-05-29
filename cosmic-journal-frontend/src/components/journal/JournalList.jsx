import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JournalContext } from '../contexts/JournalContext';
import JournalEntry from './JournalEntry';
import LoadingSpinner from './LoadingSpinner';

const JournalList = () => {
  const { entries, loading, error } = useContext(JournalContext);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (entries.length === 0) return <p className="text-gray-400">No journal entries found.</p>;

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <JournalEntry entry={entry} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default JournalList;