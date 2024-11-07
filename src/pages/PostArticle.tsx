// src/pages/PostArticle.tsx
import React, { useState } from 'react';

const PostArticle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('/api/post-article', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    // handle response here
  };

  return (
    <div className="p-4">
      <h2 className="text-primary font-bold text-2xl mb-4">Post an Article</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full h-48 mb-4"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-primary text-white p-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default PostArticle;
