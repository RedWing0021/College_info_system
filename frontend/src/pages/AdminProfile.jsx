import React from 'react'
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/Admin/StudentForm'
import ViewStudents from '../components/Admin/ViewStudent'
import ViewFaculty from '../components/Admin/ViewFaculty'

const AdminProfile = () => {
  const navigate = useNavigate();

  const goToAddStudentForm = () => {
    navigate('/admin-dashboard/add-student');
  };

  const goToAddFacultyForm = () => {
    navigate('/admin-dashboard/add-faculty');
  };

  return (
    <div>
    <h1>AdminProfile</h1>
    <ViewStudents/>
    <button onClick={goToAddStudentForm}>Add Student</button>
    <ViewFaculty/>
    <button onClick={goToAddFacultyForm}>Add Faculty</button>
    </div>
  )
}

export default AdminProfile