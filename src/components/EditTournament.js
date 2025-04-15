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
      alert('✅ Tournament updated');
      navigate('/manage');
    } catch (err) {
      console.error(err);
      alert('❌ Error while updating');
    }
  };

  return initialData ? (
    <TournamentForm initialData={initialData} onSave={handleSave} />
  ) : (
    <p>Loading Tournament...</p>
  );
};

export default EditTournament;
