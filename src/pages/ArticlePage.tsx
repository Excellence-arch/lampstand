import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css'; // Import Draft.js styles
import Navbar from '../components/Navbar';
import { apiFetch } from '../utils/api';
import { IPost } from '../types/Post';

const ArticlePage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [article, setArticle] = useState<IPost | null>(null);
  const [editorState, setEditorState] = useState(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('loggedIn'));
    const authToken = localStorage.getItem('authToken');

    const fetchArticle = async () => {
      try {
        const response = await apiFetch(`/post/${slug}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.message === 'success') {
          setArticle(response.data);

          // Convert body to Draft.js EditorState
          try {
            const rawContent = JSON.parse(response.data.body);
            setEditorState(EditorState.createWithContent(convertFromRaw(rawContent)));
          } catch (err) {
            console.error('Error parsing or converting Draft.js content:', err);
            setError('Failed to render article content.');
          }
        } else {
          setError(response.message || 'Failed to fetch the article');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Navbar />
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-red-600 text-lg">{error}</div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-red-600 text-lg">Article not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-primary mb-6">
          {article.title}
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
            {editorState ? (
              <Editor
                editorState={editorState}
                readOnly={true} // Set to read-only mode
                onChange={() => {}} // No-op to prevent state changes
              />
            ) : (
              <p className="text-red-500">Error rendering content</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
