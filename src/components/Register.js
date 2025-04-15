import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TournamentForm from '../components/TournamentForm';

const Register = () => {
  const navigate = useNavigate();

  // Esta es la función que pasamos como prop a TournamentForm
  const handleSave = async (formData) => {
    try {
      await axios.post('http://localhost:5000/api/tournaments', formData);
      alert('✅ Tournament registered succesfully');
      navigate('/');
    } catch (error) {
      console.error('❌ Error we could not register the tournament:', error);
      alert('there was an error while registering the tournament');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Register a new tournament</h1>
      {/* Make sure on save passed correctly */}
      <TournamentForm onSave={handleSave} />
    </div>
  );
};

export default Register;
