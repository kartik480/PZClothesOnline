import React, { useEffect, useState } from 'react';
import './FloatingAnimeText.css';

const FloatingAnimeText = () => {
  const animeNames = [
    "Naruto",
    "One Piece",
    "Dragon Ball",
    "Attack on Titan",
    "Death Note",
    "My Hero Academia",
    "Demon Slayer",
    "Jujutsu Kaisen",
    "Fullmetal Alchemist",
    "Tokyo Ghoul",
    "Bleach",
    "Hunter x Hunter",
    "Sword Art Online",
    "Black Clover",
    "Fairy Tail"
  ];

  const [positions, setPositions] = useState(() => {
    // Initialize with default positions
    return animeNames.map(() => ({
      x: '50%',
      y: '50%'
    }));
  });

  // Generate random positions with minimum distance from center and other texts
  const generateRandomPositions = () => {
    const newPositions = [];
    const centerX = 50;
    const centerY = 50;
    const minDistanceFromCenter = 30;
    const minDistanceBetweenTexts = 15;

    animeNames.forEach(() => {
      let x, y;
      let attempts = 0;
      const maxAttempts = 50;
      let isFarEnough = false;

      do {
        const corner = Math.floor(Math.random() * 4);
        switch (corner) {
          case 0: // Top-left
            x = Math.random() * 20 + 5;
            y = Math.random() * 20 + 5;
            break;
          case 1: // Top-right
            x = Math.random() * 20 + 75;
            y = Math.random() * 20 + 5;
            break;
          case 2: // Bottom-left
            x = Math.random() * 20 + 5;
            y = Math.random() * 20 + 75;
            break;
          case 3: // Bottom-right
            x = Math.random() * 20 + 75;
            y = Math.random() * 20 + 75;
            break;
        }

        const distanceFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );

        isFarEnough = newPositions.every(pos => {
          const distance = Math.sqrt(
            Math.pow(x - parseFloat(pos.x), 2) + Math.pow(y - parseFloat(pos.y), 2)
          );
          return distance >= minDistanceBetweenTexts;
        });

        attempts++;
      } while (
        attempts < maxAttempts &&
        (Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) < minDistanceFromCenter ||
        !isFarEnough)
      );

      newPositions.push({
        x: `${x}%`,
        y: `${y}%`
      });
    });

    return newPositions;
  };

  useEffect(() => {
    try {
      setPositions(generateRandomPositions());
      const interval = setInterval(() => {
        setPositions(generateRandomPositions());
      }, 30000);

      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error in FloatingAnimeText:', error);
    }
  }, []);

  return (
    <div className="floating-text-container">
      {animeNames.map((name, index) => (
        <span
          key={index}
          className="floating-text"
          style={{
            '--delay': `${index * 1.5}s`,
            '--x': positions[index]?.x || '50%',
            '--y': positions[index]?.y || '50%',
          }}
        >
          {name}
        </span>
      ))}
    </div>
  );
};

export default FloatingAnimeText; 