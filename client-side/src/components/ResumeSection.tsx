// ProfileCV.tsx
import React from 'react';
import { FaFileDownload } from 'react-icons/fa';

interface ProfileCVProps {
  cvLink: string;
}

export const ProfileCV: React.FC<ProfileCVProps> = ({ cvLink }) => {
  return (
    <div className="my-10">
      <h2 className="text-lg font-semibold">CV</h2>
      <a href={cvLink} className="flex items-center text-blue-500 hover:text-blue-700" download>
        <FaFileDownload className="mr-2" />
        Download Resume
      </a>
    </div>
  );
};