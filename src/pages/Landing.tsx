// src/pages/Landing.tsx
import React, { useEffect } from 'react';
import logo from '../assets/logo1.png';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Lampstand | Home';
  });
  return (
    <div className="bg-primary text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="logo h-16 w-16 bg-white rounded-full mb-4">
        <img
          src={logo}
          alt="Lampstand Logo"
        />
      </div>{' '}
      {/* Placeholder for logo */}
      <h1 className="text-4xl font-bold mb-2">
        Welcome to Lampstand Discovery Center
      </h1>
      <p className="text-center mb-8">
        A ministry dedicated to spreading knowledge and inspiration.
      </p>
      <button
        className="bg-white text-primary px-4 py-2 rounded"
        onClick={() => navigate('/login')}
      >
        Login
      </button>
    </div>
  );
};

export default Landing;
