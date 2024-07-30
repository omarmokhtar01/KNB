import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const isAuthenticated = () => {
    return !!Cookies.get('token');
};

const getUserRole = () => {
    const role = Cookies.get('role');
    return role ? JSON.parse(role) : null;
};

const ProtectedRoute = ({ element, requiredRole }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    const userRole = getUserRole();

    if (requiredRole && requiredRole !== userRole) {
        return <Navigate to="/unauthorized" />;
    }

    return element;
};

export default ProtectedRoute;
