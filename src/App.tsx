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
  // Determine authentication status based on localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem('authToken')
  );

  // Update isAuthenticated whenever the authToken changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('authToken'));
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
        {/* Redirect logged-in users to /feed */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/feed" /> : <Landing />}
        />

        <Route
          path="/feed"
          element={<Feed />}
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
          path="/post/:slug"
          element={<ArticlePage />}
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

        {/* Redirect any unknown routes to /feed */}
        <Route
          path="*"
          element={<Navigate to="/feed" />}
        />
      </Routes>
    </div>
  );
};

export default App;
