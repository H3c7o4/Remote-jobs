// Profile.tsx
import React from 'react';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileDetails } from '../components/ProfileDetails';
import { ProfileCV } from '../components/ResumeSection';
import LocationMap from '../components/LocationMap';
import SocialLinks from '../components/SocialLinks';

const Profile: React.FC = () => {
  // Données utilisateur aléatoires pour l'instant
  const userData = {
    coverPhoto: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080',
    profilePhoto: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080',
    firstName: 'Samuel',
    lastName: 'Abera',
    profession: 'Développeur Full Stack',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    location: 'Ethiopia, Addis Ababa',
    phoneNumber: '+251913****30',
    email: 'samuelabera87@gmail.com',
    website: 'https://techakim.com',
    cvLink: '#', // Lien vers le CV
  };

  return (
    <section className="w-full overflow-hidden dark:bg-gray-900">
      <ProfileHeader coverPhoto={userData.coverPhoto} profilePhoto={userData.profilePhoto} name={`${userData.firstName} ${userData.lastName}`} profession={userData.profession} />
      <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
        <ProfileDetails userData={userData} />
        <LocationMap location="Addis Ababa, Ethiopia" latitude={8.9635} longitude={38.6133} />
        <ProfileCV cvLink={userData.cvLink} />
        <SocialLinks />
      </div>
    </section>
  );
};

export default Profile;
