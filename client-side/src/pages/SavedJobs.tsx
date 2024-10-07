import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiArrowLeft } from 'react-icons/fi'; // Import des icônes
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// Données d'exemple pour les offres d'emploi sauvegardées
const savedJobOffers = [
  {
    id: 1,
    title: 'AI Engineer - Natural Language Processing',
    company: 'Tech Innovations',
    location: 'Douala, Cameroon',
    salary: '45,000 - 65,000€ per year',
    description: 'Looking for an AI Engineer with NLP expertise.',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Web Solutions',
    location: 'Yaoundé, Cameroon',
    salary: '30,000 - 50,000€ per year',
    description: 'Seeking a Full Stack Developer with experience in React and Node.js.',
  },
  {
    id: 3,
    title: 'Data Scientist',
    company: 'Data Insights',
    location: 'Buea, Cameroon',
    salary: '40,000 - 60,000€ per year',
    description: 'Looking for a Data Scientist to analyze large datasets.',
  },
];

const SavedJobs: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-col p-6 sm:p-12">
          <div className="flex items-center mb-4">
            {/* Icône pour retourner à la page précédente */}
            <Link to="/jobs" className="text-gray-500 hover:text-gray-900 mr-4">
              <FiArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl xl:text-3xl font-extrabold">Saved Jobs</h1>
          </div>

          {savedJobOffers.length === 0 ? (
            <p className="text-gray-700 mt-4">You have no saved jobs.</p>
          ) : (
            <div className="mt-6">
              {savedJobOffers.map((job) => (
                <div key={job.id} className="border-b border-gray-300 pb-4 mb-4">
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="text-gray-600">{job.company} - {job.location}</p>
                  <p className="text-gray-600 mt-2">Salary: {job.salary}</p>
                  <p className="text-gray-700 mt-2">{job.description}</p>
                  <Link to={`/jobs/${job.id}`} className="text-indigo-600 hover:underline">
                    View Details
                  </Link>
                  <button className="ml-4 text-red-500">
                    <FiHeart />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SavedJobs;