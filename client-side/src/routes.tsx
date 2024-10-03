// src/routes.tsx

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import ProfilePage from './pages/ProfilePage';
import Map from './pages/Map';
import NotFound from './pages/NotFound';
import JobList from './pages/JobList';

const AppRoutes: React.FC = () => {
    const router = createBrowserRouter([{
        path: '/',
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: '/profile/:userId',
        element: <ProfilePage />,
    },
    {
        path: '/job/:jobId',
        element: <JobDetails />,
    },
    {
        path: '/map',
        element: <Map />,
    },
    {
        path: '/jobs',
        element: <JobList />,
    }
]);
    return (
        <RouterProvider router={router}/>
    );
};

export default AppRoutes;
