// src/components/Message.tsx
import React from 'react';

interface MessageProps {
  message: string;
  isError?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isError }) => {
  return (
    <p
      className={`text-center mt-4 ${
        isError ? 'text-red-500' : 'text-green-500'
      }`}
    >
      {message}
    </p>
  );
};

export default Message;
