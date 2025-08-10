import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/auth';

export default function RequireAuth({ children }) {
  const token = localStorage.getItem('site_token');
  const location = useLocation();

  // Always call useQuery, but skip execution if no token
  const { data, loading } = useQuery(ME, {
    fetchPolicy: 'network-only',
    skip: !token, // Apollo will skip the request if true
  });

  // No token at all → straight to login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Token present, but still loading verification
  if (loading) {
    return <p>Checking authentication...</p>;
  }

  // Token present, but invalid according to backend
  if (!data?.me) {
    localStorage.removeItem('site_token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // All good → render protected content
  return children;
}
