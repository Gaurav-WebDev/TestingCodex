/* =============================================
   MindBloom – Mental Fitness for Young Minds
   script.js – Interactive Components
   ============================================= */

'use strict';

// ============================================================
// DATA – Quotes, Affirmations, Mood Responses
// ============================================================

const quotes = [
  { text: "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.", author: "Unknown" },
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.", author: "Noam Shpancer" },
  { text: "It's okay to not be okay — as long as you are not giving up.", author: "Karen Salmansohn" },
  { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush" },
  { text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", author: "Albus Dumbledore" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "Take care of your inner garden. The world blooms when you do.", author: "MindBloom" },
  { text: "Self-care is not selfish. You cannot pour from an empty cup.", author: "Eleanor Brown" },
  { text: "Every day may not be good, but there is something good in every day.", author: "Alice Morse Earle" },
  { text: "Be gentle with yourself. You are a child of the universe, no less than the trees and the stars.", author: "Max Ehrmann" },
  { text: "Healing is not linear. Some days will feel harder than others. That's okay.", author: "MindBloom" },
  { text: "You are worthy of rest. You are worthy of peace. You are worthy of joy.", author: "MindBloom" },
  { text: "The mind is like water. When it's turbulent, it's difficult to see. When it's calm, everything becomes clear.", author: "Prasad Mahes" },
  { text: "Starting over is an act of courage, not defeat. You're still here, still trying. That matters.", author: "MindBloom" },
  { text: "Breathe. You have survived everything up until now. You will survive this too.", author: "Unknown" },
  { text: "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity.", author: "Unknown" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Promise me you'll always remember: You're braver than you believe, stronger than you seem.", author: "A.A. Milne" },
  { text: "The only way out is through. Keep going.", author: "Robert Frost" }
];

const affirmations = [
  "\"I am capable of achieving great things.\"",
  "\"I deserve love, happiness, and peace.\"",
  "\"My feelings are valid and I honor them.\"",
  "\"I am growing stronger every single day.\"",
  "\"I choose progress over perfection.\"",
  "\"I release what I cannot control.\"",
  "\"I am enough, exactly as I am right now.\"",
  "\"My mind is calm and my heart is open.\"",
  "\"I attract positivity and repel negativity.\"",
  "\"I am resilient. I bounce back from challenges.\"",
  "\"Today I choose joy, even in small moments.\"",
  "\"I trust the process of my own journey.\"",
  "\"I am worthy of good things happening to me.\"",
  "\"My potential is limitless and growing.\"",
  "\"I give myself permission to rest and recharge.\"",
  "\"Every breath I take renews my strength.\"",
  "\"I am proud of how far I've come.\"",
  "\"I am surrounded by love and support.\"",
  "\"My challenges are shaping me into who I am meant to be.\"",
  "\"I radiate confidence, self-respect, and inner harmony.\""
];

const moodResponses = {
  "😄": {
    label: "Great",
    response: "Amazing! 🎉 You're thriving — keep doing what you're doing and spread that positive energy!",
    tip: "Tip: Journal about what's going right to reinforce these good feelings."
  },
  "🙂": {
    label: "Good",
    response: "That's wonderful! 😊 Good days are a gift. Savor this feeling and be present.",
    tip: "Tip: Take a moment to appreciate three things that contributed to this positive mood."
  },
  "😐": {
    label: "Okay",
    response: "Neutral days are completely normal. 🌤️ You don't have to feel amazing every day.",
    tip: "Tip: Try a short walk, some music, or a breathing exercise to gently uplift your mood."
  },
  "😔": {
    label: "Low",
    response: "It's okay to feel low sometimes. You're not alone. 💙 Be gentle with yourself today.",
    tip: "Tip: Reach out to someone you trust, do something small and kind for yourself."
  },
  "😰": {
    label: "Anxious",
    response: "Anxiety can feel overwhelming, but it will pass. You are safe right now. 🌿",
    tip: "Tip: Try the 4-7-8 breathing below, or ground yourself with the 5-4-3-2-1 technique."
  }
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function animateElement(el) {
  el.style.animation = 'none';
  el.offsetHeight; // trigger reflow to force browser to reset animation state
  el.style.animation = '';
}

// ============================================================
// NAVIGATION
// ============================================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Sticky nav with scroll shadow
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open').toString());
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// Active nav link highlighting on scroll
const sections = document.querySelectorAll('section[id]');

function highlightActiveNav() {
  const scrollPos = window.scrollY + 80;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    if (navLink) {
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
        navLink.style.color = '#6366f1';
      }
    }
  });
}

window.addEventListener('scroll', highlightActiveNav, { passive: true });

// ============================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================================

const fadeUpElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeUpElements.forEach(el => observer.observe(el));

// ============================================================
// DAILY MOTIVATION QUOTE
// ============================================================

const dailyQuoteEl = document.getElementById('daily-quote');
const quoteAuthorEl = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote');
let lastQuoteIndex = -1;

function displayQuote() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * quotes.length);
  } while (randomIndex === lastQuoteIndex && quotes.length > 1);
  lastQuoteIndex = randomIndex;

  const quote = quotes[randomIndex];
  dailyQuoteEl.style.opacity = '0';
  quoteAuthorEl.style.opacity = '0';

  setTimeout(() => {
    dailyQuoteEl.textContent = `"${quote.text}"`;
    quoteAuthorEl.textContent = `— ${quote.author}`;
    dailyQuoteEl.style.transition = 'opacity 0.5s ease';
    quoteAuthorEl.style.transition = 'opacity 0.5s ease 0.1s';
    dailyQuoteEl.style.opacity = '1';
    quoteAuthorEl.style.opacity = '1';
  }, 250);
}

