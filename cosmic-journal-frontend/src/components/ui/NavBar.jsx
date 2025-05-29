import React from 'react';
import { Link } from 'react-router-dom';
import { signOutUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOutUser();
    navigate('/login');
  };

  return (
    <nav className="bg-cosmic p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-starlight text-2xl font-bold glow">
          Cosmic Journal
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-starlight hover:text-nebula">
                Dashboard
              </Link>
              <Link to="/starmap" className="text-starlight hover:text-nebula">
                Star Map
              </Link>
              <Link to="/profile" className="text-starlight hover:text-nebula">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-starlight hover:text-nebula"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-starlight hover:text-nebula">
                Login
              </Link>
              <Link to="/signup" className="text-starlight hover:text-nebula">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;