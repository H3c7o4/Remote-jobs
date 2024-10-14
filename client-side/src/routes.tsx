import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import JobList from './pages/JobList';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import JobOfferDetails from './pages/JobOfferDetails';
import SavedJobs from './pages/SavedJobs';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import AccountActivation from './pages/AccountActivation';
import SignUpSuccess from './pages/SignUpSuccess';

const AppRoutes: React.FC = () => {
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
            element: <PrivateRoute element={<ProfilePage />} />,
        },
        {
            path: '/jobs/:jobId',
            element: <PrivateRoute element={<JobOfferDetails />} />,
        },
        {
            path: '/jobs',
            element: <PrivateRoute element={<JobList />} />,
        },
        {
            path: '/saved-jobs',
            element: <PrivateRoute element={<SavedJobs />} />,
        },
        {
            path: '/auth/activate/',
            element: <AccountActivation />,
        },
        {
            path: '/signup-success',
            element: <SignUpSuccess />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default AppRoutes;
