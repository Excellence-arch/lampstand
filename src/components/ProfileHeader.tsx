import React from 'react';
import { User } from '../types/User';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  return (
    <div className="flex items-center mb-8">
      <img
        src={user.avatar}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-lg"
      />
      <div className="ml-6">
        <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
        <p className="text-gray-600 text-lg">{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
