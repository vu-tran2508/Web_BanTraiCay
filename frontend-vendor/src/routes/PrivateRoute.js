// routes/PrivateRoute.js
import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ element }) => {
  console.log('PrivateRoute');
  useEffect(() => {
    console.log('PrivateRoute useEffect');
    const checkLoginStatus = async () => {
      const currentUser = AuthService.getCurrentUser();

      if (!currentUser || !currentUser.accessToken) {
        console.log('Redirecting to /alogin');
        return <Navigate to="/alogin" />;
      }

      const decodedToken = jwtDecode(currentUser.accessToken);
      console.log('decodedToken', decodedToken);

      if (!decodedToken || !(decodedToken.roles.includes('ROLE_STAFF') || decodedToken.roles.includes('ROLE_ADMIN'))) {
        console.log('Redirecting to /403');
        return <Navigate to="/403" />;
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Routes>
      {/* Define all admin routes here */}
      <Route path="/" element={element} />
    </Routes>
  );
};

export default PrivateRoute;
