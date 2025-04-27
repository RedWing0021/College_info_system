import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ViewStudents from '../components/Admin/ViewStudent';
import ViewFaculty from '../components/Admin/ViewFaculty';
import StudentForm from '../components/Admin/StudentForm';
import FacultyForm from '../components/Admin/FacultyForm';
import './AdminProfile.css';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  const [activeView, setActiveView] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const getUsernameFromToken = (token) => {
    try {
      const cleanToken = token.replace('Bearer ', '');
      const decoded = jwtDecode(cleanToken);
      return decoded.sub || decoded.username;
    } catch (err) {
      console.error('Invalid token decode:', err);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const username = getUsernameFromToken(token);
    if (!username) {
      navigate('/login', { replace: true });
      return;
    }

    fetch(`http://localhost:8083/api/admin/profile/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setAdminInfo(data);
        setCheckingAuth(false);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
        navigate('/login', { replace: true });
      });
  }, [navigate]);

  const goToAddStudentForm = () => {
    navigate('/admin-dashboard/add-student');
    setActiveView('studentForm');
    setActiveTab(null);
  };

  const goToAddFacultyForm = () => {
    navigate('/admin-dashboard/add-faculty');
    setActiveView('facultyForm');
    setActiveTab(null);
  };

  const handleReturnToList = () => {
    navigate('/admin-dashboard');
    setActiveView(null);
    setActiveTab(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <div className="admin-profile-container">
      <h1>Admin Profile</h1>

      {!checkingAuth && adminInfo && (
        <div className="profile-info">
          <img
            src={adminInfo.photo || 'https://via.placeholder.com/100'}
            alt="Admin Photo"
            className="profile-photo"
          />
          <div>
            <h2>{adminInfo.name}</h2>
            <p>Department: {adminInfo.departmentName}</p>
            <button onClick={handleLogout} className="logout-button">
              Log Out
            </button>
          </div>
        </div>
      )}

      {activeView === null && (
        <div className="tab-container">
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === 'students' ? 'active' : ''}`}
              onClick={() => setActiveTab('students')}
            >
              Students
            </button>
            <button
              className={`tab-button ${activeTab === 'faculty' ? 'active' : ''}`}
              onClick={() => setActiveTab('faculty')}
            >
              Faculty
            </button>
          </div>

          {activeTab === 'students' && (
            <button onClick={goToAddStudentForm} className="add-button">
              Add Student
            </button>
          )}
          {activeTab === 'faculty' && (
            <button onClick={goToAddFacultyForm} className="add-button">
              Add Faculty
            </button>
          )}
        </div>
      )}

      {activeView && (
        <button onClick={handleReturnToList} className="close-button">
          ✕
        </button>
      )}

      {activeView === 'studentForm' && (
        <div className="form-container">
          <StudentForm onClose={handleReturnToList} />
        </div>
      )}

      {activeView === 'facultyForm' && (
        <div className="form-container">
          <FacultyForm onClose={handleReturnToList} />
        </div>
      )}

      {activeView === null && activeTab === 'students' && (
        <div className="table-container">
          <ViewStudents />
        </div>
      )}
      {activeView === null && activeTab === 'faculty' && (
        <div className="table-container">
          <ViewFaculty />
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
