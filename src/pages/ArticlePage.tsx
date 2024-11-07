import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import feedData from '../data/feedData.json'; // Use your feed data
import Navbar from '../components/Navbar';

const ArticlePage: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('loggedIn') || false);
  }, []);

  const { id } = useParams<{ id: string }>(); // Get the article ID from the URL
  const article = feedData.find((item) => item.id === id);

  if (!article) {
    return <div className="text-center text-red-500">Article not found</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loggedIn && <Navbar />}
      <h2 className="text-primary font-bold text-3xl mb-4">{article.title}</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-600 mb-6">{article.description}</p>
        <p className="text-gray-700 whitespace-pre-wrap">{article.body}</p>
      </div>
    </div>
  );
};

export default ArticlePage;
