import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary p-4 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/feed"
          className="text-2xl font-bold"
        >
          Lampstand
        </Link>
        <div className="space-x-4">
          <Link
            to="/feed"
            className="hover:text-green-300"
          >
            Home
          </Link>
          <Link
            to="/post-article"
            className='className="hover:text-green-300"'
          >
            Create Post
          </Link>
          <Link
            to="/profile"
            className="hover:text-green-300"
          >
            Profile
          </Link>

          <Link
            to="/settings"
            className="hover:text-green-300"
          >
            Settings
          </Link>
          <Link
            to="/"
            className="hover:text-green-300"
            onClick={() => {
              localStorage.removeItem('authToken');
              localStorage.removeItem('loggenIn');
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
