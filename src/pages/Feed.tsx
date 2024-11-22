import React, { useEffect, useState } from 'react';
import FeedItem from '../components/FeedItem';
import Navbar from '../components/Navbar';
import { apiFetch } from '../utils/api';
import { IPostCom } from '../types/Post';

const FeedPage: React.FC = () => {
  const [feedItems, setFeedItems] = useState<IPostCom[]>([]);
  const [error, setError] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

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
        if (response.message === 'success') {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-primary font-extrabold text-3xl mb-6">Your Feed</h2>
        {error ? (
          <div className="text-red-600 text-center p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedItems.length > 0 ? (
              feedItems.map((item: IPostCom) => (
                <FeedItem key={item._id} content={item} />
              ))
            ) : (
              <div className="text-center text-gray-600 col-span-full py-6">
                No posts to display
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
