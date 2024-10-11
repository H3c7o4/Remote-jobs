import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (params: { position: string; city: string; country: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [position, setPosition] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isLoading, setIsLoading] = useState(false); // État pour gérer le chargement

    const handleSearchClick = () => {
        if (!position) {
            alert("Veuillez entrer le poste.");
            return;
        }

        setIsLoading(true); // Démarrer le chargement
        onSearch({ position, city, country });

        // Simuler un délai de 5 secondes pour la recherche
        setTimeout(() => {
            setIsLoading(false); // Réinitialiser le bouton après 5 secondes
        }, 5000);
    };

    return (
        <div className="bg-white shadow-md rounded-md p-4 flex flex-wrap justify-center space-x-2">
            <input
                type="text"
                placeholder="Job Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full md:w-auto md:min-w-[150px]"
            />
            <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full md:w-auto md:min-w-[150px]"
            />
            <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full md:w-auto md:min-w-[150px]"
            />
            <button
                onClick={handleSearchClick}
                className="bg-indigo-600 text-white rounded-md px-4 py-2 mt-2 md:mt-0"
                disabled={isLoading} // Désactive le bouton pendant le chargement
            >
                {isLoading ? 'Searching...' : 'Search'} {/* Changer le texte du bouton */}
            </button>
        </div>
    );
};

export default SearchBar;
