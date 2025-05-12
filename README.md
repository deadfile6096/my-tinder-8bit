# TRENCHR TINDER

A fun 8-bit style Tinder clone for Solana meme coins. Swipe right on coins you like to be redirected to CoinGecko for more information.

## Features

- 8-bit retro style UI
- Displays the following Solana meme coins with real-time data from CoinGecko:
  - Dogwifhat (WIF)
  - Bonk (BONK)
  - Book of Meme (BOME)
  - Chill Guy (CHILLGUY)
  - Pudgy Penguins (PENGU)
  - OFFICIAL TRUMP (TRUMP)
- Swipe functionality to like or dismiss coins
- Direct link to CoinGecko when you match with a coin
- Mobile-friendly design

## Prerequisites

- Node.js (v14 or higher)
- NPM (v6 or higher)

## Installation and Local Development

1. Unzip the archive to your desired location
2. Open a terminal/command prompt in the project directory
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. The app will open automatically in your default browser at http://localhost:3000

## Deployment Instructions

### Option 1: Deploy on Netlify (Easiest)

1. Create a free account on [Netlify](https://www.netlify.com/)
2. From the Netlify dashboard, click "New site from Git"
3. Connect your GitHub/GitLab/Bitbucket account and select the repository
4. For build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Click "Deploy site"

### Option 2: Deploy on GitHub Pages

1. Install the gh-pages package:
   ```
   npm install --save-dev gh-pages
   ```
2. Add these lines to your `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name",
   "scripts": {
     // other scripts
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

### Option 3: Deploy on Your Own Server

1. Build the production version:
   ```
   npm run build
   ```
2. The optimized files will be in the `build` folder
3. Upload the contents of the `build` folder to your web server
4. Configure your server to serve `index.html` for all routes

## Creating a ZIP Archive for Distribution

To create a ZIP archive of this project:

### On Windows:
1. Select all files in the project folder
2. Right-click and select "Send to" > "Compressed (zipped) folder"
3. Rename the ZIP file as needed

### On macOS:
1. Select all files in the project folder
2. Right-click and select "Compress items"
3. Rename the ZIP file as needed

### Using Command Line (Cross-platform):
```
npm run build
zip -r trenchr-tinder.zip build package.json package-lock.json README.md public src TRENCHR.cmd run.bat
```

## Technical Notes

- This app uses the free CoinGecko API for real-time cryptocurrency data
- No API key is required for basic usage
- The app includes fallback data in case the API is unavailable
- Mobile and touch gestures are supported for swiping

## Credits

- Developed for TRENCHR
- Uses React framework
- 8-bit fonts courtesy of Google Fonts "Press Start 2P"
