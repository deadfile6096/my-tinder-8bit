// CoinGecko API Service
const API_URL = 'https://api.coingecko.com/api/v3';

// List of specific meme coins to include (in order of priority)
const MEME_COIN_IDS = [
  'dogwifhat', 
  'bonk',
  'book-of-meme',
  'chill-token',    // CHILLGUY
  'pudgy-penguins',  // PENGU
  'trump'            // TRUMP
];

// Stable or mainstream coins to exclude (lowercase)
const EXCLUDED_TOKENS = [
  'usdt', 'usdc', 'busd', 'dai', 'ethereum', 'bitcoin', 'binancecoin', 
  'xrp', 'cardano', 'solana', 'polkadot', 'avalanche-2', 'matic-network'
];

export const fetchSolanaTokens = async () => {
  try {
    // Create a hardcoded list of the requested tokens with fallback data in case API fails
    const requestedTokens = [
      {
        id: 'dogwifhat',
        name: 'Dogwifhat',
        symbol: 'WIF',
        current_price: 1.52,
        market_cap: 1520000000,
        image: 'https://assets.coingecko.com/coins/images/33103/large/WIF.jpeg'
      },
      {
        id: 'bonk',
        name: 'Bonk',
        symbol: 'BONK',
        current_price: 0.000012,
        market_cap: 700000000,
        image: 'https://assets.coingecko.com/coins/images/28600/large/bonk.jpg'
      },
      {
        id: 'book-of-meme',
        name: 'Book of Meme',
        symbol: 'BOME',
        current_price: 0.0096,
        market_cap: 550000000,
        image: 'https://assets.coingecko.com/coins/images/31294/large/icon-256x256.png'
      },
      {
        id: 'chill-token',
        name: 'Chill Guy',
        symbol: 'CHILLGUY',
        current_price: 0.000075,
        market_cap: 7500000,
        image: 'https://assets.coingecko.com/coins/images/33333/large/IMG_20240215_165123_409.jpg'
      },
      {
        id: 'pudgy-penguins',
        name: 'Pudgy Penguins',
        symbol: 'PENGU',
        current_price: 4.20,
        market_cap: 42000000,
        image: 'https://assets.coingecko.com/coins/images/28730/large/penguins.png'
      },
      {
        id: 'trump',
        name: 'OFFICIAL TRUMP',
        symbol: 'TRUMP',
        current_price: 0.00123,
        market_cap: 12300000,
        image: 'https://assets.coingecko.com/coins/images/32193/large/Trump.PNG'
      }
    ];

    try {
      // Attempt to get live data from CoinGecko
      const response = await fetch(`${API_URL}/coins/markets?vs_currency=usd&ids=${MEME_COIN_IDS.join(',')}&order=market_cap_desc&per_page=10&page=1`);
      const liveData = await response.json();

      // Combine data: use live data where available, fall back to our hardcoded data where not
      if (liveData && liveData.length > 0) {
        // Create a map of our static data for easy lookup
        const staticDataMap = requestedTokens.reduce((acc, token) => {
          acc[token.id] = token;
          return acc;
        }, {});

        // For each token in our MEME_COIN_IDS list, use live data if available, otherwise use static
        const combinedData = MEME_COIN_IDS.map(id => {
          const liveToken = liveData.find(token => token.id === id);
          return liveToken || staticDataMap[id];
        }).filter(token => token); // Remove any undefined entries

        if (combinedData.length > 0) {
          return formatTokensResponse(combinedData);
        }
      }
    } catch (error) {
      console.error('Error fetching live token data:', error);
      // Continue with fallback data
    }

    // If API call fails or returns no data, use our hardcoded data
    return formatTokensResponse(requestedTokens);
  } catch (error) {
    console.error('Error fetching Solana meme tokens:', error);
    return [];
  }
};

// Helper function to format token data consistently
const formatTokensResponse = (tokens) => {
  return tokens.map(token => ({
    id: token.id,
    name: token.id === 'chill-token' ? 'Chill Guy' : 
         token.id === 'trump' ? 'OFFICIAL TRUMP' : token.name,
    symbol: token.id === 'chill-token' ? 'CHILLGUY' : token.symbol.toUpperCase(),
    price: token.current_price,
    image: token.image,
    marketCap: token.market_cap,
    color: getRandomColor(),
    age: getTokenAge(token.id),
    description: getTokenDescription(token.id, token.name, token.market_cap),
  }));
};

// Get token age (in years)
const getTokenAge = (tokenId) => {
  const ages = {
    'dogwifhat': 1,
    'bonk': 2,
    'book-of-meme': 1,
    'chill-token': 1,
    'pudgy-penguins': 2,
    'trump': 1
  };
  
  return ages[tokenId] || 1;
};

// Get custom descriptions for tokens
const getTokenDescription = (id, name, marketCap) => {
  const descriptions = {
    'dogwifhat': 'The dog with the hat. A viral meme turned crypto sensation on Solana.',
    'bonk': 'The OG Solana meme coin. Community-driven, dog-themed.',
    'book-of-meme': 'The sacred texts of memes, now on Solana. A memoir of internet culture.',
    'chill-token': 'Just a chill guy living in a not-so-chill crypto world. Vibes only.',
    'pudgy-penguins': 'Adorable penguin-themed NFT project turned token. Waddle to the moon!',
    'trump': 'Make Crypto Great Again! Political meme token with high energy.'
  };
  
  return descriptions[id] || `${name} is a meme coin with a market cap of $${formatNumber(marketCap)}.`;
};

export const redirectToExchange = (tokenId) => {
  // Using only CoinGecko as the exchange/information platform
  const exchangeUrl = `https://www.coingecko.com/en/coins/${tokenId}`;
  
  // Open CoinGecko in a new tab
  window.open(exchangeUrl, '_blank');
};

// Helper functions
const getRandomColor = () => {
  const colors = ['#9945FF', '#14F195', '#03E1FF', '#FE8C00', '#DC1FFF', '#E91E63'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toString();
}; 