import { useState } from 'react';
import { FaceSmileIcon } from '@heroicons/react/24/outline';

const MoodSelector = ({ options, selectedMood, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === selectedMood);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2 border rounded-lg ${selectedOption ? selectedOption.color : 'bg-gray-50 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      >
        <div className="flex items-center">
          <FaceSmileIcon className="h-5 w-5 mr-2" />
          <span>{selectedOption?.label || 'Select your mood...'}</span>
        </div>
        <svg
          className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 ring-1 ring-black ring-opacity-5">
          <div className="max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center ${option.color}`}
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
              >
                <span className="mr-2 text-lg">{option.label.split(' ')[0]}</span>
                <span>{option.label.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;