# 🃏 Workout Card Deck PWA

A simple Progressive Web App for gym workouts using a shuffled deck of cards. Times your workout from first card to last card.

## How It Works
1. **Start New Deck** - Shuffles the 52-card deck and starts the timer
2. **Next Card** - Shows the next card in the shuffled deck
3. **Timer** - Tracks time from first card to completion
4. **Reset** - Starts over with a new shuffle

## Features
- 📱 **Mobile-optimized** - Designed for iPhone use
- 🏃 **Offline ready** - Works at the gym without internet
- ⏱️ **Timer tracking** - See how long your workout takes
- 🎲 **Random shuffle** - New order every time
- 🎯 **Simple interface** - Easy to use during workouts

## Using the App

### Desktop Testing
1. Open `index.html` in your browser
2. Click "Start New Deck" to begin
3. Use "Next Card" or spacebar to advance
4. Watch the timer count up

### iPhone Installation
1. **Host the files online** (GitHub Pages, Netlify, etc.)
2. **Open in Safari** on your iPhone
3. **Tap the Share button** (square with arrow)
4. **Select "Add to Home Screen"**
5. **Tap "Add"** - now it's an app on your phone!

## File Structure
```
deckofcards/
├── index.html          # Main app interface
├── style.css           # Mobile-optimized styling  
├── script.js           # Card deck logic & timer
├── manifest.json       # PWA configuration
├── service-worker.js   # Offline functionality
└── icons/              # App icons (need to add PNG files)
```

## Next Steps for You
1. **Test locally** - Open index.html in your browser
2. **Create app icons** - Add 192x192 and 512x512 PNG icons to `/icons/`
3. **Deploy online** - Upload to GitHub Pages or Netlify
4. **Install on iPhone** - Follow installation steps above

## Comparison to Alien Invasion
- **Lines of code**: ~250 vs 259 (similar size, way simpler logic!)
- **Complexity**: Much simpler - no real-time updates, collision detection, or sprite management
- **New concepts**: HTML/CSS/JavaScript syntax, PWA features

Perfect for gym workouts! 💪 