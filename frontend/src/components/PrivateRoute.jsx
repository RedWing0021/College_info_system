// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
   const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
  }, []);

  if (isAuth === null) return null; // Prevent flash
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
