import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🏐 Welcome to Volleyball Tournaments Management</h1>
      <p>Organize, search and get information about tournaments easily</p>

      <div style={{ marginTop: '30px' }}>
        <button onClick={() => navigate('/register')} style={buttonStyle}>➕ Register a Tournament</button>
        <button onClick={() => navigate('/search')} style={buttonStyle}>🔍 Search For a Tournament</button>
        <button onClick={() => navigate('/manage')} style={buttonStyle}>⚙️ Manage a Tournament</button>
      </div>
    </div>
  );
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer'
};

export default Home;
