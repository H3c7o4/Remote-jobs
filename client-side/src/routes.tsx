// src/routes.tsx

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import Map from './components/Map';
import NotFound from './pages/NotFound';
import JobList from './pages/JobList';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import JobOfferDetails from './pages/JobOfferDetails';
import SavedJobs from './pages/SavedJobs';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './components/PrivateRoute';

const AppRoutes: React.FC = () => {
    const isAuthenticated = false; // Remplacez ceci par votre logique d'authentification

    const router = createBrowserRouter([
        {
            path: '/',
            element: <LandingPage />,
            errorElement: <NotFound />,
        },
        {
            path: '/signin',
            element: <SignIn />,
        },
        {
            path: '/signup',
            element: <SignUp />,
        },
        {
            path: '/profile/:userId',
            element: <PrivateRoute element={<ProfilePage />} isAuthenticated={isAuthenticated} />,
        },
        {
            path: '/jobs/:jobId',
            element: <PrivateRoute element={<JobOfferDetails />} isAuthenticated={isAuthenticated} />,
        },
        {
            path: '/map',
            element: <PrivateRoute element={<Map />} isAuthenticated={isAuthenticated} />,
        },
        {
            path: '/jobs',
            element: <PrivateRoute element={<JobList />} isAuthenticated={isAuthenticated} />,
        },
        {
            path: '/saved-jobs',
            element: <PrivateRoute element={<SavedJobs />} isAuthenticated={isAuthenticated} />,
        },
    ]);

    return (
        <RouterProvider router={router}/>
    );
};

export default AppRoutes;
