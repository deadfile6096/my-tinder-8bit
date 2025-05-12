import React, { useState, useEffect } from 'react';
import './Card.css';
import { fetchSolanaTokens, redirectToExchange } from '../services/coinGeckoApi';

function Card() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [direction, setDirection] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fallback profiles in case API fails
  const fallbackProfiles = [
    {
      id: 'dogwifhat',
      name: 'Dogwifhat',
      age: 1,
      description: 'The dog with the hat. A viral meme turned crypto sensation on Solana.',
      color: '#9945FF',
      symbol: 'WIF'
    },
    {
      id: 'bonk',
      name: 'Bonk',
      age: 2,
      description: 'The OG Solana meme coin. Community-driven, dog-themed.',
      color: '#FE8C00',
      symbol: 'BONK'
    },
    {
      id: 'book-of-meme',
      name: 'Book of Meme',
      age: 1,
      description: 'The sacred texts of memes, now on Solana. A memoir of internet culture.',
      color: '#DC1FFF',
      symbol: 'BOME'
    },
    {
      id: 'chill-token',
      name: 'Chill Guy',
      age: 1,
      description: 'Just a chill guy living in a not-so-chill crypto world. Vibes only.',
      color: '#03E1FF',
      symbol: 'CHILLGUY'
    },
    {
      id: 'pudgy-penguins',
      name: 'Pudgy Penguins',
      age: 2,
      description: 'Adorable penguin-themed NFT project turned token. Waddle to the moon!',
      color: '#14F195',
      symbol: 'PENGU'
    },
    {
      id: 'trump',
      name: 'OFFICIAL TRUMP',
      age: 1,
      description: 'Make Crypto Great Again! Political meme token with high energy.',
      color: '#E91E63',
      symbol: 'TRUMP'
    }
  ];

  useEffect(() => {
    const loadSolanaTokens = async () => {
      try {
        setLoading(true);
        const solanaTokens = await fetchSolanaTokens();
        
        if (solanaTokens && solanaTokens.length > 0) {
          setProfiles(solanaTokens); // Use all returned tokens (should be 6 max)
          setCurrentProfile(solanaTokens[0]);
        } else {
          // Use fallback profiles if API fails
          setProfiles(fallbackProfiles);
          setCurrentProfile(fallbackProfiles[0]);
        }
      } catch (error) {
        console.error('Error loading Solana meme tokens:', error);
        setProfiles(fallbackProfiles);
        setCurrentProfile(fallbackProfiles[0]);
      } finally {
        setLoading(false);
      }
    };

    loadSolanaTokens();
  }, []);

  const handleSwipe = (dir) => {
    setDirection(dir);
    setIsAnimating(true);
    
    // If swiped right, count as a match and redirect to CoinGecko
    if (dir === 'right' && currentProfile) {
      setMatchCount(prevCount => prevCount + 1);
      // Redirect to CoinGecko after a short delay
      setTimeout(() => {
        redirectToExchange(currentProfile.id);
      }, 300);
    }
    
    // After animation completes, show next profile
    setTimeout(() => {
      if (profiles.length > 0) {
        const currentIndex = profiles.findIndex(profile => profile.id === currentProfile.id);
        const nextIndex = (currentIndex + 1) % profiles.length;
        setCurrentProfile(profiles[nextIndex]);
      }
      setIsAnimating(false);
      setDirection('');
    }, 500);
  };

  const cardClasses = `card ${isAnimating ? `swipe-${direction}` : ''}`;

  if (loading) {
    return (
      <div className="card-container">
        <div className="loading">Loading Solana meme coins...</div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="card-container">
        <div className="error">Could not load meme coins. Please refresh.</div>
      </div>
    );
  }

  return (
    <div className="card-container">
      <div className="match-counter">Matches: {matchCount}</div>
      
      <div className={cardClasses}>
        <div className="card-image" style={{ backgroundColor: currentProfile.color }}>
          <div className="crypto-symbol">
            {currentProfile.symbol && currentProfile.symbol.charAt(0)}
          </div>
          <div className="card-info">
            <h2>{currentProfile.name}, {currentProfile.age}yr</h2>
            <p>{currentProfile.description}</p>
            {currentProfile.price && (
              <div className="price">${currentProfile.price.toFixed(6)} USD</div>
            )}
          </div>
        </div>
      </div>
      
      <div className="swipe-buttons">
        <button className="swipe-button reject" onClick={() => handleSwipe('left')}>✕</button>
        <button className="swipe-button like" onClick={() => handleSwipe('right')}>♥</button>
      </div>
      <div className="swipe-hint">
        Swipe ♥ to match and go to CoinGecko!
      </div>
    </div>
  );
}

export default Card; 