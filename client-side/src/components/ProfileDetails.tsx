import { FaPen, FaPlus } from 'react-icons/fa';
import { UserData } from '../types/user';

interface ProfileDetailsProps {
  userData: UserData;
  onBioEdit: () => void;
  onSkillAdd: () => void;
  onSkillEdit: (index: number) => void;
  onPersonalInfoEdit: () => void;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  userData,
  onBioEdit,
  onSkillAdd,
  onSkillEdit,
  onPersonalInfoEdit
}) => {
  // Gestion sécurisée des skills avec une valeur par défaut
  const skillsArray = userData.skills?.split(',').map(skill => skill.trim()).filter(Boolean) || [];

  return (
    <div className="my-10 w-full">
      {/* Section Bio */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Bio</h2>
        <button onClick={onBioEdit} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
          <FaPen className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      <p className="text-gray-700 dark:text-gray-400 text-md mb-6">
        {userData.bio || 'No bio available. Click the edit button to add one.'}
      </p>

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
                <dd className="text-lg font-semibold">{userData.first_name || 'Not specified'}</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
                <dd className="text-lg font-semibold">{userData.last_name || 'Not specified'}</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                <dd className="text-lg font-semibold">{userData.phone_number || 'Not specified'}</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                <dd className="text-lg font-semibold">{userData.email || 'Not specified'}</dd>
              </div>
              <div className="flex flex-col pt-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Website</dt>
                <dd className="text-lg font-semibold hover:text-blue-500">
                  {userData.website ? (
                    <a href={userData.website} target="_blank" rel="noopener noreferrer">
                      {userData.website}
                    </a>
                  ) : (
                    'Not specified'
                  )}
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
      {skillsArray.length > 0 ? (
        <ul className="list-disc pl-5">
          {skillsArray.map((skill, index) => (
            <li key={index} className="flex items-center justify-between text-gray-700 dark:text-gray-400 mb-2">
              {skill}
              <button 
                onClick={() => onSkillEdit(index)} 
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
              >
                <FaPen className="text-gray-600 dark:text-gray-400" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic">
          No skills added yet. Click the plus button to add your first skill.
        </p>
      )}
    </div>
  );
};