import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Map from './Map';
import Footer from '../components/Footer';

const JobList: React.FC = () => {
    return (
        <div className="relative">
            <Navbar />
            {/* Barre de recherche centrée avec un espacement */}
            <div className="flex justify-center mt-4 mb-4"> {/* Flex pour centrer */}
                <SearchBar />
            </div>
            <Map />
            <Footer />
        </div>
    );
}

export default JobList;
