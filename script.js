// ========== Scroll Animations ==========
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// ========== Navbar ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ========== Breathing Exercise ==========
const startBreathingBtn = document.getElementById('start-breathing');
const stopBreathingBtn = document.getElementById('stop-breathing');
const breathingExercise = document.getElementById('breathing-exercise');
const breathCircle = document.getElementById('breath-circle');
const breathText = document.getElementById('breath-text');
const breathInstruction = document.getElementById('breath-instruction');

let breathTimeout = null;
let breathActive = false;

const breathPhases = [
  { cls: 'inhale', text: 'Breathe In', instruction: 'Inhale slowly through your nose...', duration: 4000 },
  { cls: 'hold', text: 'Hold', instruction: 'Hold your breath gently...', duration: 7000 },
  { cls: 'exhale', text: 'Breathe Out', instruction: 'Exhale slowly through your mouth...', duration: 8000 },
];

function runBreathPhase(index) {
  if (!breathActive) return;
  const phase = breathPhases[index % breathPhases.length];
  breathCircle.className = 'breath-circle ' + phase.cls;
  breathText.textContent = phase.text;
  breathInstruction.textContent = phase.instruction;
  breathTimeout = setTimeout(() => runBreathPhase(index + 1), phase.duration);
}

startBreathingBtn.addEventListener('click', () => {
  breathingExercise.style.display = 'block';
  startBreathingBtn.style.display = 'none';
  breathActive = true;
  runBreathPhase(0);
});

stopBreathingBtn.addEventListener('click', () => {
  breathActive = false;
  clearTimeout(breathTimeout);
  breathingExercise.style.display = 'none';
  startBreathingBtn.style.display = 'block';
  breathCircle.className = 'breath-circle';
  breathText.textContent = 'Breathe In';
  breathInstruction.textContent = 'Follow the circle';
});

// ========== Meditation Timer ==========
const openMeditationBtn = document.getElementById('open-meditation');
const stopMeditationBtn = document.getElementById('stop-meditation');
const meditationTool = document.getElementById('meditation-tool');
const timerDisplay = document.getElementById('timer-display');
const timerStartBtn = document.getElementById('timer-start');
const timerMinusBtn = document.getElementById('timer-minus');
const timerPlusBtn = document.getElementById('timer-plus');

let timerMinutes = 5;
let timerSeconds = 0;
let timerInterval = null;
let timerRunning = false;

function updateTimerDisplay() {
  timerDisplay.textContent = String(timerMinutes).padStart(2, '0') + ':' + String(timerSeconds).padStart(2, '0');
}

openMeditationBtn.addEventListener('click', () => {
  meditationTool.style.display = 'block';
  openMeditationBtn.style.display = 'none';
});

stopMeditationBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerRunning = false;
  timerMinutes = 5;
  timerSeconds = 0;
  updateTimerDisplay();
  timerDisplay.classList.remove('active');
  timerStartBtn.textContent = 'Start';
  meditationTool.style.display = 'none';
  openMeditationBtn.style.display = 'block';
});

timerMinusBtn.addEventListener('click', () => {
  if (!timerRunning && timerMinutes > 1) {
    timerMinutes--;
    updateTimerDisplay();
  }
});

timerPlusBtn.addEventListener('click', () => {
  if (!timerRunning && timerMinutes < 60) {
    timerMinutes++;
    updateTimerDisplay();
  }
});

timerStartBtn.addEventListener('click', () => {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    timerDisplay.classList.remove('active');
    timerStartBtn.textContent = 'Resume';
  } else {
    timerRunning = true;
    timerDisplay.classList.add('active');
    timerStartBtn.textContent = 'Pause';
    timerInterval = setInterval(() => {
      if (timerSeconds === 0) {
        if (timerMinutes === 0) {
          clearInterval(timerInterval);
          timerRunning = false;
          timerDisplay.classList.remove('active');
          timerStartBtn.textContent = 'Start';
          timerMinutes = 5;
          timerSeconds = 0;
          updateTimerDisplay();
          return;
        }
        timerMinutes--;
        timerSeconds = 59;
      } else {
        timerSeconds--;
      }
      updateTimerDisplay();
    }, 1000);
  }
});

