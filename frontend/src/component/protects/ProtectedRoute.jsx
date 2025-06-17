// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PropTypes } from 'prop-types';

const ProtectedRoute = ({ allowedRoles }) => {
    const { role } = useAuth();

    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

ProtectedRoute.propTypes = {
    allowedRoles: PropTypes.array.isRequired,
};

export default ProtectedRoute;
