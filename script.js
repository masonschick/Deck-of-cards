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
        this.showingCardBack = true;
        this.onFinalCard = false;
        
        // Hold-to-reset variables
        this.isHolding = false;
        this.holdTimer = null;
        this.holdStartTime = null;
        this.holdProgressInterval = null;
        this.justFinishedHold = false;
        
        // Default workout selections (reset each session)
        this.defaultWorkouts = {
            '♠': 'Flutter kicks',
            '♥': 'Push-ups', 
            '♦': 'Bicycle crunches',
            '♣': 'Sit-ups'
        };
        this.workoutSelections = { ...this.defaultWorkouts };
        
        // Get DOM elements (like your pygame screen setup)
        this.elements = {
            cardSuit: document.getElementById('cardSuit'),
            cardValue: document.getElementById('cardValue'),
            cardSuitBottom: document.getElementById('cardSuitBottom'),
            currentCardNumber: document.getElementById('currentCardNumber'),
            totalCards: document.getElementById('totalCards'),
            cardCounter: document.getElementById('cardCounter'),
            deckStatus: document.getElementById('deckStatus'),
            timer: document.getElementById('timer'),
            startResetBtn: document.getElementById('startResetBtn'),
            currentCard: document.getElementById('currentCard'),
            cardBack: document.getElementById('cardBack'),
            spadesWorkout: document.getElementById('spadesWorkout'),
            heartsWorkout: document.getElementById('heartsWorkout'),
            diamondsWorkout: document.getElementById('diamondsWorkout'),
            clubsWorkout: document.getElementById('clubsWorkout')
        };
        
        this.initializeApp();
    }
    
    // Initialize the app (like your __init__ methods)
    initializeApp() {
        this.createDeck();
        this.setupEventListeners();
        this.resetWorkoutSelections();
        this.updateDisplay();
        this.updateCardCounterVisibility();
        this.updateButtonText();
    }
    
    // Update card counter visibility
    updateCardCounterVisibility() {
        if (this.deckStarted && !this.showingCardBack) {
            this.elements.cardCounter.classList.remove('hidden');
        } else {
            this.elements.cardCounter.classList.add('hidden');
        }
    }
    
    // Reset workout selections to defaults
    resetWorkoutSelections() {
        this.workoutSelections = { ...this.defaultWorkouts };
        this.elements.spadesWorkout.value = this.defaultWorkouts['♠'];
        this.elements.heartsWorkout.value = this.defaultWorkouts['♥'];
        this.elements.diamondsWorkout.value = this.defaultWorkouts['♦'];
        this.elements.clubsWorkout.value = this.defaultWorkouts['♣'];
    }
    
    // Update workout selections from dropdowns
    updateWorkoutSelections() {
        this.workoutSelections['♠'] = this.elements.spadesWorkout.value;
        this.workoutSelections['♥'] = this.elements.heartsWorkout.value;
        this.workoutSelections['♦'] = this.elements.diamondsWorkout.value;
        this.workoutSelections['♣'] = this.elements.clubsWorkout.value;
    }
    
    // Get rep count for card value
    getRepCount(value) {
        if (value === 'A') return 25;
        if (['J', 'Q', 'K'].includes(value)) return 15;
        return parseInt(value);
    }
    
    // Generate workout instruction text
    getWorkoutInstruction(card) {
        const reps = this.getRepCount(card.value);
        const workout = this.workoutSelections[card.suit];
        return `Do ${reps} reps of ${workout}`;
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
    
    // Show/hide card back vs regular card
    toggleCardView() {
        if (this.showingCardBack) {
            this.elements.cardBack.classList.add('hidden');
            this.elements.currentCard.classList.remove('hidden');
            this.showingCardBack = false;
        } else {
            this.elements.cardBack.classList.remove('hidden');
            this.elements.currentCard.classList.add('hidden');
            this.showingCardBack = true;
        }
        this.updateCardCounterVisibility();
    }
    
    // Handle button click (immediate actions only)
    handleButtonClick() {
        if (this.onFinalCard) {
            // Done button clicked on final card - complete the deck
            this.completeDeck();
        } else if (!this.deckStarted || this.currentCardIndex === this.deck.length - 1) {
            // Start new deck
            this.updateWorkoutSelections(); // Get current dropdown values
            this.shuffleDeck();
            this.currentCardIndex = 0;
            this.deckStarted = true;
            this.onFinalCard = false;
            this.startTimer();
            
            // Show regular card, hide card back
            if (this.showingCardBack) {
                this.toggleCardView();
            }
            
            this.updateWorkoutStatus();
            this.updateButtonText();
            this.updateDisplay();
            this.updateCardCounterVisibility();
        }
        // Reset functionality is now handled by hold-to-reset only
    }
    
    // Update workout status text
    updateWorkoutStatus() {
        if (this.deckStarted) {
            const currentCard = this.deck[this.currentCardIndex];
            this.elements.deckStatus.textContent = this.getWorkoutInstruction(currentCard);
        }
    }
    
    // Update button text and styling based on current state
    updateButtonText() {
        const btn = this.elements.startResetBtn;
        
        // Remove all button classes
        btn.className = 'btn';
        
        if (!this.deckStarted) {
            btn.innerHTML = '<span class="btn-text">Start New Deck</span>';
            btn.classList.add('primary');
        } else if (this.onFinalCard) {
            btn.innerHTML = '<span class="btn-text">Done</span>';
            btn.classList.add('primary');
        } else {
            btn.innerHTML = '<span class="btn-text">Hold to Reset</span><div class="progress-fill"></div>';
            btn.classList.add('danger');
        }
    }
    
    // Show next card (now triggered by card click)
    nextCard() {
        if (this.deckStarted && this.currentCardIndex < this.deck.length - 1 && !this.onFinalCard) {
            this.currentCardIndex++;
            this.updateDisplay();
            this.updateWorkoutStatus();
            
            // Haptic feedback for card advance
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            // Check if we're on the final card (52nd)
            if (this.currentCardIndex === this.deck.length - 1) {
                this.onFinalCard = true;
                this.updateButtonText();
            }
        }
    }
    
    // Complete deck (like game over but positive!)
    completeDeck() {
        this.stopTimer();
        this.onFinalCard = false;
        this.elements.deckStatus.textContent = '🎉 Deck complete!';
        this.updateButtonText();
        
        // Haptic feedback for deck complete (celebration pattern)
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }
    }
    
    // Start hold-to-reset process
    startHoldToReset() {
        if (this.isHolding) return; // Prevent multiple holds
        
        this.isHolding = true;
        this.holdStartTime = Date.now();
        
        // Start progress animation
        const progressFill = this.elements.startResetBtn.querySelector('.progress-fill');
        if (progressFill) {
            this.holdProgressInterval = setInterval(() => {
                const elapsed = Date.now() - this.holdStartTime;
                const progress = Math.min((elapsed / 2000) * 100, 100); // 2 seconds
                progressFill.style.width = `${progress}%`;
            }, 16); // ~60fps
        }
        
        // Set timer for 2 seconds
        this.holdTimer = setTimeout(() => {
            this.executeReset();
        }, 2000);
    }
    
    // Cancel hold-to-reset process
    cancelHoldToReset() {
        if (!this.isHolding) return;
        
        this.isHolding = false;
        this.justFinishedHold = true;
        
        // Clear the flag after a short delay to prevent click trigger
        setTimeout(() => {
            this.justFinishedHold = false;
        }, 100);
        
        // Clear timers
        if (this.holdTimer) {
            clearTimeout(this.holdTimer);
            this.holdTimer = null;
        }
        
        if (this.holdProgressInterval) {
            clearInterval(this.holdProgressInterval);
            this.holdProgressInterval = null;
        }
        
        // Reset progress bar
        const progressFill = this.elements.startResetBtn.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = '0%';
        }
    }
    
    // Execute the actual reset
    executeReset() {
        this.cancelHoldToReset(); // Clean up hold state
        
        // Reset current deck
        this.stopTimer();
        this.currentCardIndex = 0;
        this.deckStarted = false;
        this.onFinalCard = false;
        this.elements.timer.textContent = '00:00';
        this.elements.deckStatus.textContent = 'Select workouts and start!';
        
        // Show card back, hide regular card
        if (!this.showingCardBack) {
            this.toggleCardView();
        }
        
        // Reset workout selections to defaults
        this.resetWorkoutSelections();
        this.updateButtonText();
        this.updateDisplay();
        this.updateCardCounterVisibility();
        this.updateLogoTimerVisibility();
        
        // Haptic feedback for reset complete
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
        
        // Clear the hold flag to ensure clean state
        this.justFinishedHold = false;
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
        if (!this.showingCardBack) {
            const currentCard = this.deck[this.currentCardIndex];
            this.elements.cardSuit.textContent = currentCard.suit;
            this.elements.cardValue.textContent = currentCard.value;
            this.elements.cardSuitBottom.textContent = currentCard.suit;
            this.elements.currentCardNumber.textContent = this.currentCardIndex + 1;
            
            // Color the card based on suit
            const isRed = currentCard.suit === '♥' || currentCard.suit === '♦';
            this.elements.currentCard.className = `card clickable ${isRed ? 'red' : 'black'}`;
        }
    }
    
    // Event listeners (like your _check_events method)
    setupEventListeners() {
        const btn = this.elements.startResetBtn;
        
        // Button click (for immediate actions)
        btn.addEventListener('click', (e) => {
            // Prevent click if we just finished a hold
            if (this.justFinishedHold) {
                e.preventDefault();
                return false;
            }
            
            // Only handle immediate clicks for Start/Done, prevent default for Reset
            if (btn.classList.contains('danger')) {
                e.preventDefault();
                return false;
            }
            this.handleButtonClick();
        });
        
        // Mouse events for hold-to-reset
        btn.addEventListener('mousedown', (e) => {
            if (btn.classList.contains('danger')) {
                e.preventDefault();
                this.startHoldToReset();
            }
        });
        
        btn.addEventListener('mouseup', () => {
            if (btn.classList.contains('danger')) {
                this.cancelHoldToReset();
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (btn.classList.contains('danger')) {
                this.cancelHoldToReset();
            }
        });
        
        // Touch events for hold-to-reset (mobile)
        btn.addEventListener('touchstart', (e) => {
            if (btn.classList.contains('danger')) {
                e.preventDefault(); // Prevent text selection and context menu
                this.startHoldToReset();
            }
        });
        
        btn.addEventListener('touchend', (e) => {
            if (btn.classList.contains('danger')) {
                e.preventDefault();
                this.cancelHoldToReset();
            }
        });
        
        btn.addEventListener('touchcancel', () => {
            if (btn.classList.contains('danger')) {
                this.cancelHoldToReset();
            }
        });
        
        // Card click to advance (replaces Next Card button)
        this.elements.currentCard.addEventListener('click', () => this.nextCard());
        
        // Card press animation for mobile
        this.elements.currentCard.addEventListener('touchstart', (e) => {
            if (this.elements.currentCard.classList.contains('clickable')) {
                this.elements.currentCard.classList.add('pressed');
            }
        });
        
        this.elements.currentCard.addEventListener('touchend', () => {
            this.elements.currentCard.classList.remove('pressed');
        });
        
        this.elements.currentCard.addEventListener('touchcancel', () => {
            this.elements.currentCard.classList.remove('pressed');
        });
        
        // Workout selection dropdowns
        this.elements.spadesWorkout.addEventListener('change', () => this.updateWorkoutSelections());
        this.elements.heartsWorkout.addEventListener('change', () => this.updateWorkoutSelections());
        this.elements.diamondsWorkout.addEventListener('change', () => this.updateWorkoutSelections());
        this.elements.clubsWorkout.addEventListener('change', () => this.updateWorkoutSelections());
        
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