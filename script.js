const breathingBtn = document.getElementById("breathingBtn");
const breathingStatus = document.getElementById("breathingStatus");
const moodForm = document.getElementById("moodForm");
const moodSelect = document.getElementById("moodSelect");
const moodList = document.getElementById("moodList");
const planForm = document.getElementById("planForm");
const planOutput = document.getElementById("planOutput");

let breathingActive = false;

breathingBtn.addEventListener("click", () => {
  if (breathingActive) {
    return;
  }

  breathingActive = true;
  let secondsLeft = 60;
  breathingStatus.textContent = `Breathing reset started: ${secondsLeft}s left.`;

  const timer = setInterval(() => {
    secondsLeft -= 1;
    breathingStatus.textContent =
      secondsLeft > 0
        ? `Keep breathing slowly... ${secondsLeft}s left.`
        : "Done. Great job showing up for yourself today.";

    if (secondsLeft <= 0) {
      clearInterval(timer);
      breathingActive = false;
    }
  }, 1000);
});

moodForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedMood = moodSelect.value;
  const now = new Date();

  const item = document.createElement("li");
  item.textContent = `${selectedMood} — ${now.toLocaleString()}`;
  moodList.prepend(item);

  moodForm.reset();
});

planForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const sleep = document.getElementById("sleep").value.trim();
  const movement = document.getElementById("movement").value.trim();
  const focus = document.getElementById("focus").value.trim();
  const connection = document.getElementById("connection").value.trim();

  planOutput.classList.remove("hidden");
  planOutput.innerHTML = `
    <h3>Your practical 7-day plan</h3>
    <ul>
      <li><strong>Sleep:</strong> ${sleep}</li>
      <li><strong>Movement:</strong> ${movement}</li>
      <li><strong>Study focus:</strong> ${focus}</li>
      <li><strong>Connection:</strong> ${connection}</li>
    </ul>
    <p><strong>Reminder:</strong> Progress over perfection. If one day is hard, restart the next day.</p>
  `;
});
