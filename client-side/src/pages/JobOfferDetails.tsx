import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext'; // Authentification
import api from '../services/api'; // Service API pour les requêtes

// Interface pour les détails du job
interface JobDetails {
  id: string;
  role: string;
  company_name: string;
  location: string;
  remote: boolean;
  url: string;
  text: string;
  date_posted: string;
  keywords: string[];
}

const JobOfferDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>(); // Récupérer le jobId depuis l'URL
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null); // État pour les détails du job
  const [isSaved, setIsSaved] = useState(false); // État pour sauvegarder l'offre
  const { isAuthenticated, loading } = useAuth(); // Vérifier l'authentification
  const navigate = useNavigate();

  useEffect(() => {
    // Fonction pour récupérer les détails de l'offre d'emploi
    const fetchJobDetails = async () => {
      if (!isAuthenticated) {
        navigate('/login'); // Rediriger vers la page de connexion si non authentifié
        return;
      }

      try {
        const response = await api.get(`/api/jobs/?id=${jobId}`);
        const job = response.data.find((job: JobDetails) => job.id === jobId);
        setJobDetails(job);
      } catch (error) {
        console.error('Erreur lors du chargement des détails du job:', error);
      }
    };

    fetchJobDetails();
  }, [jobId, isAuthenticated, navigate]);

  const handleHeartClick = async () => {
    try {
      if (!isSaved) {
        // Requête pour "liker" l'offre d'emploi
        await api.post('/api/jobs/like/', { job_id: jobId });
      } else {
        // Requête pour "unliker" l'offre d'emploi
        await api.post('/api/jobs/unlike/', { job_id: jobId });
      }
      setIsSaved(!isSaved); // Inverser l'état
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'offre:', error);
    }
  };

  // Si l'utilisateur est en cours de chargement ou non authentifié
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si aucune donnée n'est trouvée pour ce job
  if (!jobDetails) {
    return <div>Job Offer Not found</div>;
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex items-center mb-4">
              <Link to="/jobs" className="text-gray-500 hover:text-gray-900 mr-4">
                <FiArrowLeft size={24} />
              </Link>
              <h1 className="text-2xl xl:text-3xl font-extrabold">{jobDetails.role}</h1>
              <button className="ml-4 text-gray-500 hover:text-gray-900" onClick={handleHeartClick}>
                <FiHeart size={24} color={isSaved ? 'red' : 'currentColor'} />
              </button>
            </div>
            <div>
              <p className="text-gray-600 text-sm">{jobDetails.company_name} - {jobDetails.location}</p>
              <p className="text-gray-600 text-sm mt-2">Remote: {jobDetails.remote ? 'Yes' : 'No'}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Job Description</h2>
              <p className="text-gray-700 mt-2">{jobDetails.text}</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Keywords</h2>
              <ul className="list-disc ml-5 mt-2 text-gray-700">
                {jobDetails.keywords.map((keyword, index) => (
                  <li key={index}>{keyword}</li>
                ))}
              </ul>
            </div>
            {/* Lien vers l'application */}
            <Link to={jobDetails.url}>
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
