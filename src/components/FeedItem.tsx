// src/components/FeedItem.tsx
import React from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css'; // Import Draft.js styles
import { IPostCom } from '../types/Post';

interface FeedItemProps {
  content: IPostCom;
}

const FeedItem: React.FC<FeedItemProps> = ({ content }) => {
  // Parse and convert the JSON body back to Draft.js editor state
  const editorState = React.useMemo(() => {
    try {
      const rawContent = JSON.parse(content.body); // Parse the JSON string
      return EditorState.createWithContent(convertFromRaw(rawContent)); // Convert to EditorState
    } catch (error) {
      console.error('Error parsing or converting content body:', error);
      return EditorState.createEmpty(); // Return empty EditorState if parsing fails
    }
  }, [content.body]);

  return (
    <div className="feed-item bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{content.title}</h3>
      <div className="mt-2">
        <Editor
          editorState={editorState}
          readOnly={true}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default FeedItem;
