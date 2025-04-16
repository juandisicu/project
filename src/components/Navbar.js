import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isToggled, setIsToggled] = useState(false); // State to track switch position
  const [user, setUser] = useState(null);

  // Check and apply saved theme preference on load
  useEffect(() => {
    const userToken = localStorage.getItem('authToken');
    if (userToken) {
      setIsAuthenticated(true);
    }

    // Check saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsToggled(true);
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleSwitchChange = () => {
    setIsToggled(!isToggled); // Toggle the switch state
    if (!isToggled) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark'); // Save dark mode to localStorage
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light'); // Save light mode to localStorage
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li>
          <Link to="/search" className="navbar-link">Search</Link>
        </li>
        <li>
          <Link to="/manage" className="navbar-link">Manage Tournaments</Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/profile" className="navbar-link">My Profile</Link>
            </li>
            <li>
              <button onClick={handleSignOut} className="navbar-link signout-button">
                Sign Out
              </button>
            </li>
          </>
        )}
        {/* The Switch (checkbox) */}
        <li>
          <label className="switch">
            <input 
              type="checkbox" 
              className="input__check"
              checked={isToggled} 
              onChange={handleSwitchChange} 
            />
            <span className="slider"></span>
          </label>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
