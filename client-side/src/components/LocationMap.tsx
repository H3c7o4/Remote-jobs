import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface LocationMapProps {
  latitude: number;
  longitude: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude }) => {
  const mapRef = useRef<L.Map | null>(null); // Référence à l'instance de la carte

  useEffect(() => {
    // Initialisation de la carte si elle n'est pas déjà créée
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([latitude, longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      L.marker([latitude, longitude]).addTo(mapRef.current);
    } else {
      // Si la carte existe déjà, mettre à jour la vue
      mapRef.current.setView([latitude, longitude], 13);
      L.marker([latitude, longitude]).addTo(mapRef.current);
    }

    // Fonction de nettoyage pour détruire la carte lorsque le composant est démonté
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // Cela supprimera la carte
        mapRef.current = null; // Réinitialise la référence
      }
    };
  }, [latitude, longitude]);

  return <div id="map" className="h-64 w-full rounded-md" />;
};

export default LocationMap;
