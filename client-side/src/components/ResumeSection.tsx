// ProfileCV.tsx
import React, { useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';

interface ProfileCVProps {
  initialCvLink: string;
}

export const ProfileCV: React.FC<ProfileCVProps> = ({ initialCvLink }) => {
  const [cvLink, setCvLink] = useState(initialCvLink); // Gérer le lien du CV
  const [cvName, setCvName] = useState(''); // Gérer le nom du fichier CV

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newCvLink = URL.createObjectURL(file);
      setCvLink(newCvLink);
      setCvName(file.name); // Mettre à jour le nom du fichier CV
    }
  };

  return (
    <div className="my-1 flex flex-col items-start"> {/* Alignement à gauche */}
      <h2 className="text-2xl font-semibold">Resume</h2>

      {/* Lien pour télécharger le CV */}
      <a href={cvLink} className="flex items-center text-blue-500 hover:text-blue-700" download={cvName}>
        <FaFileDownload className="mr-2" />
        Download {cvName || 'Resume'}
      </a>

      {/* Input pour charger un nouveau CV */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
    </div>
  );
};
