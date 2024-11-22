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
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      const contentState = editorState.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(contentState));
      const authToken = localStorage.getItem('authToken');

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

      if (response.message === 'success') {
        alert('Article posted successfully!');
      } else {
        alert('Failed to post the article.');
      }
    } catch (error) {
      alert('An error occurred while posting the article.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-primary mb-8">
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
          disabled={loading} // Disable while loading
          className={`w-full mt-6 py-3 font-semibold rounded transition duration-300 ${
            loading
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-green-700'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            'Submit Article'
          )}
        </button>
      </div>
    </div>
  );
};

export default PostArticle;
