// src/components/FullContentModal.tsx
import React from 'react';

interface FullContentModalProps {
  content: { title: string; body: string };
  onClose: () => void;
}

const FullContentModal: React.FC<FullContentModalProps> = ({
  content,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {/* Render full content (including indents and line breaks) */}
          {content.body}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FullContentModal;
