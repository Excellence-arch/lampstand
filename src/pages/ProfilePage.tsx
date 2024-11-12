import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../utils/api';
import { IDataUser, User } from '../types/User';
import { IPost, postResponse } from '../types/Post';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import UserPosts from '../components/UserPosts';
// import userData from '../data/userData.json';
// import userPostsData from '../data/userPosts.json';

const ProfilePage: React.FC = () => {
  // const { userId } = useParams<{ userId: string }>();
  // const [user, setUser] = useState<User | null>(null);
  // const [posts, setPosts] = useState<Post[]>([]);

  // const [user, setUser] = useState<User | null>(userData);
  // const [posts, setPosts] = useState<Post[]>(userPostsData);
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data: IDataUser = await apiFetch(`/api/profile`);
        if (data.message == 'success') {
          setUser(data.user);
        }
        const postData: postResponse = await apiFetch(`/api/posts/}`);
        if (postData.message == 'success') {
          setPosts(postData.posts);
        }
      } catch (error) {
        setError('Failed to fetch data');
      }
    };

    fetchUserData();
  }, []);

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
