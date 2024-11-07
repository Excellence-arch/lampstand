// src/components/TitleInput.tsx
import React from 'react';

interface TitleInputProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => {
  return (
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Title of your article"
      className="w-full p-3 text-lg border border-gray-300 rounded mb-4 focus:outline-none focus:border-primary"
    />
  );
};

export default TitleInput;