// ========== Affirmations ==========
const affirmations = [
  "I am capable of achieving great things.",
  "I choose to be kind to myself today.",
  "I am worthy of love and respect.",
  "Every challenge makes me stronger.",
  "I trust in my ability to figure things out.",
  "I am growing and learning every day.",
  "I deserve peace and happiness.",
  "I am enough, just as I am.",
  "I have the strength to overcome obstacles.",
  "I am in charge of how I feel today.",
];

const affirmationText = document.getElementById('affirmation-text');
const newAffirmationBtn = document.getElementById('new-affirmation');

newAffirmationBtn.addEventListener('click', () => {
  const text = affirmations[Math.floor(Math.random() * affirmations.length)];
  affirmationText.textContent = '"' + text + '"';
});

// ========== Mood Tracker ==========
const moodBtns = document.querySelectorAll('.mood-btn');
const moodResult = document.getElementById('mood-result');

const moodMessages = {
  '😄': "Wonderful! You're feeling great. Keep nurturing that positivity! 🌟",
  '🙂': "Good to hear you're doing well. Keep it up! 💚",
  '😐': "It's okay to feel neutral. Take a deep breath and be gentle with yourself. 🌿",
  '😔': "Sorry you're feeling low. Remember, it's okay not to be okay. You are not alone. 💙",
  '😰': "Feeling anxious is tough. Try the breathing exercise to help calm your nervous system. 🫁",
};

moodBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    moodBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    moodResult.textContent = moodMessages[btn.dataset.mood] || 'Thank you for checking in!';
    moodResult.classList.add('show');
  });
});

// ========== Gratitude Journal ==========
const gratitudeInput = document.getElementById('gratitude-input');
const addGratitudeBtn = document.getElementById('add-gratitude');
const gratitudeList = document.getElementById('gratitude-list');

function addGratitudeItem() {
  const text = gratitudeInput.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.textContent = text;
  gratitudeList.prepend(li);
  gratitudeInput.value = '';
  gratitudeInput.focus();
}

addGratitudeBtn.addEventListener('click', addGratitudeItem);
gratitudeInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addGratitudeItem();
});

// ========== Quotes ==========
const quotes = [
  { text: "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.", author: "Unknown" },
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "There is hope, even when your brain tells you there isn't.", author: "John Green" },
  { text: "Mental health is not a destination, but a process.", author: "Noam Shpancer" },
  { text: "You are not your illness. You have an individual story to tell.", author: "Julian Seifter" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "It's okay to not be okay as long as you are not giving up.", author: "Karen Salmansohn" },
];

const quoteToolText = document.getElementById('daily-quote-tool');
const newQuoteToolBtn = document.getElementById('new-quote-tool');

newQuoteToolBtn.addEventListener('click', () => {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  quoteToolText.textContent = '"' + q.text + '"';
});

const dailyQuote = document.getElementById('daily-quote');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote');

function setRandomQuote() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  dailyQuote.textContent = q.text;
  quoteAuthor.textContent = '— ' + q.author;
}

setRandomQuote();
newQuoteBtn.addEventListener('click', setRandomQuote);

// ========== Contact Form ==========
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const messageEl = document.getElementById('message');
  let valid = true;

  function setError(el, errorId, msg) {
    document.getElementById(errorId).textContent = msg;
    el.classList.toggle('error', !!msg);
    if (msg) valid = false;
  }

  setError(nameEl, 'name-error', nameEl.value.trim() ? '' : 'Please enter your name.');
  setError(emailEl, 'email-error', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailEl.value.trim()) ? '' : 'Please enter a valid email.');
  setError(messageEl, 'message-error', messageEl.value.trim() ? '' : 'Please enter a message.');

  if (valid) {
    formSuccess.style.display = 'flex';
    contactForm.reset();
    setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
  }
});
