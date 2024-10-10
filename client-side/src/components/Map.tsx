import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useAuth } from '../context/AuthContext';
import api from '../services/api'; // Assurez-vous que le service API est importé
import { Link } from 'react-router-dom'; // Importer Link pour la navigation

// Type pour les offres d'emploi
interface Job {
    id: string;
    role: string;
    company_name: string;
    location: string;
    logo: string;
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

const Map: React.FC = () => {
    const { isAuthenticated, user } = useAuth();
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const imageUrl = user?.profile_pic || 'defaultImageUrl'; // Utiliser l'image de profil de l'utilisateur

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
                    fetchJobs(); // Appeler fetchJobs avec la position actuelle
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

    const fetchJobs = async () => {
        try {
            const response = await api.get<Job[]>('/api/jobs/');
            setJobs(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des jobs", error);
        }
    };

    if (!isAuthenticated) return null; // Ne pas afficher la carte si l'utilisateur n'est pas authentifié

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
                    {jobs.map(job => (
                        // Ajout de marqueurs pour chaque job
                        <Marker
                            key={job.id}
                            position={[position[0] + (Math.random() - 0.5) * 0.1, position[1] + (Math.random() - 0.5) * 0.1]} // Éparpiller les offres autour de l'utilisateur
                            icon={L.divIcon({ className: 'custom-marker', html: createCustomMarker('https://www.clipartmax.com/png/middle/283-2833048_small-business-logo-icon-company-name-icon.png') })} 
                        >
                            <Popup>
                                <Link to={`/jobs/${job.id}`}>
                                    {job.role} at {job.company_name} <br />
                                    Location: {job.location}
                                </Link>
                            </Popup>
                        </Marker>
                    ))}
                    <MapView position={position} />
                </>
            )}
        </MapContainer>
    );
};

export default Map;
