// src/components/StudentForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './form.css';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    photo: '',
    year: '',
    department: ''
  });

  const [departments, setDepartments] = useState([]);

//   useEffect(() => {
//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get('http://localhost:9090/api/admin/departments');
//       console.log('API response:', response.data);
//       if (response.data && Array.isArray(response.data.departments)) {
//           setDepartments(response.data.departments);}
//       else {
//           console.error('The response data is not an array:', response.data);
//         }
//     } catch (error) {
//       console.error('There was an error fetching the departments!', error);
//     }
//   };
//   fetchDepartments();
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

    axios.post('/admin/students', formDataToSend)
      .then(response => {
        alert('Student added successfully!');
      })
      .catch(error => {
        console.error('There was an error adding the student!', error);
      });
  };

  return (
    <>
    <h1>Add Student</h1>
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
        <label>Year</label>
        <select name="year" value={formData.year} onChange={handleChange} required>
          <option value="">Select Year</option>
          <option value="fresher">Fresher</option>
          <option value="sophomore">Sophomore</option>
          <option value="prefinal">Pre-final</option>
          <option value="final">Final</option>
        </select>
      </div>
      <div>
        <label>Department</label>
        <select name="department" value={formData.department} onChange={handleChange} required>
          <option value="">Select Department</option>
          
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
        </select>
      </div>
      <button type="submit">Add Student</button>
    </form>
    </>
  );
};

export default StudentForm;
