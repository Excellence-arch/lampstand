// src/pages/PostArticle.tsx
import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import TitleInput from '../components/TitleInput';
import RichTextEditor from '../components/RichTextEditor';
import Navbar from '../components/Navbar';
import { ContentType } from '../types/Post';
import { apiFetch } from '../utils/api';

const PostArticle: React.FC = () => {
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = async () => {
    // Convert editor content to raw JSON format
    const contentState = editorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState));

    const authToken = localStorage.getItem('authToken'); // Fetch the token from localStorage

    // Send title and raw content to backend
    const response = await apiFetch('/post/create-post', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title,
        body: rawContent,
        contentType: ContentType.ARTICLE,
      }),
    });

    if (response.message == 'success') {
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
