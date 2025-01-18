import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToHome: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <button onClick={handleBackClick} className="back-button">
      Back to Home
    </button>
  );
};

export default BackToHome;