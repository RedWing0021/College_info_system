import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './view.css'

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students from API or any data source
    fetch("http://localhost:8080/api/admin/student")
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleDelete = (id) => {
    // Delete student API call
    fetch(`/admin/students/${id}`, { method: 'DELETE' })
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  return (
    <div className="container">
      <h2>Students List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.username}</td>
              <td>{student.photo}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.departmentName}</td>
              <td>
                <Link to={`/admin-dashboard/update/${student.id}`}>
                  <button>Update</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudents;
