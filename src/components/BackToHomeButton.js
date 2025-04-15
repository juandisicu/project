import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToHomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      style={{
        marginTop: '20px',
        padding: '8px 16px',
        fontSize: '14px',
        backgroundColor: '#eee',
        border: '1px solid #ccc',
        cursor: 'pointer'
      }}
    >
      ⬅️ Back To home
    </button>
  );
};

export default BackToHomeButton;
