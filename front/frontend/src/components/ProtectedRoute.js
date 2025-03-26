import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider'; 

const ProtectedRoute = ({ element }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    if (!user || !user.email) { //this was !user.username before now changed to email ,works either way
        return <Navigate to="/logino" state={{ path: location.pathname }} replace />;
    }

    return element;
};

export default ProtectedRoute;