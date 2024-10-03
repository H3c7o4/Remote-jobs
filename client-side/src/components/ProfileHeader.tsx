// ProfileHeader.tsx
import React from 'react';

interface ProfileHeaderProps {
  coverPhoto: string;
  profilePhoto: string;
  name: string;
  profession: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ coverPhoto, profilePhoto, name, profession }) => {
  return (
    <>
      <img src={coverPhoto} alt="User Cover" className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]" />
      <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
        <img src={profilePhoto} alt="User Profile" className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]" />
        <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
          {name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{profession}</p>
      </div>
    </>
  );
};
