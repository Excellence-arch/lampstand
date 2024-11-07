import React from 'react';
import { Post } from '../types/Post';
import Comment from './Comment';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
      <p className="text-lg text-gray-800">{post.content}</p>
      <div className="flex items-center justify-between mt-4 text-gray-500">
        <div className="flex items-center">
          <span className="mr-4 text-sm">
            <i className="fas fa-heart text-red-500"></i> {post.likes}{' '}
            {post.likes === 1 ? 'Like' : 'Likes'}
          </span>
          <span className="text-sm">
            <i className="fas fa-comments text-blue-500"></i>{' '}
            {post.comments.length}{' '}
            {post.comments.length === 1 ? 'Comment' : 'Comments'}
          </span>
        </div>
        <span className="text-sm text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="mt-4">
        {post.comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
};

export default PostCard;
