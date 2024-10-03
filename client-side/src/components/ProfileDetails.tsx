// ProfileDetails.tsx
import React from 'react';

interface UserData {
  firstName: string;
  lastName: string;
  bio: string;
  phoneNumber: string;
  email: string;
  website: string;
}

interface ProfileDetailsProps {
  userData: UserData;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userData }) => {
  return (
    <div className="my-10 w-full">
      <p className="text-gray-700 dark:text-gray-400 text-md">{userData.bio}</p>
      <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
        <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
          <div className="w-full">
            <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
                <dd className="text-lg font-semibold">{userData.firstName}</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
                <dd className="text-lg font-semibold">{userData.lastName}</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                <dd className="text-lg font-semibold">{userData.phoneNumber}</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                <dd className="text-lg font-semibold">{userData.email}</dd>
              </div>
              <div className="flex flex-col pt-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Website</dt>
                <dd className="text-lg font-semibold hover:text-blue-500">
                  <a href={userData.website} target="_blank" rel="noopener noreferrer">{userData.website}</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
