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
        this.deckStarted = false;
        
        // Get DOM elements (like your pygame screen setup)
        this.elements = {
            cardSuit: document.getElementById('cardSuit'),
            cardValue: document.getElementById('cardValue'),
            cardSuitBottom: document.getElementById('cardSuitBottom'),
            currentCardNumber: document.getElementById('currentCardNumber'),
            totalCards: document.getElementById('totalCards'),
            deckStatus: document.getElementById('deckStatus'),
            timer: document.getElementById('timer'),
            startResetBtn: document.getElementById('startResetBtn'),
            currentCard: document.getElementById('currentCard')
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
    
    // Consolidated start/reset functionality (fixes timer bug)
    startOrReset() {
        if (!this.deckStarted || this.currentCardIndex === this.deck.length - 1) {
            // Start new deck
            this.shuffleDeck();
            this.currentCardIndex = 0;
            this.deckStarted = true;
            this.startTimer();
            this.elements.deckStatus.textContent = 'Deck in progress...';
            this.elements.startResetBtn.textContent = 'Reset';
        } else {
            // Reset current deck
            this.stopTimer();
            this.currentCardIndex = 0;
            this.deckStarted = false;
            this.elements.timer.textContent = '00:00';
            this.elements.deckStatus.textContent = 'Ready to start!';
            this.elements.startResetBtn.textContent = 'Start New Deck';
        }
        this.updateDisplay();
    }
    
    // Show next card (now triggered by card click)
    nextCard() {
        if (this.deckStarted && this.currentCardIndex < this.deck.length - 1) {
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
        this.elements.startResetBtn.textContent = 'Start New Deck';
    }
    
    // Timer functions (simpler than your frame rate management)
    startTimer() {
        this.stopTimer(); // Clear any existing timer
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
    
    // Update display (like your _update_screen method but simpler)
    updateDisplay() {
        const currentCard = this.deck[this.currentCardIndex];
        this.elements.cardSuit.textContent = currentCard.suit;
        this.elements.cardValue.textContent = currentCard.value;
        this.elements.cardSuitBottom.textContent = currentCard.suit;
        this.elements.currentCardNumber.textContent = this.currentCardIndex + 1;
        
        // Color the card based on suit
        const isRed = currentCard.suit === '♥' || currentCard.suit === '♦';
        this.elements.currentCard.className = `card clickable ${isRed ? 'red' : 'black'}`;
    }
    
    // Event listeners (like your _check_events method)
    setupEventListeners() {
        // Consolidated start/reset button
        this.elements.startResetBtn.addEventListener('click', () => this.startOrReset());
        
        // Card click to advance (replaces Next Card button)
        this.elements.currentCard.addEventListener('click', () => this.nextCard());
        
        // Keyboard support for easier testing
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && this.deckStarted) {
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