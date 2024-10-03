// LocationMap.tsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface LocationMapProps {
  location: string;
  latitude: number;
  longitude: number;
}

const LocationMap: React.FC<LocationMapProps> = ({ location, latitude, longitude }) => {
  const mapRef = useRef<L.Map | null>(null); // Référence à l'instance de la carte

  useEffect(() => {
    // Initialisation de la carte si elle n'est pas déjà créée
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([latitude, longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      L.marker([latitude, longitude]).addTo(mapRef.current).bindPopup(location);
    } else {
      // Si la carte existe déjà, mettre à jour la vue
      mapRef.current.setView([latitude, longitude], 13);
      L.marker([latitude, longitude]).addTo(mapRef.current).bindPopup(location);
    }

    // Fonction de nettoyage pour détruire la carte lorsque le composant est démonté
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // Cela supprimera la carte
        mapRef.current = null; // Réinitialise la référence
      }
    };
  }, [latitude, longitude, location]); // Ajoutez `location` comme dépendance

  return (
    <div className="my-10 lg:w-[70%] md:h-[14rem] xs:w-full xs:h-[10rem]">
      <h1 className="w-fit font-serif my-4 pb-1 pr-2 rounded-b-md border-b-4 border-blue-600 dark:border-b-4 dark:border-yellow-600 dark:text-white lg:text-4xl md:text-3xl xs:text-xl">
        My Location
      </h1>
      <div id="map" className="h-64 w-full rounded-md" />
    </div>
  );
};

export default LocationMap;
