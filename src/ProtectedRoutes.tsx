import { Outlet, Navigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';

export const ProtectedRoutes = () => {
  const [token, _setToken] = useLocalStorage('token', '');

  return token ? <Outlet /> : <Navigate to="/login" />;
};
