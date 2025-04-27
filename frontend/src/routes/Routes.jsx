// src/routes/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AdminProfile from '../pages/AdminProfile';
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
      path="/*"
      element={
        <PrivateRoute>
          <Routes>
            <Route path="/admin-dashboard" element={<AdminProfile />} />
            <Route path="/admin-dashboard/add-student" element={<StudentForm />} />
            <Route path="/admin-dashboard/add-faculty" element={<FacultyForm />} />
            {/* You can continue adding more protected routes here */}
          </Routes>
        </PrivateRoute>
      }
    />

        {/* Add more protected routes the same way */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
