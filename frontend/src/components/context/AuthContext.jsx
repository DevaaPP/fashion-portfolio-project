// src/components/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../../api/axiosClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('adminToken', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('adminToken');
    }
  }, [token]);

  useEffect(() => {
    const verify = async () => {
      if (!token) { setLoading(false); return; }
      try {
        const { data } = await api.get('/api/users/me');
        if (data.user?.isAdmin) {
          setUser(data.user);
        } else {
          setToken(null);
          setUser(null);
        }
      } catch {
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []); // eslint-disable-line

  const signup = async (name, email, password, confirmPassword) => {
    const { data } = await api.post('/api/users/signup', {
      name,
      email,
      password,
      confirmPassword,
    });
    if (!data.user?.isAdmin) throw new Error('Not an admin account');
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const login = async (email, password) => {
    const { data } = await api.post('/api/users/login', { email, password });
    if (!data.user?.isAdmin) throw new Error('Not an admin account');
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);