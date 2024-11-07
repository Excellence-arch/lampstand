import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../utils/api';
import { User } from '../types/User';
import { Post } from '../types/Post';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import UserPosts from '../components/UserPosts';
import userData from '../data/userData.json';
import userPostsData from '../data/userPosts.json';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  // const [user, setUser] = useState<User | null>(null);
  // const [posts, setPosts] = useState<Post[]>([]);

  const [user, setUser] = useState<User | null>(userData);
  const [posts, setPosts] = useState<Post[]>(userPostsData);
  const [error, setError] = useState<string>('');

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const userData = await apiFetch(`/api/user/${userId}`);
  //       setUser(userData);
  //       const userPosts = await apiFetch(`/api/posts/user/${userId}`);
  //       setPosts(userPosts);
  //     } catch (error) {
  //       setError('Failed to fetch data');
  //     }
  //   };

  //   fetchUserData();
  // }, [userId]);

  return (
    <div className="bg-gray-100">
      <Navbar />
      {error ? (
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
