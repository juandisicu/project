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
      alert('✅ Tournament registered succesfully ');
      navigate('/');
    } catch (error) {
      console.error('❌ Error al registrar el torneo:', error);
      alert('Hubo un error al registrar el torneo');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Register new tournament</h1>
      {/* Asegúrate de que onSave esté pasando correctamente */}
      <TournamentForm onSave={handleSave} />
    </div>
  );
};

export default Register;
