import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import FacultyProfile from './pages/FacultyProfile';
import AdminProfile from './pages/AdminProfile';
import StudentDashboard from './pages/StudentProfile';
import StudentForm from './components/Admin/StudentForm';
import FacultyFrom from './components/Admin/FacultyForm';
import ViewStudents from './components/Admin/ViewFaculty';
// import ViewFaculty from './components/ViewFaculty';
// import UpdateStudent from './components/UpdateStudent';
// import UpdateFaculty from './components/UpdateFaculty';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyProfile />} />
        <Route path="/admin-dashboard" element={<AdminProfile />} />
        <Route path="/admin-dashboard/add-student" element={<StudentForm />} />
        <Route path="/admin-dashboard/add-faculty" element={<FacultyFrom />} />
        {/* <Route path="/admin-dashboard/view-student" element={<ViewStudents />} />
        <Route path="/admin-dashboard/view-faculty" element={<ViewFaculty />} /> */}
        {/* <Route path="/admin-dashboard/update-student/:id" element={<UpdateStudent />} />
        <Route path="/admin-dashboard/update-faculty/:id" element={<UpdateFaculty />} /> */}


        {/* Add routes for dashboards here */}
      </Routes>
    </Router>
  );
};

export default App;
