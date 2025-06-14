import React, { useEffect, useState } from 'react';
import './ComicBackground.css';

const ComicBackground = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="comic-background">
      <div 
        className="comic-image left-slide"
        style={{
          width: `${Math.min(scrollPosition * 1.2, 50)}%`
        }}
      />
      <div 
        className="comic-image right-slide"
        style={{
          width: `${Math.min(scrollPosition * 1.2, 50)}%`
        }}
      />
      <div className="comic-overlay"></div>
    </div>
  );
};

export default ComicBackground; 