import React, { useEffect, useState } from 'react';
import FeedItem from '../components/FeedItem';
import feedData from '../data/feedData.json'; // Use your feed data
import Navbar from '../components/Navbar';
import { apiFetch } from '../utils/api';
import { IPostCom } from '../types/Post';

const FeedPage: React.FC = () => {
  // const [feedItems] = useState(feedData);
  const [feedItems, setFeedItems] = useState([]);
  const [error, setError] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<Boolean>();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('loggedIn'));
    const getPosts = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await apiFetch('/post', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.message == 'success') {
          setFeedItems(response.posts);
        } else {
          setError(response.message);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred');
        }
      }
    };
    getPosts();
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
            {feedItems.length > 0 ? (
              feedItems.map((item: IPostCom) => (
                <FeedItem
                  key={item._id}
                  content={item}
                />
              ))
            ) : (
              <div>No posts to display</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
