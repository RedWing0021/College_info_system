// src/routes/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* <Route path="/student/:id" element={<StudentProfile />} />
        <Route path="/faculty/:id" element={<FacultyProfile />} />
        <Route path="/admin/:id" element={<AdminProfile />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="/departments/:id" element={<DepartmentPage />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
