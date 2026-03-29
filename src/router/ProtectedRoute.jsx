import { Navigate } from 'react-router-dom';
import { authStore } from '../store/auth.store';

const ProtectedRoute = ({ children, requiredRole }) => {
  if (!authStore.isAuthenticated()) return <Navigate to="/login" replace />;
  if (requiredRole && !authStore.hasRole(requiredRole)) return <Navigate to="/unauthorized" replace />;
  return children;
};

export default ProtectedRoute;