// Profile.tsx
import React, { useState } from 'react';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileDetails } from '../components/ProfileDetails';
import { ProfileCV } from '../components/ResumeSection';
import LocationMap from '../components/LocationMap';
import SocialLinks from '../components/SocialLinks';

const ProfilePage: React.FC = () => {
  // Données utilisateur initiales
  const initialUserData = {
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
    skills: ['JavaScript', 'React', 'Node.js'], // Compétences initiales
    cvLink: '#', // Lien vers le CV
  };

  // États pour les données utilisateur, photo de couverture et de profil
  const [userData, setUserData] = useState(initialUserData);
  const [coverPhoto, setCoverPhoto] = useState(userData.coverPhoto);
  const [profilePhoto, setProfilePhoto] = useState(userData.profilePhoto);
  const [profession, setProfession] = useState(userData.profession);
  
  // Fonction pour gérer le changement de la photo de couverture
  const handleCoverPhotoChange = (file: File) => {
    const coverPhotoUrl = URL.createObjectURL(file);
    setCoverPhoto(coverPhotoUrl); // Mise à jour de la photo de couverture
  };

  // Fonction pour gérer le changement de la photo de profil
  const handleProfilePhotoChange = (file: File) => {
    const profilePhotoUrl = URL.createObjectURL(file);
    setProfilePhoto(profilePhotoUrl); // Mise à jour de la photo de profil
  };

  // Fonction pour éditer la bio
  const handleBioEdit = () => {
    const newBio = prompt('Edit your bio:', userData.bio); // Demande à l'utilisateur de modifier la bio
    if (newBio !== null) {
      setUserData({ ...userData, bio: newBio }); // Mise à jour de la bio
    }
  };

  // Fonction pour ajouter une compétence
  const handleSkillAdd = () => {
    const newSkill = prompt('Add a new skill:'); // Demande à l'utilisateur d'ajouter une compétence
    if (newSkill) {
      setUserData({ ...userData, skills: [...userData.skills, newSkill] }); // Ajout de la nouvelle compétence
    }
  };

  // Fonction pour modifier une compétence existante
  const handleSkillEdit = (index: number) => {
    const updatedSkill = prompt('Edit skill:', userData.skills[index]); // Demande à l'utilisateur de modifier la compétence
    if (updatedSkill !== null) {
      const updatedSkills = [...userData.skills];
      updatedSkills[index] = updatedSkill;
      setUserData({ ...userData, skills: updatedSkills }); // Mise à jour de la compétence
    }
  };

  // Fonction pour éditer les informations personnelles
  const handlePersonalInfoEdit = () => {
    const newFirstName = prompt('Edit First Name:', userData.firstName); // Demande à l'utilisateur de modifier le prénom
    const newLastName = prompt('Edit Last Name:', userData.lastName); // Demande à l'utilisateur de modifier le nom
    const newPhoneNumber = prompt('Edit Phone Number:', userData.phoneNumber); // Demande à l'utilisateur de modifier le numéro de téléphone
    const newEmail = prompt('Edit Email:', userData.email); // Demande à l'utilisateur de modifier l'email
    const newWebsite = prompt('Edit Website:', userData.website); // Demande à l'utilisateur de modifier le site web

    if (newFirstName && newLastName && newPhoneNumber && newEmail && newWebsite) {
      setUserData({ 
        ...userData, 
        firstName: newFirstName, 
        lastName: newLastName, 
        phoneNumber: newPhoneNumber, 
        email: newEmail, 
        website: newWebsite 
      }); // Mise à jour des informations personnelles
    }
  };

  // Fonction pour gérer la modification de la profession
  const handleProfessionChange = (newProfession: string) => {
    setProfession(newProfession); // Mise à jour de la profession
    setUserData({ ...userData, profession: newProfession });
  };

  return (
    <section className="w-full overflow-hidden dark:bg-gray-900">
      <ProfileHeader
        coverPhoto={coverPhoto}
        profilePhoto={profilePhoto}
        name={`${userData.firstName} ${userData.lastName}`}
        profession={profession}
        onCoverPhotoChange={handleCoverPhotoChange}
        onProfilePhotoChange={handleProfilePhotoChange}
        onProfessionChange={handleProfessionChange}
      />
      <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
        <ProfileDetails
          userData={userData}
          onBioEdit={handleBioEdit} // Passe le callback pour éditer la bio
          onSkillAdd={handleSkillAdd} // Passe le callback pour ajouter une compétence
          onSkillEdit={handleSkillEdit} // Passe le callback pour éditer une compétence
          onPersonalInfoEdit={handlePersonalInfoEdit} // Passe le callback pour éditer les informations personnelles
        />
        <LocationMap location="Addis Ababa, Ethiopia" latitude={8.9635} longitude={38.6133} />
        <ProfileCV cvLink={userData.cvLink} />
        <SocialLinks />
      </div>
    </section>
  );
};

export default ProfilePage;
