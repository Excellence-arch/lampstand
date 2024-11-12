import React from 'react';
import { IComment } from '../types/Post';

interface CommentProps {
  comment: IComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="mb-2 p-3 bg-gray-50 rounded-lg shadow-sm">
      <p className="font-semibold text-gray-700">{comment.user}</p>
      <p className="text-gray-600">{comment.body}</p>
    </div>
  );
};

export default Comment;
