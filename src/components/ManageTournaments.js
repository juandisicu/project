import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackToHomeButton from '../components/BackToHomeButton';
import './ManageTournament.css';

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
    if (!window.confirm('Are you sure you want to delete this tournament?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/tournaments/${id}`);
      fetchTournaments();
    } catch (error) {
      console.error('❌ Error: could not delete the tournament:', error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="manage-container">
      <h2 className="manage-heading">📋 Tournament Management</h2>
      {tournaments.length === 0 ? (
        <p>No tournaments registered.</p>
      ) : (
        <ul className="tournament-list">
          {tournaments.map(t => (
            <li key={t._id} className="tournament-item">
              <div className="tournament-info">
                <strong>{t.name}</strong> — {t.number} in {t.location}
              </div>
              <div className="button-group">
                <button onClick={() => navigate(`/edit/${t._id}`)}>✏️ Edit</button>
                <button onClick={() => handleDelete(t._id)}>🗑️ Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <BackToHomeButton />
    </div>
  );
};

export default ManageTournaments;