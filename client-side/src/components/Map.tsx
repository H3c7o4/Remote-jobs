import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';

interface Job {
    id: string;
    role: string;
    company_name: string;
    location: string;
    logo: string | null;
}

const createCustomMarker = (imageUrl: string) => {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md';
    const img = document.createElement('img');
    img.src = imageUrl;
    img.className = 'w-full h-full object-cover';
    markerDiv.appendChild(img);
    return markerDiv;
};

interface MapProps {
    searchParams: {
        position: string;
        city: string;
        country: string;
    };
}

const Map: React.FC<MapProps> = ({ searchParams }) => {
    const { isAuthenticated, user } = useAuth();
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);

    const DefaultJobUrl = 'https://www.pngitem.com/pimgs/m/78-788231_icon-blue-company-icon-png-transparent-png.png';

    const imageUrl = user?.profile_pic || 'defaultImageUrl';

    const MapView: React.FC<{ position: [number, number] | null }> = ({ position }) => {
        const map = useMap();

        useEffect(() => {
            if (position) {
                map.setView(position, 13);
            }
        }, [position, map]);

        return null;
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setPosition([latitude, longitude]);
                    fetchJobs(); // Appeler fetchJobs par défaut
                },
                (error) => {
                    console.error("Erreur lors de la récupération de la position", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        }
    }, []);

    useEffect(() => {
        if (searchParams.position) {
            fetchJobsWithParams();
        } else {
            fetchJobs(); // Appel de la requête GET par défaut
        }
    }, [searchParams]);

    const fetchJobs = async () => {
        try {
            const response = await api.get<Job[]>('/api/jobs/');
            setJobs(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des jobs", error);
        }
    };

    const fetchJobsWithParams = async () => {
        const { position, city, country } = searchParams;

        if (!position) {
            alert("Veuillez entrer le poste.");
            return;
        }

        const location = city ? city : country; // Utiliser uniquement la ville ou le pays s'ils sont fournis

        try {
            const response = await api.get<Job[]>(`/api/jobs/?search=${position}&location=${location}`);
            setJobs(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des jobs avec paramètres", error);
        }
    };

    if (!isAuthenticated) return null;

    return (
        <MapContainer
            center={position || [51.505, -0.09]}
            zoom={13}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {position && (
                <>
                    <Marker position={position} icon={L.divIcon({ className: 'custom-marker', html: createCustomMarker(imageUrl) })}>
                        <Popup>Hello, my name is {user?.first_name}</Popup>
                    </Marker>
                    {jobs.map(job => {
                        const logoUrl = job?.logo || DefaultJobUrl;
                        return (
                            <Marker
                                key={job.id}
                                position={[position[0] + (Math.random() - 0.5) * 0.1, position[1] + (Math.random() - 0.5) * 0.1]}
                                icon={L.divIcon({ className: 'custom-marker', html: createCustomMarker(logoUrl) })} 
                            >
                                <Popup>
                                    <Link to={`/jobs/${job.id}`}>
                                        {job.role} at {job.company_name} <br />
                                        Location: {job.location}
                                    </Link>
                                </Popup>
                            </Marker>
                        );
                    })}
                    <MapView position={position} />
                </>
            )}
        </MapContainer>
    );
};

export default Map;
