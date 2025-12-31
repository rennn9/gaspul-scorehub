import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return children;
}
