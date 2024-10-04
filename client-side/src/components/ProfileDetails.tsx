// ProfileDetails.tsx
import { FaPen, FaPlus } from 'react-icons/fa'; // Importation des icônes de crayon et plus

interface UserData {
  firstName: string;
  lastName: string;
  bio: string;
  phoneNumber: string;
  email: string;
  website: string;
  skills: string[]; // Ajout du tableau de compétences
}

interface ProfileDetailsProps {
  userData: UserData;
  onBioEdit: () => void; // Fonction de modification de la bio
  onSkillAdd: () => void; // Fonction pour ajouter une compétence
  onSkillEdit: (index: number) => void; // Fonction de modification d'une compétence
  onPersonalInfoEdit: () => void; // Fonction de modification des informations personnelles
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userData, onBioEdit, onSkillAdd, onSkillEdit, onPersonalInfoEdit }) => {
  return (
    <div className="my-10 w-full">
      {/* Section Bio */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Bio</h2>
        <button onClick={onBioEdit} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <FaPen className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <p className="text-gray-700 dark:text-gray-400 text-md mb-6">{userData.bio}</p>

      {/* Section Détails personnels */}
      <div className="my-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
          <button onClick={onPersonalInfoEdit} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
            <FaPen className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
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

      {/* Section Skills */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Skills</h2>
        <button onClick={onSkillAdd} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <FaPlus className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <ul className="list-disc pl-5">
        {userData.skills.map((skill, index) => (
          <li key={index} className="flex items-center justify-between text-gray-700 dark:text-gray-400 mb-2">
            {skill}
            <button onClick={() => onSkillEdit(index)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
              <FaPen className="text-gray-600 dark:text-gray-400" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
