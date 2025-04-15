import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Assume user is logged in if token exists in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/')}>
        🏐 Senecarios
      </div>
      <div className="navbar-links">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Register</NavLink>
        <NavLink to="/search" className={({ isActive }) => isActive ? 'active' : ''}>Search</NavLink>
        <NavLink to="/manage" className={({ isActive }) => isActive ? 'active' : ''}>Manage</NavLink>

        {isLoggedIn && (
          <>
            <NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>Users</NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>My Profile</NavLink>
            <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
