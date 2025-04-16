import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('authToken');
    if (userToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
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
        {isAuthenticated ? (
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
        ) : (
          <li>
            <Link to="/Login" className="navbar-link">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
