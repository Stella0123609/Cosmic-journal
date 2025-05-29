import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-4">Cosmic Journal</h1>
      <p className="text-lg mb-6">Reflect on your thoughts under the stars.</p>
      {user ? (
        <Link to="/dashboard" className="p-3 bg-indigo-600 rounded hover:bg-indigo-700">
          Go to Dashboard
        </Link>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="p-3 bg-indigo-600 rounded hover:bg-indigo-700">
            Login
          </Link>
          <Link to="/signup" className="p-3 bg-indigo-600 rounded hover:bg-indigo-700">
            Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;