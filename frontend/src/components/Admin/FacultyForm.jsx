// src/components/StudentForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './form.css';

const FacultyFrom = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    photo: '',
    officehours: '',
    department: ''
  });

  const [departments, setDepartments] = useState([]);

  // useEffect(() => {
  //   // Fetch departments from backend
  //   axios.get('/api/admin/departments')
  //     .then(response => {
  //       setDepartments(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the departments!', error);
  //     });
  // }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to backend
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    axios.post('/api/admin/faculty', formDataToSend)
      .then(response => {
        alert('Faculty added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the faculty!', error);
      });
  };

  return (
    <>
    <h1>Add Faculty</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div>
        <label>Photo</label>
        <input type="file" name="photo" onChange={handleFileChange} required />
      </div>
      <div>
        <label>Office Hours</label>
        <input type="text" name="officehours" value={formData.officehours} onChange={handleChange} required />
      </div>
      <div>
        <label>Department</label>
        <select name="department" value={formData.department} onChange={handleChange} required>
          <option value="">Select Department</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Add Faculty</button>
    </form>
    </>
  );
};

export default FacultyFrom;
