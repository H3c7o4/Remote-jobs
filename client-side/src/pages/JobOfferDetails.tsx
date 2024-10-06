import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiHeart } from 'react-icons/fi'; // Import de l'icône
import Footer from '../components/Footer';

// Composant pour afficher la page de description d'offre d'emploi
const JobOfferDetails: React.FC = () => {
  // État pour gérer si l'offre est sauvegardée
  const [isSaved, setIsSaved] = useState(false);

  // Données d'exemple pour l'offre d'emploi
  const jobDetails = {
    title: 'AI Engineer - Natural Language Processing',
    company: 'Tech Innovations',
    location: 'Douala, Cameroon',
    salary: '45,000 - 65,000€ per year',
    description: 'We are looking for an experienced AI Engineer with expertise in Natural Language Processing (NLP) to join our team. The ideal candidate will have strong knowledge of machine learning models, data processing, and cloud platforms.',
    requirements: [
      'Bachelor’s degree in Computer Science or related field',
      'Experience with NLP models',
      'Familiarity with cloud platforms (AWS, GCP, Azure)',
      'Knowledge of Python, TensorFlow, PyTorch',
    ],
    benefits: [
      'Flexible work schedule',
      'Professional growth opportunities',
      'Health insurance and retirement benefits',
    ],
  };

  // URL d'application (à remplacer par l'URL réelle de l'API)
  const applyUrl = 'https://example.com/apply'; // URL aléatoire pour l'application

  // Fonction pour gérer le clic sur le cœur
  const handleHeartClick = () => {
    setIsSaved(!isSaved); // Change l'état à chaque clic
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex items-center mb-4">
              {/* Icône pour retourner à la page précédente */}
              <Link to="/jobs" className="text-gray-500 hover:text-gray-900 mr-4">
                <FiArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl xl:text-3xl font-extrabold">{jobDetails.title}</h1>
              {/* Icône pour sauvegarder l'offre d'emploi */}
              <button className="ml-4 text-gray-500 hover:text-gray-900" onClick={handleHeartClick}>
                <FiHeart size={24} color={isSaved ? 'red' : 'currentColor'} />
              </button>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{jobDetails.company} - {jobDetails.location}</p>
              <p className="text-gray-600 text-sm mt-2">Salary: {jobDetails.salary}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Job Description</h2>
              <p className="text-gray-700 mt-2">{jobDetails.description}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Requirements</h2>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                {jobDetails.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Benefits</h2>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                {jobDetails.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
            {/* Bouton Apply here */}
            <Link to={applyUrl}>
              <button className="mt-6 w-full rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                Apply here
              </button>
            </Link>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}
            ></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobOfferDetails;
