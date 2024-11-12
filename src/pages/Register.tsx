// src/pages/Register.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField'; // Import InputField component
import { apiFetch } from '../utils/api';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    setRedirectPath(localStorage.getItem('redirectPath'));
  }, []);

  // Email validation function for real-time checking
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Validate password fields for non-empty values
  const validatePasswordFields = () => {
    if (!password || !confirmPassword) {
      setPasswordError('Password and Confirm Password are required');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleRegister = async () => {
    setIsLoading(true);
    // Validate required fields before proceeding with API call
    if (!fullName || !email || !password || !confirmPassword) {
      setMessage('All fields are required');
      setIsLoading(false);
      return;
    }

    // Validate password fields
    if (!validatePasswordFields()) {
      setIsLoading(false);
      return;
    }

    // Proceed with registration API call
    try {
      const data = await apiFetch(`/account/register`, {
        method: 'POST',
        body: JSON.stringify({ email, name: fullName, password }),
      });
      console.log(data);
      if (data.message === 'success') {
        setIsLoading(false);
        if (redirectPath) {
          localStorage.removeItem('redirectPath');
          navigate(`${redirectPath}`);
        } else {
          navigate('/login');
        }
      } else {
        setIsLoading(false);
        setMessage(data.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('An error occurred');
      }
    }

    // setMessage(data.message || 'Registration successful!');
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Join the Lampstand Discovery Center
        </p>

        <InputField
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

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
          error={passwordError}
        />

        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={passwordError}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Loading' : 'Register'}
        </button>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        <div className="relative my-6">
          <hr className="border-gray-300" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-gray-600">
            OR
          </span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          <svg
            className="w-6 h-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
          >
            <path d="M44.5 20H24v8.5h11.7C34.8 32.5 31 36 24 36c-7 0-12.7-5.7-12.7-12.7S17 10.7 24 10.7c3.3 0 5.7 1.1 7.7 3.3l5.8-5.8C34.8 5.8 30 4 24 4 12 4 2 14 2 26s10 22 22 22c11 0 22-8 22-22 0-1.5-.2-3-.5-4.5z" />
          </svg>
          Sign in with Google
        </button>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link
              to={'/login'}
              className="text-primary font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
