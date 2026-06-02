// Replace your existing MOOD TRACKER script section with this:

let selectedMoodEmoji = null;
let selectedMoodLabel = null;

// 1. Load history from localStorage immediately when the page opens
const moodHistory = JSON.parse(localStorage.getItem('wavelength_moods')) || [];

// 2. Automatically render any saved data on page load
document.addEventListener("DOMContentLoaded", () => {
  renderMoodHistory();
});

function selectMood(el, emoji, label) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedMoodEmoji = emoji;
  selectedMoodLabel = label;
}

function saveMood() {
  if (!selectedMoodEmoji) {
    document.getElementById('moodMessage').textContent = 'Please select how you\'re feeling first.';
    return;
  }
  const note = document.getElementById('moodNote').value.trim();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  
  // Add new entry to the array
  moodHistory.unshift({ emoji: selectedMoodEmoji, label: selectedMoodLabel, note, time: timeStr });
  
  // 3. LOCK IT INTO LOCAL STORAGE
  localStorage.setItem('wavelength_moods', JSON.stringify(moodHistory));
  
  renderMoodHistory();
  document.getElementById('moodNote').value = '';
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  const msgs = ['Check-in saved 💚', 'Noted — thank you for checking in 🌿', 'Saved! Remember, all feelings are valid 🙂'];
  document.getElementById('moodMessage').textContent = msgs[Math.floor(Math.random()*msgs.length)];
  selectedMoodEmoji = null;
  selectedMoodLabel = null;
  setTimeout(() => document.getElementById('moodMessage').textContent = '', 3000);
}

function renderMoodHistory() {
  const el = document.getElementById('moodHistory');
  if (moodHistory.length === 0) {
    el.innerHTML = '<div class="mood-empty">Your mood history will appear here as you track your feelings.</div>';
    return;
  }
  // Show up to 6 recent check-ins
  el.innerHTML = moodHistory.slice(0, 6).map(e =>
    `<div class="mood-entry">
      <span class="time">${e.time}</span>
      <span style="font-size:1.2rem">${e.emoji}</span>
      <span style="font-weight:500;font-size:0.88rem">${e.label}</span>
      ${e.note ? `<span style="color:var(--text-muted);font-size:0.82rem;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.note}</span>` : ''}
    </div>`
  ).join('');
}