import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import JobListComponent from '../components/JobListComponent';
import Footer from '../components/Footer';

const JobList: React.FC = () => {
    const [searchParams, setSearchParams] = useState({
        position: '',
        city: '',
        country: '',
    });

    const handleSearch = (params: { position: string; city: string; country: string }) => {
        setSearchParams(params);
    };

    return (
        <div className="relative">
            <Navbar />
            <div className="flex justify-center mt-4 mb-4">
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex flex-col lg:flex-row h-screen">
                <div className="flex-1">
                    <Map searchParams={searchParams} />
                </div>
                <div className="w-full lg:w-1/3 h-96 lg:h-auto overflow-y-auto">
                    <JobListComponent searchParams={searchParams} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default JobList;
