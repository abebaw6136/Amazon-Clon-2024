import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    // Only redirect when user state is resolved (not undefined = still loading)
    // If user is null (explicitly logged out), redirect to auth
    if (user === null) {
      navigate('/auth', { 
        state: { 
          msg: msg || 'You must be logged in to access this page',
          redirect: redirect || location.pathname 
        } 
      });
    }
  }, [user, msg, redirect, navigate, location]);

  // Show loading while authentication state is being resolved (user === undefined)
  if (user === undefined) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  // If user is authenticated (not null and not undefined), render children
  return user ? children : null;
};

export default ProtectedRoute;
