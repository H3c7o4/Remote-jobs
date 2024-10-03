import React from 'react';

interface ProfileHeaderProps {
  name: string;
  profession: string;
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, profession, onEditClick }) => {
  return (
    <div className="w-full relative">
      {/* Cover Image */}
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
        alt="User Cover"
        className="w-full xl:h-[20rem]"
      />
      {/* Profile Image and Name */}
      <div className="flex items-center space-x-4 mt-[-4rem]">
        <img
          src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea"
          alt="User Profile"
          className="rounded-md w-28 h-28 outline outline-2 outline-blue-500"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{name}</h1>
          <p className="text-lg text-gray-500">{profession}</p>
        </div>
        {/* Edit Button */}
        <button onClick={onEditClick} className="ml-auto flex items-center text-blue-600">
          <span className="mr-2">Edit Profile</span>
          <i className="fas fa-pen"></i>
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
