import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import './view.css'

const ViewFaculty = () => {
  const [facultys, setFacultys] = useState([]);

  useEffect(() => {
    // Fetch students from API or any data source
    fetch('http://localhost:8080/api/admin/faculty')
      .then(response => response.json())
      .then(data => setFacultys(data))
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  const handleDelete = (id) => {
    // Delete student API call
    fetch(`/api/faculty/${id}`, { method: 'DELETE' })
      .then(() => {
        setFacultys(facultys.filter(faculty => faculty.id !== id));
      })
      .catch(error => console.error('Error deleting faculty:', error));
  };

  return (
    <div className="container">
      <h2>Faculty List</h2>
      <table class='table'>
        <thead class='thead-dark'>
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
          {facultys.map(faculty => (
            <tr key={faculty.id}>
              <td>{faculty.username}</td>
              <td>{faculty.photo}</td>
              <td>{faculty.name}</td>
              <td>{faculty.email}</td>
              <td>{faculty.phone}</td>
              <td>{faculty.departmentName}</td>
              <td>
                <Link to={`admin-dashboard/update/${faculty.id}`}>
                  <button>Update</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(faculty.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFaculty;
