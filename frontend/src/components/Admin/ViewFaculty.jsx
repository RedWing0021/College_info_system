import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';
import FacultyForm from './FacultyForm';  // Import FacultyForm component
import './view.css';

const ViewFaculty = () => {
  const [facultys, setFacultys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);  // Add state for the selected faculty

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8083/api/admin/faculty', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFacultys(data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching faculty:', error);
        setError('Failed to load faculty. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    setConfirmId(id); // show modal
  };

  const confirmDelete = () => {
    fetch(`http://localhost:8083/api/admin/faculty-delete/${confirmId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete faculty');
        }
        setFacultys(facultys.filter((faculty) => faculty.id !== confirmId));
        setConfirmId(null); // close modal
      })
      .catch((error) => console.error('Error deleting faculty:', error));
  };

  const handleUpdate = (faculty) => {
    setSelectedFaculty(faculty);  // Set the selected faculty to state
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-4">{error}</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-2">Photo</th>
            <th className="p-2">Username</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Department</th>
            <th className="p-2">Update</th>
            <th className="p-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {facultys.map((faculty) => (
            <tr key={faculty.id} className="border-b">
              <td className="p-2">
                <img
                  src={faculty.photo || 'https://via.placeholder.com/50'}
                  alt={faculty.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="p-2">{faculty.username}</td>
              <td className="p-2">{faculty.name}</td>
              <td className="p-2">{faculty.email}</td>
              <td className="p-2">{faculty.phone}</td>
              <td className="p-2">{faculty.departmentName}</td>
              <td className="p-2">
                <button
                  onClick={() => handleUpdate(faculty)}  // Handle update click
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(faculty.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirmId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center w-full max-w-sm">
            <p className="mb-4 text-black">Are you sure you want to delete this faculty?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setConfirmId(null)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedFaculty && (
        <FacultyForm 
          initialData={selectedFaculty}  // Pass selected faculty data
          onClose={() => setSelectedFaculty(null)}  // Close the form
        />
      )}
    </div>
  );
};

export default ViewFaculty;
