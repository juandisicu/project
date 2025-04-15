import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-top">
        {/* Logo and Title Section */}
        <div className="logo-title">
          <img 
            src={logo} 
            alt="Senecarios Logo" 
            className="home-logo"
          />
          <h1 className="home-title">Senecarios</h1>
          <h2 className="home-subtitle">Volleyball Tournament Manager</h2>
        </div>

        {/* Right-aligned Buttons */}
        <div className="button-group">
          <button onClick={() => navigate('/register')}>➕ Register a Tournament</button>
          <button onClick={() => navigate('/search')}>🔍 Search For a Tournament</button>
          <button onClick={() => navigate('/manage')}>⚙️ Manage a Tournament</button>
        </div>
      </div>

      <p className="home-welcome">
        Welcome to Senecarios! Organize, manage, and search volleyball tournaments with ease. 
        Create new tournaments, edit existing ones, and keep track of all your events.
      </p>
    </div>
  );
};

export default Home;
