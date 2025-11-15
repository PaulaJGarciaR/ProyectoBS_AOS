import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-indigo-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          <p className="text-white mt-4 text-xl">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-indigo-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          <p className="text-white mt-4 text-xl">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return (
      <div className="flex justify-center items-center h-screen bg-indigo-950">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
          <p className="text-gray-700 mb-6">
            No tienes permisos suficientes para acceder a esta página.
          </p>
           <a href="/dashboard"
            className="bg-indigo-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-600 transition-colors inline-block">
            Volver al Dashboard
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-indigo-950">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          <p className="text-white mt-4 text-xl">Cargando...</p>
        </div>
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};