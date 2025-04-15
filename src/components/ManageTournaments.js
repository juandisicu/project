import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackToHomeButton from '../components/BackToHomeButton';

const ManageTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  const fetchTournaments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tournaments');
      setTournaments(res.data);
    } catch (error) {
      console.error('❌ Error no info about the tournament:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('are you sure you want to delete this tournament?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/tournaments/${id}`);
      fetchTournaments();
    } catch (error) {
      console.error('❌ Error we can not delete this tournament:', error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div>
      <h2>📋 Tournament Management</h2>
      {tournaments.length === 0 ? (
        <p>No Tournaments registered.</p>
      ) : (
        <ul>
          {tournaments.map(t => (
            <li key={t._id}>
              <strong>{t.name}</strong> - {t.number} in {t.location}
              <button onClick={() => navigate(`/edit/${t._id}`)} style={{ marginLeft: '10px' }}>✏️ Edit</button>
              <button onClick={() => handleDelete(t._id)} style={{ marginLeft: '5px', color: 'red' }}>🗑️ Delete</button>
            </li>
          ))}
        </ul>
      )}
      <BackToHomeButton />
    </div>
  );
};

export default ManageTournaments;
