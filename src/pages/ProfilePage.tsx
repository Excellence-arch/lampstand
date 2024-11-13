import React, { useState, useEffect } from 'react';
import { apiFetch } from '../utils/api';
import { IDataUser, User } from '../types/User';
import { IPost, postResponse } from '../types/Post';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import UserPosts from '../components/UserPosts';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken'); // Fetch the token from localStorage

      try {
        // Fetch user data
        const data: IDataUser = await apiFetch(`/account/profile`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (data.message === 'success') {
          setUser(data.user);
        } else {
          setError('Failed to fetch user data');
        }

        // Fetch user posts
        const postData: postResponse = await apiFetch(`/post`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (postData.message === 'success') {
          if (postData.posts.length == 0) {
            setError('No posts to display');
          } else {
            setPosts(postData.posts);
          }
        } else {
          setError('Failed to fetch posts');
        }
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-gray-100">
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center text-gray-600">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        user && (
          <div className="min-h-screen p-6">
            <ProfileHeader user={user} />
            <UserPosts posts={posts} />
          </div>
        )
      )}
    </div>
  );
};

export default ProfilePage;
