import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import api from '../services/api';

interface Job {
    id: string;
    role: string;
    company_name: string;
    location: string;
    isLiked: boolean;  // Ajout d'une propriété pour savoir si le job est liké
}

interface JobListComponentProps {
    searchParams: {
        position: string;
        city: string;
        country: string;
    };
}

const JobListComponent: React.FC<JobListComponentProps> = ({ searchParams }) => {
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        if (searchParams.position) {
            fetchJobsWithParams();
        } else {
            fetchJobs();
        }
    }, [searchParams]);

    const fetchJobs = async () => {
        try {
            const response = await api.get<Job[]>('/api/jobs/');
            setJobs(response.data.map(job => ({ ...job, isLiked: false }))); // Initialement, tous les jobs sont non-likés
        } catch (error) {
            console.error("Erreur lors de la récupération des jobs", error);
        }
    };

    const fetchJobsWithParams = async () => {
        const { position, city, country } = searchParams;
        const location = city ? city : country;
        try {
            const response = await api.get<Job[]>(`/api/jobs/?search=${position}&location=${location}`);
            setJobs(response.data.map(job => ({ ...job, isLiked: false }))); // Initialement, tous les jobs sont non-likés
        } catch (error) {
            console.error("Erreur lors de la récupération des jobs avec paramètres", error);
        }
    };

    const handleLike = async (jobId: string, isLiked: boolean) => {
        try {
            const endpoint = isLiked ? '/api/jobs/unlike/' : '/api/jobs/like/';
            await api.post(endpoint, { job_id: jobId });
            setJobs(prevJobs => prevJobs.map(job =>
                job.id === jobId ? { ...job, isLiked: !isLiked } : job
            ));
        } catch (error) {
            console.error("Erreur lors de l'opération de like/unlike", error);
        }
    };

    return (
        <div className="p-4 space-y-4">
            {jobs.map(job => (
                <div key={job.id} className="border p-4 rounded-md shadow-md hover:bg-gray-100">
                    <div className="flex justify-between">
                        <div>
                            <Link to={`/jobs/${job.id}`} className="text-lg font-bold">{job.role}</Link>
                            <p className="text-sm text-gray-500">{job.company_name}</p>
                            <p className="text-sm text-gray-500">{job.location}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className={`text-gray-600 hover:text-red-500 ${job.isLiked ? 'text-red-500' : ''}`}
                                onClick={() => handleLike(job.id, job.isLiked)}
                            >
                                <FiHeart size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default JobListComponent;
