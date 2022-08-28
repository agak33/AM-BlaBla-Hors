import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRoutesNavigation = ({ authRoutes, isValid }) => {
  const location = useLocation();
  if (!isValid) {
    return authRoutes ? (
      <Navigate to="/login" replace state={{ from: location }} />
    ) : (
      <Outlet />
    );
  }
  return authRoutes ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
