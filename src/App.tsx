// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Feed from './pages/Feed';
import Activity from './pages/Activity';
import PostArticle from './pages/PostArticle';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/ProfilePage';
import ArticlePage from './pages/ArticlePage';

const App: React.FC = () => {
  // Simulate a simple auth check (replace with real authentication check)
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authToken')
  );

  // Update isAuthenticated whenever the authToken changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(Boolean(localStorage.getItem('authToken')));
    };

    // Listen for changes to localStorage
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Wrapper for routes requiring authentication
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="font-sans text-gray-900">
      <Routes>
        <Route
          path="/"
          element={<Landing />}
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/feed/:id"
          element={<ArticlePage />}
        />
        <Route
          path="/feed"
          element={<Feed />}
        />
        <Route
          path="/activity"
          element={
            <PrivateRoute>
              <Activity />
            </PrivateRoute>
          }
        />
        <Route
          path="/post-article"
          element={
            <PrivateRoute>
              <PostArticle />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        {/* Redirect any unknown routes back to the landing page */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
