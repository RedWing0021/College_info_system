import React, { useState, useEffect } from 'react';
import './view.css';
import StudentForm from './StudentForm';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null); // Optional: for future update form

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8083/api/admin/student", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStudents(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        setError('Failed to load students. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    setConfirmId(id);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:8083/api/admin/student-delete/${confirmId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete student');
        }
        setStudents(students.filter(student => student.id !== confirmId));
        setConfirmId(null);
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student); // For future StudentForm use
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
          {students.map(student => (
            <tr key={student.id} className="border-b">
              <td className="p-2">
                <img
                  src={student.photo || 'https://via.placeholder.com/50'}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="p-2">{student.username}</td>
              <td className="p-2">{student.name}</td>
              <td className="p-2">{student.email}</td>
              <td className="p-2">{student.phone}</td>
              <td className="p-2">{student.departmentName}</td>
              <td className="p-2">
                <button
                  onClick={() => handleUpdate(student)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(student.id)}
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
            <p className="mb-4 text-black">Are you sure you want to delete this student?</p>
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
      
      {selectedStudent && (
        <StudentForm
          initialData={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default ViewStudents;
