// src/pages/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../utils/api';
import InputField from '../components/InputField';
import Message from '../components/Message';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  // Email validation function for real-time checking
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Handle login form submission
  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('Email and Password are required');
      return;
    }

    localStorage.setItem('authToken', 'jkaskjsdkjsa');
    localStorage.setItem('loggedIn', 'true');
    // navigate('/profile');

    try {
      const data = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setMessage(data.message || 'Login successful!');
      localStorage.setItem('authToken', data.token);
      navigate('/profile');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Sign in to access your account
        </p>

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          error={emailError}
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Login
        </button>

        <Message
          message={message}
          isError={!!emailError || message.includes('error')}
        />

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              to={'/register'}
              className="text-primary font-semibold hover:underline cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
