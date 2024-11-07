// src/pages/PostArticle.tsx
import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import TitleInput from '../components/TitleInput';
import RichTextEditor from '../components/RichTextEditor';
import Navbar from '../components/Navbar';

const PostArticle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = async () => {
    // Convert editor content to raw JSON format
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    // Send title and raw content to backend
    const response = await fetch('/api/post-article', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content: rawContent }),
    });

    if (response.ok) {
      alert('Article posted successfully!');
    } else {
      alert('Failed to post the article.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Post an Article
        </h2>
        <TitleInput
          title={title}
          setTitle={setTitle}
        />
        <RichTextEditor
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-2 bg-primary text-white font-semibold rounded hover:bg-green-700 transition duration-200"
        >
          Submit Article
        </button>
      </div>
    </div>
  );
};

export default PostArticle;
