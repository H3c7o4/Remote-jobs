import React from 'react';
import ProfileHeader from '../components/ProfileHeader';
import ProfileDetails from '../components/ProfileDetails';
import LocationMap from '../components/LocationMap';
import SocialLinks from '../components/SocialLinks';
import ResumeSection from '../components/ResumeSection';

const ProfilePage: React.FC = () => {
  const handleEditClick = () => {
    // Action when edit is clicked
    alert('Edit Profile Clicked');
  };

  return (
    <section className="w-full dark:bg-gray-900">
      <ProfileHeader
        name="Samuel Abera"
        profession="Software Engineer"
        onEditClick={handleEditClick}
      />
      <div className="mt-8">
        <ProfileDetails
          firstName="Samuel"
          lastName="Abera"
          dob="21/02/1997"
          gender="Male"
          location="Addis Ababa, Ethiopia"
          phoneNumber="+251913****30"
          email="samuelabera87@gmail.com"
          website="https://www.teclick.com"
        />
      </div>
      <ResumeSection resumeLink="/resume.pdf" />
      <div className="my-8">
        <LocationMap latitude={8.9806} longitude={38.7578} />
      </div>
      <SocialLinks />
    </section>
  );
};

export default ProfilePage;
