import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiArrowLeft } from 'react-icons/fi';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import api from '../services/api';

interface Job {
  job_id: string;
  role: string;
  company_name: string;
  location: string;
  logo: string | null;
  url: string;
  text: string;
  date_posted: string;
}

const SavedJobs: React.FC = () => {
  const [savedJobOffers, setSavedJobOffers] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await api.get('/api/jobs/liked/');
        setSavedJobOffers(response.data);
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleUnlike = async (jobId: string) => {
    try {
      await api.post('/api/jobs/unlike/', { job_id: jobId });
      setSavedJobOffers((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId)); // Retirer le job de la liste
    } catch (error) {
      console.error('Error unliking job:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex flex-col p-6 sm:p-12">
          <div className="flex items-center mb-4">
            <Link to="/jobs" className="text-gray-500 hover:text-gray-900 mr-4">
              <FiArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl xl:text-3xl font-extrabold">Saved Jobs</h1>
          </div>

          {loading ? (
            <p className="text-gray-700 mt-4">Loading...</p>
          ) : savedJobOffers.length === 0 ? (
            <p className="text-gray-700 mt-4">You have no saved jobs.</p>
          ) : (
            <div className="mt-6">
              {savedJobOffers.map((job) => (
                <div key={job.job_id} className="border-b border-gray-300 pb-4 mb-4">
                  <h2 className="text-xl font-semibold">{job.role}</h2>
                  <p className="text-gray-600">{job.company_name} - {job.location}</p>
                  <p className="text-gray-600 mt-2">{job.text}</p>
                  <Link to={`/jobs/${job.job_id}`} className="text-indigo-600 hover:underline">
                    View Details
                  </Link>
                  <button
                    className="ml-4"
                    onClick={() => handleUnlike(job.job_id)} // Appel de la fonction handleUnlike
                  >
                    <FiHeart color="red" /> {/* Couleur rouge pour le cœur */}
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
