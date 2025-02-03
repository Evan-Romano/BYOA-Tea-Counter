class TeaTracker {
    constructor() {
        this.finished = 0;
        this.unfinished = 0;
        this.lastResetDate = new Date().toDateString();
        this.loadData();
        this.initializeElements();
        this.addEventListeners();
        this.updateDisplay();
        this.checkForDayChange();
    }

    initializeElements() {
        this.finishedCount = document.getElementById('finished-count');
        this.unfinishedCount = document.getElementById('unfinished-count');
        this.totalCount = document.getElementById('total-count');
        this.currentDate = document.getElementById('current-date');
        this.addFinishedBtn = document.getElementById('add-finished');
        this.addUnfinishedBtn = document.getElementById('add-unfinished');
        this.removeFinishedBtn = document.getElementById('remove-finished');
        this.removeUnfinishedBtn = document.getElementById('remove-unfinished');
        this.moodEmoji = document.getElementById('mood-emoji');
        this.updateMoodEmoji();
    }

    addEventListeners() {
        this.addFinishedBtn.addEventListener('click', () => this.addTea('finished'));
        this.addUnfinishedBtn.addEventListener('click', () => this.addTea('unfinished'));
        this.removeFinishedBtn.addEventListener('click', () => this.removeTea('finished'));
        this.removeUnfinishedBtn.addEventListener('click', () => this.removeTea('unfinished'));
    }

    addTea(type) {
        if (type === 'finished') {
            this.finished++;
        } else {
            this.unfinished++;
        }
        this.saveData();
        this.updateDisplay();
    }

    updateDisplay() {
        this.finishedCount.textContent = this.finished;
        this.unfinishedCount.textContent = this.unfinished;
        this.totalCount.textContent = this.finished + this.unfinished;
        this.updateMoodEmoji();
        this.currentDate.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    updateMoodEmoji() {
        if (!this.moodEmoji) return;
        
        if (this.finished >= this.unfinished) {
            this.moodEmoji.innerHTML = '&#129392;';
        } else {
            this.moodEmoji.innerHTML = '&#129760;';
        }
    }

    checkForDayChange() {
        setInterval(() => {
            const currentDate = new Date().toDateString();
            if (currentDate !== this.lastResetDate) {
                this.resetCounts();
            }
        }, 1000 * 60); // Check every minute
    }

    resetCounts() {
        this.finished = 0;
        this.unfinished = 0;
        this.lastResetDate = new Date().toDateString();
        this.saveData();
        this.updateDisplay();
    }

    saveData() {
        const data = {
            finished: this.finished,
            unfinished: this.unfinished,
            lastResetDate: this.lastResetDate
        };
        localStorage.setItem('teaTrackerData', JSON.stringify(data));
    }

    loadData() {
        const saved = localStorage.getItem('teaTrackerData');
        if (saved) {
            const data = JSON.parse(saved);
            this.finished = data.finished;
            this.unfinished = data.unfinished;
            this.lastResetDate = data.lastResetDate;
            this.updateMoodEmoji();
        }
    }

    removeTea(type) {
        if (type === 'finished' && this.finished > 0) {
            this.finished--;
        } else if (type === 'unfinished' && this.unfinished > 0) {
            this.unfinished--;
        }
        this.saveData();
        this.updateDisplay();
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new TeaTracker();
}); 