import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Icône personnalisée pour le marqueur de l'utilisateur
const customIcon = new L.Icon({
  iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDG_1fxbcq_utPXP5rxU-7oQ5OIjaQqu-mN8-B_cLaIZGHnMY4Vlel2A_vmA2URZvenxo&usqp=CAU',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

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
          enableHighAccuracy: true, // Permet d'avoir une précision maximale
          timeout: 5000, // Temps d'attente maximum avant l'erreur
          maximumAge: 0, // Ne pas utiliser de cache
        }
      );
    }
  }, []);

  return (
      <MapContainer
      center={position || [51.505, -0.09]} // Position par défaut si la géolocalisation échoue
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

      {position && (
        <Marker position={position} icon={customIcon}>
          <Popup>Bonjour, je m'appelle Hector !</Popup>
        </Marker>
      )}
     </MapContainer>
    
  );
};

export default Map;
