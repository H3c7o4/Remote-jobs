// ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileDetails } from '../components/ProfileDetails';
import { ProfileCV } from '../components/ResumeSection';
import LocationMap from '../components/LocationMap';
import SocialLinks from '../components/SocialLinks';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { UserData } from '../types/user';

// Définition de l'interface pour les données utilisateur
const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [coverPhoto, setCoverPhoto] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [profession, setProfession] = useState('');

  // Charger les données de l'utilisateur lorsque l'utilisateur est authentifié
  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await api.get(`/users/auth/users/me/`);
          setUserData(response.data);
          setCoverPhoto(response.data.cover_image);
          setProfilePhoto(response.data.profile_pic);
          setProfession(response.data.profession);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, user]);

  // Fonction pour gérer le changement de la photo de couverture
  const handleCoverPhotoChange = async (file: File) => {
    const coverPhotoUrl = URL.createObjectURL(file);
    setCoverPhoto(coverPhotoUrl);

    // Envoi de la photo à l'API
    if (userData) {
      const formData = new FormData();
      formData.append('email', userData.email);
      formData.append('first_name', userData.first_name);
      formData.append('last_name', userData.last_name);
      formData.append('cover_image', file);
      await api.patch(`/users/auth/users/me/`, formData);
    }
  };

  // Fonction pour gérer le changement de la photo de profil
  const handleProfilePhotoChange = async (file: File) => {
    const profilePhotoUrl = URL.createObjectURL(file);
    setProfilePhoto(profilePhotoUrl);

    // Envoi de la photo à l'API
    if (userData) {
      const formData = new FormData();
      formData.append('email', userData.email);
      formData.append('first_name', userData.first_name);
      formData.append('last_name', userData.last_name);
      formData.append('profile_pic', file);
      await api.patch(`/users/auth/users/me/`, formData);
    }
  };

  // Fonction pour éditer la bio
  const handleBioEdit = async () => {
    if (userData) {
      const newBio = prompt('Edit your bio:', userData.bio);
      if (newBio !== null) {
        setUserData({ ...userData, bio: newBio });
        // Envoi de la photo à l'API
        const formData = new FormData();
        formData.append('email', userData.email);
        formData.append('first_name', userData.first_name);
        formData.append('last_name', userData.last_name);
        formData.append('bio', newBio);
        await api.patch(`/users/auth/users/me/`, formData);
      }
    }
  };

  // Fonction pour ajouter une compétence
  const handleSkillAdd = async () => {
    if (userData) {
      const newSkill = prompt('Add a new skill:');
      if (newSkill) {
        const updatedSkills = userData.skills ? `${userData.skills}, ${newSkill}` : newSkill;
        setUserData({ ...userData, skills: updatedSkills });
        await api.patch(`/users/auth/users/me/`, { ...userData, skills: updatedSkills });
      }
    }
  };

  // Fonction pour modifier une compétence existante
  const handleSkillEdit = async (index: number) => {
    if (userData) {
      const skillsArray = userData.skills.split(',').map(skill => skill.trim());
      const updatedSkill = prompt('Edit skill:', skillsArray[index]);
      if (updatedSkill !== null) {
        skillsArray[index] = updatedSkill;
        const updatedSkills = skillsArray.join(', ');
        setUserData({ ...userData, skills: updatedSkills });
        await api.patch(`/users/auth/users/me/`, { ...userData, skills: updatedSkills });
      }
    }
  };

  // Fonction pour éditer les informations personnelles
  const handlePersonalInfoEdit = async () => {
    if (userData) {
      const newFirstName = prompt('Edit First Name:', userData.first_name);
      const newLastName = prompt('Edit Last Name:', userData.last_name);
      const newPhoneNumber = prompt('Edit Phone Number:', userData.phone_number);
      const newEmail = prompt('Edit Email:', userData.email);
      const newWebsite = prompt('Edit Website:', userData.website);

      if (newFirstName && newLastName && newPhoneNumber && newEmail && newWebsite) {
        const updatedData = { 
          first_name: newFirstName, 
          last_name: newLastName, 
          phone_number: newPhoneNumber, 
          email: newEmail, 
          website: newWebsite 
        };
        setUserData({ ...userData, ...updatedData });
        await api.patch(`/users/auth/users/me/`, updatedData);
      }
    }
  };

  // Fonction pour gérer la modification de la profession
  const handleProfessionChange = async (newProfession: string) => {
    setProfession(newProfession);
    if (userData) {
      setUserData({ ...userData, profession: newProfession });
      await api.patch(`/users/auth/users/me/`, { profession: newProfession });
    }
  };

  if (!userData) return <div>Loading...</div>; // Ajout d'un état de chargement

  return (
    <section className="w-full overflow-hidden dark:bg-gray-900">
      <ProfileHeader
        coverPhoto={coverPhoto}
        profilePhoto={profilePhoto}
        name={`${userData.first_name} ${userData.last_name}`}
        profession={profession}
        onCoverPhotoChange={handleCoverPhotoChange}
        onProfilePhotoChange={handleProfilePhotoChange}
        onProfessionChange={handleProfessionChange}
      />
      <div className="absolute top-4 left-4">
        <a href="/jobs">
          <img src="/path/to/back-icon.png" alt="Back to jobs" />
        </a>
      </div>
      <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
        <ProfileDetails
          userData={{
            ...userData,
          }}
          onBioEdit={handleBioEdit}
          onSkillAdd={handleSkillAdd}
          onSkillEdit={handleSkillEdit}
          onPersonalInfoEdit={handlePersonalInfoEdit}
        />
        <SocialLinks />
      </div>
      <div className='ps-14 pb-10 lg:ps-44'>
        <ProfileCV initialCvLink={userData.resume} />
      </div>
      <div>
        <LocationMap location={userData.location} latitude={8.9635} longitude={38.6133} />
      </div>
      <div>
        <Footer />
      </div>
    </section>
  );
};

export default ProfilePage;
