import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TournamentForm from '../components/TournamentForm';

const EditTournament = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tournaments/${id}`)
      .then(res => setInitialData(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSave = async (formData) => {
    try {
      await axios.put(`http://localhost:5000/api/tournaments/${id}`, formData);
      alert('✅ Torneo actualizado');
      navigate('/manage');
    } catch (err) {
      console.error(err);
      alert('❌ Error al actualizar');
    }
  };

  return initialData ? (
    <TournamentForm initialData={initialData} onSave={handleSave} />
  ) : (
    <p>Cargando datos del torneo...</p>
  );
};

export default EditTournament;
