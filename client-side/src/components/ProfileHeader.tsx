import React, { useRef, useState } from 'react';
import { FaPen, FaCheck } from 'react-icons/fa';

interface ProfileHeaderProps {
  coverPhoto: string;
  profilePhoto: string;
  name: string;
  profession: string;
  onCoverPhotoChange: (file: File) => void;
  onProfilePhotoChange: (file: File) => void;
  onProfessionChange: (newProfession: string) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  coverPhoto,
  profilePhoto,
  name,
  profession,
  onCoverPhotoChange,
  onProfilePhotoChange,
  onProfessionChange,
}) => {
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isEditingProfession, setIsEditingProfession] = useState(false); 
  const [editedProfession, setEditedProfession] = useState(profession);

  const handleCoverPhotoClick = () => {
    if (coverInputRef.current) {
      coverInputRef.current.click();
    }
  };

  const handleProfilePhotoClick = () => {
    if (profileInputRef.current) {
      profileInputRef.current.click();
    }
  };

  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onCoverPhotoChange(event.target.files[0]);
    }
  };

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onProfilePhotoChange(event.target.files[0]);
    }
  };

  const openImageInModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  // Gère l'édition et la sauvegarde de la profession
  const handleEditProfession = () => {
    if (isEditingProfession) {
      onProfessionChange(editedProfession); // Met à jour la profession lors de la confirmation
    }
    setIsEditingProfession(!isEditingProfession); // Active ou désactive le mode d'édition
  };

  return (
    <>
      <div className="relative w-full">
        <img
          src={coverPhoto}
          alt="User Cover"
          className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem] object-cover cursor-pointer"
          onClick={() => openImageInModal(coverPhoto)}
        />
        <button
          onClick={handleCoverPhotoClick}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          ✏️
        </button>
        <input
          type="file"
          ref={coverInputRef}
          style={{ display: 'none' }}
          onChange={handleCoverPhotoChange}
          accept="image/*"
        />
      </div>

      <div className="sm:w-[80%] xs:w-[90%] mx-auto flex relative">
        <div className="relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]">
          <img
            src={profilePhoto}
            alt="User Profile"
            className="rounded-full lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] border-4 border-white object-cover cursor-pointer"
            onClick={() => openImageInModal(profilePhoto)}
          />
          <button
            onClick={handleProfilePhotoClick}
            className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            ✏️
          </button>
          <input
            type="file"
            ref={profileInputRef}
            style={{ display: 'none' }}
            onChange={handleProfilePhotoChange}
            accept="image/*"
          />
        </div>

        <div className="flex flex-col justify-center pl-4 lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]">
          <h1 className="text-left text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif font-bold">
            {name}
          </h1>

          <div className="flex items-center">
            {isEditingProfession ? (
              <input
                type="text"
                value={editedProfession}
                onChange={(e) => setEditedProfession(e.target.value)}
                className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400 italic">{profession}</p>
            )}

            {isEditingProfession ? (
              <button
                className="ml-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                onClick={handleEditProfession}
              >
                <FaCheck /> {/* Icône pour la validation */}
              </button>
            ) : (
              <button
                className="ml-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                onClick={handleEditProfession}
              >
                <FaPen />
              </button>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <img src={modalImage!} alt="Modal View" className="max-w-[90%] max-h-[90%] rounded-lg" />
        </div>
      )}
    </>
  );
};
