// src/routes.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import Map from './pages/Map';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/job/:id" element={<JobDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/map" element={<Map />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