// Load quote on page load
displayQuote();

newQuoteBtn.addEventListener('click', displayQuote);

// ============================================================
// TOOLS SECTION – Quote Tool
// ============================================================

const quoteToolEl = document.getElementById('daily-quote-tool');
const newQuoteToolBtn = document.getElementById('new-quote-tool');
let lastToolQuoteIndex = -1;

function displayToolQuote() {
  let idx;
  do {
    idx = Math.floor(Math.random() * quotes.length);
  } while (idx === lastToolQuoteIndex && quotes.length > 1);
  lastToolQuoteIndex = idx;

  const q = quotes[idx];
  quoteToolEl.style.opacity = '0';
  setTimeout(() => {
    quoteToolEl.textContent = `"${q.text}"`;
    quoteToolEl.style.transition = 'opacity 0.4s ease';
    quoteToolEl.style.opacity = '1';
  }, 200);
}

newQuoteToolBtn.addEventListener('click', displayToolQuote);

// ============================================================
// BREATHING EXERCISE
// ============================================================

const startBreathingBtn = document.getElementById('start-breathing');
const stopBreathingBtn = document.getElementById('stop-breathing');
const breathingExercise = document.getElementById('breathing-exercise');
const breathCircle = document.getElementById('breath-circle');
const breathText = document.getElementById('breath-text');
const breathInstruction = document.getElementById('breath-instruction');

let breathingTimeout = null;
let breathingActive = false;

const breathingCycles = [
  { class: 'inhale', text: 'Breathe In', instruction: 'Slowly inhale through your nose...', duration: 4000 },
  { class: 'hold', text: 'Hold', instruction: 'Gently hold your breath...', duration: 7000 },
  { class: 'exhale', text: 'Breathe Out', instruction: 'Slowly exhale through your mouth...', duration: 8000 },
];

let cycleIndex = 0;

function runBreathingCycle() {
  if (!breathingActive) return;

  const cycle = breathingCycles[cycleIndex];
  breathCircle.className = 'breath-circle ' + cycle.class;
  breathText.textContent = cycle.text;
  breathInstruction.textContent = cycle.instruction;

  breathingTimeout = setTimeout(() => {
    if (breathingActive) {
      cycleIndex = (cycleIndex + 1) % breathingCycles.length;
      runBreathingCycle();
    }
  }, cycle.duration);
}

startBreathingBtn.addEventListener('click', () => {
  breathingExercise.style.display = 'block';
  startBreathingBtn.style.display = 'none';
  breathingActive = true;
  cycleIndex = 0;
  runBreathingCycle();
});

stopBreathingBtn.addEventListener('click', () => {
  breathingActive = false;
  clearTimeout(breathingTimeout);
  breathingExercise.style.display = 'none';
  startBreathingBtn.style.display = 'block';
  breathCircle.className = 'breath-circle';
});

// ============================================================
// MEDITATION TIMER
// ============================================================

const openMeditationBtn = document.getElementById('open-meditation');
const stopMeditationBtn = document.getElementById('stop-meditation');
const meditationTool = document.getElementById('meditation-tool');
const timerDisplay = document.getElementById('timer-display');
const timerStartBtn = document.getElementById('timer-start');
const timerPlusBtn = document.getElementById('timer-plus');
const timerMinusBtn = document.getElementById('timer-minus');

let timerSeconds = 300; // 5 minutes default
let timerInterval = null;
let timerRunning = false;

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timerSeconds);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerStartBtn.textContent = 'Start';
  timerDisplay.classList.remove('active');
}

timerStartBtn.addEventListener('click', () => {
  if (timerRunning) {
    stopTimer();
    return;
  }
  if (timerSeconds <= 0) {
    timerSeconds = 300;
    updateTimerDisplay();
  }
  timerRunning = true;
  timerStartBtn.textContent = 'Pause';
  timerDisplay.classList.add('active');

  timerInterval = setInterval(() => {
    timerSeconds--;
    updateTimerDisplay();
    if (timerSeconds <= 0) {
      stopTimer();
      timerDisplay.textContent = '🎉 Done!';
      setTimeout(() => {
        timerSeconds = 300;
        updateTimerDisplay();
      }, 3000);
    }
  }, 1000);
});

timerPlusBtn.addEventListener('click', () => {
  if (!timerRunning) {
    timerSeconds = Math.min(timerSeconds + 60, 3600);
    updateTimerDisplay();
  }
});

timerMinusBtn.addEventListener('click', () => {
  if (!timerRunning) {
    timerSeconds = Math.max(timerSeconds - 60, 60);
    updateTimerDisplay();
  }
});

