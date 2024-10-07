import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fonction pour créer un élément de marqueur personnalisé
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
    const [position, setPosition] = useState<[number, number] | null>(null);
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTInuePRo7d7n69MURSQr0gEUevhy3sT6yvVQ&s';

    // Utilitaire pour centrer la carte sur le marqueur
    const MapView: React.FC<{ position: [number, number] | null }> = ({ position }) => {
        const map = useMap();

        useEffect(() => {
            if (position) {
                map.setView(position, 13); // Centrer la carte sur la position
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
                        <Popup>Bonjour, je m'appelle Hector !</Popup>
                    </Marker>
                    <MapView position={position} /> {/* Centrer la carte sur le marqueur */}
                </>
            )}
        </MapContainer>
    );
};

export default Map;
