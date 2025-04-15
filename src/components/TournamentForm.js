import React, { useState, useEffect } from 'react';
import BackToHomeButton from './BackToHomeButton';

const TournamentForm = ({ initialData = null, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    number: '',
    location: ''
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Solo setea los valores iniciales una vez si initialData existe
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

    console.log(onSave); 
    
    if (typeof onSave === 'function') {
      onSave(form);
    } else {
      console.warn('⚠️ Not proportion a function onSave');
    }
  };

  return (
    <div style={styles.container}>
      <h2>{initialData?._id ? '✏️ Edit tournament' : '➕ register tournament'}</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="name of the tournament"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="number"
          placeholder="organizer number"
          value={form.number}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="location"
          placeholder="location"
          value={form.location}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Save
        </button>
      </form>

      <BackToHomeButton />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  input: {
    padding: '10px',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default TournamentForm;
