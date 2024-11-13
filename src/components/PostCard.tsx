import React from 'react';
import { IPost } from '../types/Post';
import Comment from './Comment';
import { convertFromRaw, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

interface PostCardProps {
  post: IPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Convert raw JSON content to HTML
  let formattedBody;
  try {
    const contentState = convertFromRaw(JSON.parse(post.body));
    formattedBody = stateToHTML(contentState);
  } catch (error) {
    console.error('Failed to parse post body:', error);
    formattedBody = '<p>Invalid content</p>';
  }

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
      {/* Render the formatted HTML safely */}
      <div
        className="text-lg text-gray-800"
        dangerouslySetInnerHTML={{ __html: formattedBody }}
      />

      <div className="flex items-center justify-between mt-4 text-gray-500">
        <div className="flex items-center">
          <span className="mr-4 text-sm">
            <i className="fas fa-heart text-red-500"></i> {post.likes.length}{' '}
            {post.likes.length === 1 ? 'Like' : 'Likes'}
          </span>
          <span className="text-sm">
            <i className="fas fa-comments text-blue-500"></i>{' '}
            {post.comments.length}{' '}
            {post.comments.length === 1 ? 'Comment' : 'Comments'}
          </span>
        </div>
      </div>

      <div className="mt-4">
        {post.comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
          />
        ))}
      </div>
    </div>
  );
};

export default PostCard;
