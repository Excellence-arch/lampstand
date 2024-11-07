// src/components/InputField.tsx
import React, { useState } from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mb-4 relative">
      <input
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
