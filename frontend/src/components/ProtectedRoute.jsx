// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f0f0f' }}>
        <div style={{ color: '#d4a574', fontFamily: 'Lato, sans-serif', fontSize: '1.1rem', letterSpacing: '2px' }}>
          LOADING...
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
};

export default ProtectedRoute;