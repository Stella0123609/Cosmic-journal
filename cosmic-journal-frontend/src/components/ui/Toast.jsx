import React from 'react';

function Toast({ message, type = 'info', onClose }) {
  const typeStyles = {
    info: 'bg-nebula text-starlight',
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  };

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg glow ${typeStyles[type]} shadow-lg`}>
      <p>{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-sm underline"
      >
        Close
      </button>
    </div>
  );
}

export default Toast;