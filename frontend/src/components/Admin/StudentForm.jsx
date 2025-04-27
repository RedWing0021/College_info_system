import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './form.css';

const StudentForm = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    photo: '',
    year: '',
    departmentName: ''
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const formRef = useRef(null);

  // If editing, populate formData
  useEffect(() => {
    if (initialData) {
      setFormData({
        username: initialData.username || '',
        password: '',
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        photo: initialData.photo || '',
        year: initialData.year || '',
        department: initialData.department || ''
      });
    }
  }, [initialData]);

  // Close on outside click
  useEffect(() => {
    if (!onClose) return;

    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Load departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:8083/api/department');
        setDepartments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching departments:', err);
        setError('Failed to load departments');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, name, email, phone, year, department, photo } = formData;
    if (!username || !name || !email || !phone || !year || !department || !photo) {
      setError('Please fill all required fields.');
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    const isUpdate = Boolean(initialData);
    const url = isUpdate
      ? `http://localhost:8083/api/admin/student/${initialData.id}`
      : 'http://localhost:8083/api/admin/student-create';

    const method = isUpdate ? 'put' : 'post';

    try {
      setLoading(true);
      await axios({
        method,
        url,
        data: formDataToSend,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert(isUpdate ? 'Student updated successfully!' : 'Student added successfully!');
      setFormData({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        photo: '',
        year: '',
        department: ''
      });

      if (typeof onClose === 'function') {
        onClose();
      } else {
        navigate('/admin-dashboard');
      }
    } catch (err) {
      console.error('Error saving student:', err);
      setError('Failed to save student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="form-container" ref={formRef}>
        <div className="form-header">
          <h2>{initialData ? 'Update Student' : 'Add New Student'}</h2>
          <button
            onClick={() => onClose ? onClose() : navigate('/admin-dashboard')}
            className="close-button"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          {['username', 'password', 'name', 'email', 'phone'].map((field) => (
            <div key={field}>
              <label className="label" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field}
                required
                className="input"
              />
            </div>
          ))}
          <div>
            <label className="label" htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              className="file-input"
              required={!initialData}
            />
          </div>
          <div>
            <label className="label" htmlFor="year">Year</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select Year</option>
              <option value="fresher">Fresher</option>
              <option value="sophomore">Sophomore</option>
              <option value="prefinal">Pre-final Year</option>
              <option value="final">Final Year</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Select Department</option>
              {departments.map((dept, idx) => (
                <option key={idx} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Submitting...' : initialData ? 'Update Student' : 'Add Student'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
