import React from 'react';
import { IPost } from '../types/Post';
import PostCard from './PostCard';

interface UserPostsProps {
  posts: IPost[];
}

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
  if (posts.length === 0) {
    return <p className="text-center text-gray-600">No posts available</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
        />
      ))}
    </div>
  );
};

export default UserPosts;