openMeditationBtn.addEventListener('click', () => {
  meditationTool.style.display = 'block';
  openMeditationBtn.style.display = 'none';
});

stopMeditationBtn.addEventListener('click', () => {
  stopTimer();
  timerSeconds = 300;
  updateTimerDisplay();
  meditationTool.style.display = 'none';
  openMeditationBtn.style.display = 'block';
});

// ============================================================
// AFFIRMATIONS
// ============================================================

const affirmationText = document.getElementById('affirmation-text');
const newAffirmationBtn = document.getElementById('new-affirmation');
let lastAffirmationIndex = -1;

function showNewAffirmation() {
  let idx;
  do {
    idx = Math.floor(Math.random() * affirmations.length);
  } while (idx === lastAffirmationIndex && affirmations.length > 1);
  lastAffirmationIndex = idx;

  affirmationText.style.opacity = '0';
  setTimeout(() => {
    affirmationText.textContent = affirmations[idx];
    affirmationText.style.transition = 'opacity 0.4s ease';
    affirmationText.style.opacity = '1';
  }, 200);
}

newAffirmationBtn.addEventListener('click', showNewAffirmation);

// ============================================================
// MOOD TRACKER
// ============================================================

const moodButtons = document.querySelectorAll('.mood-btn');
const moodResult = document.getElementById('mood-result');

moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mood = btn.getAttribute('data-mood');
    const response = moodResponses[mood];

    // Remove selected class from all
    moodButtons.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    if (response) {
      moodResult.innerHTML = `<strong>${response.response}</strong><br><em>${response.tip}</em>`;
      moodResult.classList.add('show');
    }
  });
});

// ============================================================
// GRATITUDE JOURNAL
// ============================================================

const gratitudeInput = document.getElementById('gratitude-input');
const addGratitudeBtn = document.getElementById('add-gratitude');
const gratitudeList = document.getElementById('gratitude-list');

// Load from sessionStorage
function loadGratitudeItems() {
  const saved = sessionStorage.getItem('gratitude_items');
  if (saved) {
    try {
      const items = JSON.parse(saved);
      items.forEach(text => addGratitudeItem(text, false));
    } catch (e) {
      // ignore parse errors
    }
  }
}

function saveGratitudeItems() {
  const items = Array.from(gratitudeList.querySelectorAll('li')).map(li => li.dataset.text);
  sessionStorage.setItem('gratitude_items', JSON.stringify(items));
}

function addGratitudeItem(text, save = true) {
  if (!text || !text.trim()) return;
  const sanitized = text.trim();
  if (sanitized.length === 0) return;

  const li = document.createElement('li');
  li.dataset.text = sanitized;
  li.textContent = sanitized;
  gratitudeList.appendChild(li);

  if (save) saveGratitudeItems();
}

addGratitudeBtn.addEventListener('click', () => {
  const val = gratitudeInput.value;
  if (!val.trim()) return;
  addGratitudeItem(val);
  gratitudeInput.value = '';
  gratitudeInput.focus();
});

gratitudeInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addGratitudeBtn.click();
  }
});

loadGratitudeItems();

// ============================================================
// CONTACT FORM
// ============================================================

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function getFieldError(field) {
  const errorEl = document.getElementById(`${field.id}-error`);
  return errorEl;
}

function showError(field, message) {
  field.classList.add('error');
  const errorEl = getFieldError(field);
  if (errorEl) errorEl.textContent = message;
}

function clearError(field) {
  field.classList.remove('error');
  const errorEl = getFieldError(field);
  if (errorEl) errorEl.textContent = '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');
  let valid = true;

  clearError(nameField);
  clearError(emailField);
  clearError(messageField);

  if (!nameField.value.trim()) {
    showError(nameField, 'Please enter your name.');
    valid = false;
  } else if (nameField.value.trim().length < 2) {
    showError(nameField, 'Name must be at least 2 characters.');
    valid = false;
  }

  if (!emailField.value.trim()) {
    showError(emailField, 'Please enter your email address.');
    valid = false;
  } else if (!validateEmail(emailField.value.trim())) {
    showError(emailField, 'Please enter a valid email address.');
    valid = false;
  }

  if (!messageField.value.trim()) {
    showError(messageField, 'Please enter your message.');
    valid = false;
  } else if (messageField.value.trim().length < 10) {
    showError(messageField, 'Message must be at least 10 characters.');
    valid = false;
  }

  return valid;
}

// Clear errors on input
['name', 'email', 'message'].forEach(id => {
  const field = document.getElementById(id);
  if (field) {
    field.addEventListener('input', () => clearError(field));
  }
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  // Simulate form submission
  const submitBtn = contactForm.querySelector('[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    contactForm.reset();
    formSuccess.style.display = 'flex';
    submitBtn.textContent = 'Send Message 💚';
    submitBtn.disabled = false;

    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 6000);
  }, 1200);
});

// ============================================================
// INITIALIZE ON PAGE LOAD
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initial affirmation already set in HTML
  // Initial quote already loaded above
  // Initial timer display
  updateTimerDisplay();
});
