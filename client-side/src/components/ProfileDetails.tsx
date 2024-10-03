import React from 'react';

interface ProfileDetailsProps {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string; // Gender is defined here
  location: string;
  phoneNumber: string;
  email: string;
  website?: string;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  firstName,
  lastName,
  dob,
  gender,
  location,
  phoneNumber,
  email,
  website,
}) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      <div className="w-full">
        <dl>
          <div className="flex justify-between">
            <dt className="text-gray-500">First Name</dt>
            <dd className="text-lg font-semibold">{firstName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Last Name</dt>
            <dd className="text-lg font-semibold">{lastName}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Date of Birth</dt>
            <dd className="text-lg font-semibold">{dob}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Gender</dt>
            <dd className="text-lg font-semibold">{gender}</dd> {/* Added gender here */}
          </div>
        </dl>
      </div>
      <div className="w-full">
        <dl>
          <div className="flex justify-between">
            <dt className="text-gray-500">Location</dt>
            <dd className="text-lg font-semibold">{location}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Phone Number</dt>
            <dd className="text-lg font-semibold">{phoneNumber}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Email</dt>
            <dd className="text-lg font-semibold">{email}</dd>
          </div>
          {website && (
            <div className="flex justify-between">
              <dt className="text-gray-500">Website</dt>
              <dd className="text-lg font-semibold hover:text-blue-500">
                <a href={website}>{website}</a>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};

export default ProfileDetails;
