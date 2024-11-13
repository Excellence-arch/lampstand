import React from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../types/Content';
import { ContentType, IPostCom } from '../types/Post';

interface FeedItemProps {
  content: IPostCom;
}

const FeedItem: React.FC<FeedItemProps> = ({ content }) => {
  return (
    <div className="border p-6 rounded-lg shadow-lg bg-white">
      <h3 className="text-xl font-bold">{content.title}</h3>
      <p className="text-gray-600 mt-2">{content.body}</p>
      <div className="mt-4">
        {content.contentType === ContentType.ARTICLE && (
          <Link
            to={`/feed/${content._id}`}
            className="text-primary hover:underline"
          >
            Read Article
          </Link>
        )}
        {/* Add more content type handling (e.g., video) here */}
      </div>
    </div>
  );
};

export default FeedItem;
