import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserForm from '../components/UserForm';  // We'll need to create a UserForm component for user registration
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const handleSave = async (formData) => {
    try {
      // Validate the form data before sending it (optional)
      if (!formData.username || !formData.email || !formData.password) {
        alert('❌ All fields are required');
        return;
      }

      // Send POST request to backend for user registration
      await axios.post('http://localhost:5000/api/users', formData);

      // Success message and navigate to login page
      alert('✅ User registered successfully');
      navigate('/login');  // Redirect to login after registration
    } catch (error) {
      // Error handling
      console.error('❌ Error: could not register the user:', error);
      alert('There was an error while registering the user. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-heading">Register a New User</h1>
      <UserForm onSave={handleSave} />
    </div>
  );
};

export default Register;