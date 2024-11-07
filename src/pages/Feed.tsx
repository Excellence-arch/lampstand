import React, { useEffect, useState } from 'react';
import FeedItem from '../components/FeedItem';
import feedData from '../data/feedData.json'; // Use your feed data
import Navbar from '../components/Navbar';

const FeedPage: React.FC = () => {
  const [feedItems] = useState(feedData);
  const [error, setError] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<Boolean>();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('loggedIn') || false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        <h2 className="text-primary font-bold text-2xl mb-4">Your Feed</h2>
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid gap-4">
            {feedItems.map((item) => (
              <FeedItem
                key={item.id}
                content={item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
