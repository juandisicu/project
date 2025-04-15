import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TournamentForm from '../components/TournamentForm';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const handleSave = async (formData) => {
    try {
      await axios.post('http://localhost:5000/api/tournaments', formData);
      alert('✅ Tournament registered successfully');
      navigate('/');
    } catch (error) {
      console.error('❌ Error we could not register the tournament:', error);
      alert('There was an error while registering the tournament');
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-heading">Register a New Tournament</h1>
      <TournamentForm onSave={handleSave} />
    </div>
  );
};

export default Register;