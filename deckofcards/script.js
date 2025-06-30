// Card Deck App - Core Logic (Compare this simplicity to your 259-line alien invasion!)

class CardDeck {
    constructor() {
        // Create deck (similar to your Settings class but simpler)
        this.suits = ['♠', '♥', '♦', '♣'];
        this.values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.deck = [];
        this.currentCardIndex = 0;
        this.startTime = null;
        this.timerInterval = null;
        
        // Get DOM elements (like your pygame screen setup)
        this.elements = {
            cardSuit: document.getElementById('cardSuit'),
            cardValue: document.getElementById('cardValue'),
            cardSuitBottom: document.getElementById('cardSuitBottom'),
            currentCardNumber: document.getElementById('currentCardNumber'),
            totalCards: document.getElementById('totalCards'),
            deckStatus: document.getElementById('deckStatus'),
            timer: document.getElementById('timer'),
            startBtn: document.getElementById('startBtn'),
            nextBtn: document.getElementById('nextBtn'),
            resetBtn: document.getElementById('resetBtn')
        };
        
        this.initializeApp();
    }
    
    // Initialize the app (like your __init__ methods)
    initializeApp() {
        this.createDeck();
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    // Create a fresh deck (much simpler than creating alien fleets!)
    createDeck() {
        this.deck = [];
        for (let suit of this.suits) {
            for (let value of this.values) {
                this.deck.push({ suit, value });
            }
        }
        this.elements.totalCards.textContent = this.deck.length;
    }
    
    // Shuffle deck (way simpler than your collision detection algorithms!)
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    
    // Start new deck (like pressing your Play button)
    startNewDeck() {
        this.shuffleDeck();
        this.currentCardIndex = 0;
        this.startTimer();
        this.updateDisplay();
        this.updateButtons();
        this.elements.deckStatus.textContent = 'Deck in progress...';
    }
    
    // Show next card (simpler than updating bullets/aliens)
    nextCard() {
        if (this.currentCardIndex < this.deck.length - 1) {
            this.currentCardIndex++;
            this.updateDisplay();
            
            // Check if deck is complete
            if (this.currentCardIndex === this.deck.length - 1) {
                this.completeDeck();
            }
        }
    }
    
    // Complete deck (like game over but positive!)
    completeDeck() {
        this.stopTimer();
        this.elements.deckStatus.textContent = '🎉 Deck complete!';
        this.elements.nextBtn.disabled = true;
    }
    
    // Timer functions (simpler than your frame rate management)
    startTimer() {
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.elements.timer.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    // Reset everything (like restarting your game)
    reset() {
        this.stopTimer();
        this.currentCardIndex = 0;
        this.elements.timer.textContent = '00:00';
        this.elements.deckStatus.textContent = 'Ready to start!';
        this.updateDisplay();
        this.updateButtons();
    }
    
    // Update display (like your _update_screen method but simpler)
    updateDisplay() {
        const currentCard = this.deck[this.currentCardIndex];
        this.elements.cardSuit.textContent = currentCard.suit;
        this.elements.cardValue.textContent = currentCard.value;
        this.elements.cardSuitBottom.textContent = currentCard.suit;
        this.elements.currentCardNumber.textContent = this.currentCardIndex + 1;
        
        // Color the card based on suit
        const isRed = currentCard.suit === '♥' || currentCard.suit === '♦';
        document.getElementById('currentCard').className = `card ${isRed ? 'red' : 'black'}`;
    }
    
    // Update button states (like your game state management)
    updateButtons() {
        const deckStarted = this.startTime !== null;
        const deckComplete = this.currentCardIndex === this.deck.length - 1 && deckStarted;
        
        this.elements.startBtn.disabled = deckStarted && !deckComplete;
        this.elements.nextBtn.disabled = !deckStarted || deckComplete;
        this.elements.resetBtn.disabled = !deckStarted;
    }
    
    // Event listeners (like your _check_events method)
    setupEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.startNewDeck());
        this.elements.nextBtn.addEventListener('click', () => this.nextCard());
        this.elements.resetBtn.addEventListener('click', () => this.reset());
        
        // Keyboard support for easier testing
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && !this.elements.nextBtn.disabled) {
                event.preventDefault();
                this.nextCard();
            }
        });
    }
}

// Initialize the app (like your `if __name__ == '__main__'`)
document.addEventListener('DOMContentLoaded', () => {
    new CardDeck();
});

// Service Worker registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 