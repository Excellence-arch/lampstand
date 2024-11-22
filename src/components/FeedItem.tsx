import React from 'react';
import { Editor, EditorState, convertFromRaw, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css'; // Import Draft.js styles
import { IPostCom } from '../types/Post';
import { Link } from 'react-router-dom'; // For navigation

interface FeedItemProps {
  content: IPostCom;
}

const FeedItem: React.FC<FeedItemProps> = ({ content }) => {
  // Parse and convert the JSON body back to Draft.js editor state
  const editorState = React.useMemo(() => {
    try {
      const rawContent = JSON.parse(content.body); // Parse the JSON string
      const contentState = convertFromRaw(rawContent);

      // Create a truncated version of the content
      const truncatedText = contentState.getPlainText().slice(0, 200) + '...'; // Limit to 200 chars
      const truncatedContentState = ContentState.createFromText(truncatedText);

      return EditorState.createWithContent(truncatedContentState);
    } catch (error) {
      console.error('Error parsing or converting content body:', error);
      return EditorState.createEmpty(); // Return empty EditorState if parsing fails
    }
  }, [content.body]);

  return (
    <div className="feed-item bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-bold text-primary mb-3">
        {content.title}
      </h3>
      <div className="text-gray-700 text-sm leading-relaxed mb-4 h-24 overflow-hidden">
        <Editor editorState={editorState} readOnly={true} onChange={() => {}} />
      </div>
      <Link
        to={`/post/${content.slug}`}
        className="text-green-600 font-semibold hover:underline"
      >
        Read More →
      </Link>
    </div>
  );
};

export default FeedItem;
