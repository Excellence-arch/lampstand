import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png';

const Navbar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(
    !!localStorage.getItem('authToken')
  );
  return (
    <section>
      {loggedIn ? (
        <nav className="bg-primary p-4 text-white shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link
              to="/feed"
              className="text-2xl font-bold"
            >
              <img
                src={logo}
                alt="Lampstand"
                className="ms-5 h-10 w-10"
              />
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
                  localStorage.removeItem('loggedIn');
                }}
              >
                Logout
              </Link>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="bg-primary p-4 text-white shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link
              to="/feed"
              className="text-2xl font-bold"
            >
              <img
                src={logo}
                alt="Lampstand"
                className="ms-5 h-10 w-10"
              />
            </Link>
            <div className="space-x-4">
              <Link
                to="/feed"
                className="hover:text-green-300"
              >
                Home
              </Link>
              <Link
                to="/login"
                className='className="hover:text-green-300"'
              >
                Create Post
              </Link>
              <Link
                to="/login"
                className="hover:text-green-300"
              >
                Login
              </Link>
            </div>
          </div>
        </nav>
      )}
    </section>
  );
};

export default Navbar;
