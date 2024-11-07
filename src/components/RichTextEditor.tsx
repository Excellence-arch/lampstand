// src/components/RichTextEditor.tsx
import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

interface RichTextEditorProps {
  editorState: any;
  setEditorState: (state: any) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  editorState,
  setEditorState,
}) => {
  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const renderButtons = () => (
    <div className="flex gap-2 mb-2">
      <button
        onClick={() => toggleInlineStyle('BOLD')}
        className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Bold
      </button>
      <button
        onClick={() => toggleInlineStyle('ITALIC')}
        className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Italic
      </button>
      <button
        onClick={() => toggleInlineStyle('UNDERLINE')}
        className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Underline
      </button>
    </div>
  );

  return (
    <div className="border border-gray-300 rounded p-4">
      {renderButtons()}
      <div className="min-h-[200px] p-2 bg-white rounded border border-gray-200">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Write your article here..."
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
