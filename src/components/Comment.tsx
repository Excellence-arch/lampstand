import React from 'react';

interface CommentProps {
  comment: { id: number; text: string; user: string };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="mb-2 p-3 bg-gray-50 rounded-lg shadow-sm">
      <p className="font-semibold text-gray-700">{comment.user}</p>
      <p className="text-gray-600">{comment.text}</p>
    </div>
  );
};

export default Comment;
