import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './form.css';

const FacultyForm = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    phone: '',
    photo: '',
    officehours: '',
    department: '',
    courses: [{ title: '', description: '' }]
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
  if (initialData) {
    setFormData({
      username: initialData.username || '',
      password: '',
      name: initialData.name || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
      photo: initialData.photo || '',
      officehours: initialData.officehours || '',
      departmentName: initialData.departmentName || '',
      courses: Array.isArray(initialData.courses) && initialData.courses.length > 0
        ? initialData.courses
        : [{ title: '', description: '' }]
    });
  }
}, [initialData]);
  // ✅ Optional: protect against calling onClose when not passed
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

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:8083/api/department');
        setDepartments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setError('Failed to load departments');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

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

  const handleCourseChange = (index, field, value) => {
    const newCourses = [...formData.courses];
    newCourses[index][field] = value;
    setFormData({ ...formData, courses: newCourses });
  };

  const handleAddCourse = () => {
    setFormData({
      ...formData,
      courses: [...formData.courses, { title: '', description: '' }]
    });
  };

  const handleRemoveCourse = (index) => {
    const newCourses = [...formData.courses];
    newCourses.splice(index, 1);
    setFormData({ ...formData, courses: newCourses });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, name, email, phone, photo, officehours, department } = formData;
    if (!username || !name || !email || !phone || !officehours || !department) {
      alert('Please fill all required fields.');
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'courses') {
        formData.courses.forEach((course, index) => {
          formDataToSend.append(`courses[${index}].title`, course.title);
          formDataToSend.append(`courses[${index}].description`, course.description);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
const isUpdate = Boolean(initialData);
    const url = isUpdate
  ? `http://localhost:8083/api/admin/faculty/${initialData.id}`
  : 'http://localhost:8083/api/admin/faculty-create';

const method = isUpdate ? 'put' : 'post';

axios({
  method,
  url,
  data: formDataToSend,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
  
})
      .then(() => {
        alert(initialData ? 'Faculty updated successfully!' : 'Faculty added successfully!');
        setFormData({
          username: '',
          password: '',
          name: '',
          email: '',
          phone: '',
          photo: '',
          officehours: '',
          department: '',
          courses: [{ title: '', description: '' }]
        });

        if (typeof onClose === 'function') {
          onClose();
        } else {
          navigate('/admin-dashboard');
        }
      })
      .catch((error) => {
        console.error('Error saving faculty:', error);
        setError('Failed to save faculty. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="modal-overlay">
      <div className="form-container" ref={formRef}>
        <div className="form-header">
          <h2>{initialData ? 'Update Faculty' : 'Add New Faculty'}</h2>
          <button
            onClick={() => {
              if (typeof onClose === 'function') {
                onClose();
              } else {
                navigate('/admin-dashboard');
              }
            }}
            className="close-button"
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="officehours">Office Hours</label>
            <input
              type="text"
              id="officehours"
              name="officehours"
              value={formData.officehours}
              onChange={handleChange}
              placeholder="Office Hours"
              required
              className="input"
            />
          </div>
          <div>
            <label className="label" htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              required
              className="file-input"
            />
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

          <div className="course-section">
            <div className="course-header">
              <label>Courses</label>
              <div className="course-buttons">
                {formData.courses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCourse(formData.courses.length - 1)}
                    className="course-button remove"
                  >
                    − Remove
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleAddCourse}
                  className="course-button add"
                >
                  + Add Course
                </button>
              </div>
            </div>
            {Array.isArray(formData.courses) && formData.courses.length > 0 && formData.courses.map((course, index) => (
  <div key={index} className="course-item">
    <div>
      <label className="label" htmlFor={`course-title-${index}`}>Course Title</label>
      <input
        type="text"
        id={`course-title-${index}`}
        placeholder="Course Title"
        value={course.title}
        onChange={(e) => handleCourseChange(index, 'title', e.target.value)}
        className="input"
        required
      />
    </div>
    <div>
      <label className="label" htmlFor={`course-description-${index}`}>Course Description</label>
      <input
        type="text"
        id={`course-description-${index}`}
        placeholder="Course Description"
        value={course.description}
        onChange={(e) => handleCourseChange(index, 'description', e.target.value)}
        className="input"
        required
      />
    </div>

    {/* 🗑️ Delete Button for Each Course */}
    <button
      type="button"
      className="delete-course-btn"
      onClick={() => handleRemoveCourse(index)}
    >
      Delete
    </button>
  </div>
))}

          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Submitting...' : 'Add Faculty'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacultyForm;
