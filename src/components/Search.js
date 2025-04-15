import React, { useState } from 'react';
import axios from 'axios';
import BackToHomeButton from '../components/BackToHomeButton';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setMessage('⚠️ Please enter a name of a tournament.');
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/tournaments/search?q=${searchTerm}`);
      if (res.data.length === 0) {
        setMessage('😕 No tournaments find with that name.');
      } else {
        setMessage('');
      }
      setResults(res.data);
    } catch (error) {
      console.error('❌ Error while searching:', error);
      setMessage('❌ Error while searching the tournament');
    }
  };

  const handleViewAll = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tournaments`);
      if (res.data.length === 0) {
        setMessage('🚫 No tournaments registered');
      } else {
        setMessage('');
      }
      setResults(res.data);
    } catch (error) {
      console.error('❌ Error while getting the tournament:', error);
      setMessage('❌ Error while getting the tournament:');
    }
  };

  return (
    <div>
      <h2>🔍 Look for a tournament</h2>
      <input
        type="text"
        placeholder="Name of the tournament"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleViewAll} style={{ marginLeft: '10px' }}>See all</button>

      {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}

      <ul>
        {results.map((t) => (
          <li key={t._id}>
            <strong>{t.name}</strong> - {t.number} en {t.location}
          </li>
        ))}
      </ul>
      <BackToHomeButton />
    </div>
  );
};

export default Search;