import React, { useState, useEffect } from 'react';
import BackToHomeButton from './BackToHomeButton';
import './TournamentForm.css';

const TournamentForm = ({ initialData = null, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    number: '',
    location: ''
  });

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (initialData && !isInitialized) {
      setForm({
        name: initialData.name || '',
        number: initialData.number || '',
        location: initialData.location || ''
      });
      setIsInitialized(true);
    }
  }, [initialData, isInitialized]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof onSave === 'function') {
      onSave(form);
    } else {
      console.warn('⚠️ Not providing a valid onSave function');
    }
  };

  return (
    <div className="form-container">
      <h2>{initialData?._id ? '✏️ Edit tournament' : '➕ Register tournament'}</h2>

      <form onSubmit={handleSubmit} className="tournament-form">
        <input
          type="text"
          name="name"
          placeholder="Name of the tournament"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="number"
          placeholder="Organizer number"
          value={form.number}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <button type="submit">Save</button>
      </form>

      <BackToHomeButton />
    </div>
  );
};

export default TournamentForm;
