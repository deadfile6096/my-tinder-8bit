import React from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TRENCHR TINDER</h1>
        <p>8-bit Solana Meme Coins</p>
      </header>
      <main>
        <Card />
      </main>
    </div>
  );
}

export default App; 