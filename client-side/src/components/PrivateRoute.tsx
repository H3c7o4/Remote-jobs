// src/components/PrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: JSX.Element;
    isAuthenticated: boolean; // Propriété pour vérifier l'authentification
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;