import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';
import logo from '../assets/log.png';

const PageTransition = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // Animation duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isAnimating) return null;

  return (
    <div className="page-transition">
      <div className="transition-logo-container">
        <img src={logo} alt="Transition Logo" className="transition-logo" />
      </div>
    </div>
  );
};

export default PageTransition; 