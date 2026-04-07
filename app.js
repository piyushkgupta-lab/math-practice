// Main app — routes between views, handles auth, practice, and dashboards.

import { profiles, isFirebaseConfigured } from './firebase-config.js';
import { generateQuestions, TOPIC_LABELS } from './questions.js';
import { saveSession, getSessions, isUsingFirebase } from './storage.js';

// ============ STATE ============
const state = {
  selectedProfileId: null,
  currentProfile: null,
  practice: null,  // { questions, currentIdx, answers, startedAt }
};

// ============ VIEW SWITCHING ============
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ============ LOGIN ============
function renderProfilePicker() {
  const picker = document.getElementById('profile-picker');
  picker.innerHTML = '';
  profiles.forEach(p => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'profile-btn';
    btn.dataset.id = p.id;
    btn.innerHTML = `<span class="emoji">${p.emoji}</span><span class="label">${p.name}</span>`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.profile-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.selectedProfileId = p.id;
      document.getElementById('pin-input').focus();
    });
    picker.appendChild(btn);
  });
}

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const pinInput = document.getElementById('pin-input');
  const errEl = document.getElementById('login-error');
  errEl.hidden = true;

  if (!state.selectedProfileId) {
    errEl.textContent = 'Please pick a profile first.';
    errEl.hidden = false;
    return;
  }
  const profile = profiles.find(p => p.id === state.selectedProfileId);
  if (!profile || profile.pin !== pinInput.value) {
    errEl.textContent = 'Wrong PIN. Try again.';
    errEl.hidden = false;
    pinInput.value = '';
    return;
  }
  state.currentProfile = profile;
  pinInput.value = '';
  if (profile.role === 'parent') {
    enterParentView();
  } else {
    enterStudentView();
  }
});

// ============ STUDENT DASHBOARD ============
async function enterStudentView() {
  const p = state.currentProfile;
  document.getElementById('student-avatar').textContent = p.emoji;
  document.getElementById('student-greeting').textContent = `Hi ${p.name}!`;
  document.getElementById('student-class').textContent = `Grade ${p.grade}`;

  // Topic pills
  const pills = document.getElementById('topic-pills');
  pills.innerHTML = '';
  const topicList = ['Arithmetic', 'Fractions', 'Decimals', 'Percentages', 'Geometry', 'Algebra', 'Word Problems'];
  topicList.forEach(t => {
    const pill = document.createElement('span');
    pill.className = 'topic-pill';
    pill.textContent = t;
    pills.appendChild(pill);
  });

  showView('view-student');
  await refreshStudentStats();
}

async function refreshStudentStats() {
  const sessions = await getSessions(state.currentProfile.id);
  const total = sessions.length;
  const answered = sessions.reduce((s, x) => s + (x.total || 0), 0);
  const correct = sessions.reduce((s, x) => s + (x.correct || 0), 0);
  const accuracy = answered ? Math.round((correct / answered) * 100) : null;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-accuracy').textContent = accuracy !== null ? `${accuracy}%` : '—';
  document.getElementById('stat-answered').textContent = answered;

  // Streak
  const streak = calcStreak(sessions);
  document.getElementById('streak-count').textContent = streak;
  const todayDone = hasSessionToday(sessions);
  document.getElementById('streak-sub').textContent = todayDone
    ? 'Done for today — amazing!'
    : 'Practice today to keep it going';
  document.getElementById('today-done').hidden = !todayDone;

  // History
  const historyEl = document.getElementById('student-history');
  if (sessions.length === 0) {
    historyEl.innerHTML = '<p class="empty">No sessions yet. Start your first practice above!</p>';
  } else {
    historyEl.innerHTML = '';
    sessions.slice(0, 8).forEach(s => {
      const row = document.createElement('div');
      row.className = 'history-item';
      row.innerHTML = `
        <span class="history-date">${formatDate(s.timestamp)}</span>
        <span class="history-score">${s.correct}/${s.total} · ${Math.round((s.correct / s.total) * 100)}%</span>
      `;
      historyEl.appendChild(row);
    });
  }
}

function calcStreak(sessions) {
  if (!sessions.length) return 0;
  const days = new Set(sessions.map(s => new Date(s.timestamp).toDateString()));
  let streak = 0;
  let d = new Date();
  // If not practiced today, start checking from yesterday
  if (!days.has(d.toDateString())) d.setDate(d.getDate() - 1);
  while (days.has(d.toDateString())) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

function hasSessionToday(sessions) {
  const today = new Date().toDateString();
  return sessions.some(s => new Date(s.timestamp).toDateString() === today);
}

function formatDate(ts) {
  const d = new Date(ts);
  const today = new Date();
  const yest = new Date(); yest.setDate(yest.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return `Today, ${d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
  if (d.toDateString() === yest.toDateString()) return `Yesterday`;
  return d.toLocaleDateString([], { day: 'numeric', month: 'short' });
}

document.getElementById('student-logout').addEventListener('click', () => {
  state.currentProfile = null;
  state.selectedProfileId = null;
  document.querySelectorAll('.profile-btn').forEach(b => b.classList.remove('selected'));
  showView('view-login');
});

document.getElementById('start-practice').addEventListener('click', startPractice);

// ============ PRACTICE FLOW ============
function startPractice() {
  const p = state.currentProfile;
  state.practice = {
    questions: generateQuestions(p.grade, 15),
    currentIdx: 0,
    answers: [],
    startedAt: Date.now()
  };
  document.getElementById('q-total').textContent = state.practice.questions.length;
  showView('view-practice');
  renderQuestion();
}

function renderQuestion() {
  const p = state.practice;
  const q = p.questions[p.currentIdx];
  document.getElementById('q-num').textContent = p.currentIdx + 1;
  document.getElementById('live-score').textContent = p.answers.filter(a => a.correct).length;
  document.getElementById('progress-fill').style.width = `${(p.currentIdx / p.questions.length) * 100}%`;
  document.getElementById('q-topic').textContent = TOPIC_LABELS[q.topic] || q.topic;
  document.getElementById('q-text').textContent = q.text;

  const optsEl = document.getElementById('q-options');
  optsEl.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'q-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(idx));
    optsEl.appendChild(btn);
  });

  document.getElementById('q-feedback').className = 'q-feedback';
  document.getElementById('q-feedback').textContent = '';
  document.getElementById('next-q').hidden = true;
}

function selectAnswer(idx) {
  const p = state.practice;
  const q = p.questions[p.currentIdx];
  const correct = idx === q.correctIndex;
  p.answers.push({
    questionText: q.text,
    topic: q.topic,
    chosenIndex: idx,
    chosenText: q.options[idx],
    correctIndex: q.correctIndex,
    correctText: q.answerText,
    correct
  });

  const btns = document.querySelectorAll('.q-option');
  btns.forEach((b, i) => {
    b.classList.add('disabled');
    if (i === q.correctIndex) b.classList.add('correct');
    if (i === idx && !correct) b.classList.add('wrong');
    b.removeEventListener('click', () => {});
    b.onclick = null;
  });

  const fb = document.getElementById('q-feedback');
  if (correct) {
    fb.textContent = pick(['Nice!', 'Got it!', 'Correct!', 'Yes!', 'Bullseye!']);
    fb.className = 'q-feedback show right';
  } else {
    fb.textContent = `Not quite — the answer is ${q.answerText}.`;
    fb.className = 'q-feedback show wrong';
  }

  document.getElementById('live-score').textContent = p.answers.filter(a => a.correct).length;
  document.getElementById('progress-fill').style.width = `${((p.currentIdx + 1) / p.questions.length) * 100}%`;

  const nextBtn = document.getElementById('next-q');
  nextBtn.hidden = false;
  nextBtn.textContent = p.currentIdx === p.questions.length - 1 ? 'See results →' : 'Next →';
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

document.getElementById('next-q').addEventListener('click', () => {
  const p = state.practice;
  if (p.currentIdx < p.questions.length - 1) {
    p.currentIdx++;
    renderQuestion();
  } else {
    finishPractice();
  }
});

document.getElementById('quit-practice').addEventListener('click', () => {
  if (confirm('Quit practice? Your progress on this session will not be saved.')) {
    state.practice = null;
    enterStudentView();
  }
});

async function finishPractice() {
  const p = state.practice;
  const correct = p.answers.filter(a => a.correct).length;
  const total = p.questions.length;
  const session = {
    timestamp: Date.now(),
    correct,
    total,
    answers: p.answers,
    grade: state.currentProfile.grade,
    durationSec: Math.round((Date.now() - p.startedAt) / 1000)
  };
  await saveSession(state.currentProfile.id, session);
  showResults(session);
}

function showResults(session) {
  const pct = Math.round((session.correct / session.total) * 100);
  document.getElementById('results-correct').textContent = session.correct;
  document.getElementById('results-total').textContent = session.total;
  document.getElementById('results-pct').textContent = pct;

  let emoji = '🎉', title = 'Nice work!';
  if (pct === 100) { emoji = '🏆'; title = 'Perfect score!'; }
  else if (pct >= 85) { emoji = '⭐'; title = 'Excellent!'; }
  else if (pct >= 70) { emoji = '👍'; title = 'Good job!'; }
  else if (pct >= 50) { emoji = '💪'; title = 'Keep practicing!'; }
  else { emoji = '📚'; title = "Let's review together"; }
  document.getElementById('results-emoji').textContent = emoji;
  document.getElementById('results-title').textContent = title;

  const reviewEl = document.getElementById('results-review');
  reviewEl.innerHTML = '';
  session.answers.forEach((a, i) => {
    const row = document.createElement('div');
    row.className = 'review-item';
    const mark = a.correct
      ? '<span class="mark ok">✓</span>'
      : '<span class="mark no">✗</span>';
    const detail = a.correct
      ? `<div class="review-meta">Your answer: ${a.chosenText}</div>`
      : `<div class="review-meta">Your answer: <span style="color:#8a2d20">${a.chosenText}</span> · Correct: <span style="color:#3a5f3d">${a.correctText}</span></div>`;
    row.innerHTML = `<div class="review-q">${mark}${i + 1}. ${a.questionText}</div>${detail}`;
    reviewEl.appendChild(row);
  });

  showView('view-results');
}

document.getElementById('results-home').addEventListener('click', () => {
  state.practice = null;
  enterStudentView();
});
document.getElementById('results-again').addEventListener('click', () => {
  startPractice();
});

// ============ PARENT DASHBOARD ============
let parentViewingKidId = null;

async function enterParentView() {
  // Build kid tabs
  const kids = profiles.filter(p => p.role === 'student');
  const tabsEl = document.getElementById('kid-tabs');
  tabsEl.innerHTML = '';
  kids.forEach((k, idx) => {
    const btn = document.createElement('button');
    btn.className = 'kid-tab' + (idx === 0 ? ' active' : '');
    btn.textContent = `${k.emoji} ${k.name} (Gr ${k.grade})`;
    btn.dataset.id = k.id;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.kid-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      parentViewingKidId = k.id;
      renderParentDashboard();
    });
    tabsEl.appendChild(btn);
  });
  parentViewingKidId = kids[0]?.id;
  showView('view-parent');
  renderParentDashboard();
}

async function renderParentDashboard() {
  if (!parentViewingKidId) return;
  const sessions = await getSessions(parentViewingKidId);

  // Top stats
  const total = sessions.length;
  const answered = sessions.reduce((s, x) => s + (x.total || 0), 0);
  const correct = sessions.reduce((s, x) => s + (x.correct || 0), 0);
  const accuracy = answered ? Math.round((correct / answered) * 100) : null;
  const streak = calcStreak(sessions);
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const thisWeek = sessions.filter(s => s.timestamp >= weekAgo).length;

  document.getElementById('p-stat-sessions').textContent = total;
  document.getElementById('p-stat-accuracy').textContent = accuracy !== null ? `${accuracy}%` : '—';
  document.getElementById('p-stat-streak').textContent = streak;
  document.getElementById('p-stat-week').textContent = thisWeek;

  // Topic breakdown
  const topicStats = {};
  sessions.forEach(s => {
    (s.answers || []).forEach(a => {
      if (!topicStats[a.topic]) topicStats[a.topic] = { correct: 0, total: 0 };
      topicStats[a.topic].total++;
      if (a.correct) topicStats[a.topic].correct++;
    });
  });
  const tbEl = document.getElementById('topic-breakdown');
  if (Object.keys(topicStats).length === 0) {
    tbEl.innerHTML = '<p class="empty">No data yet.</p>';
  } else {
    tbEl.innerHTML = '';
    Object.entries(topicStats)
      .sort((a, b) => b[1].total - a[1].total)
      .forEach(([topic, stat]) => {
        const pct = Math.round((stat.correct / stat.total) * 100);
        const fillClass = pct < 60 ? 'low' : pct < 80 ? 'mid' : '';
        const row = document.createElement('div');
        row.className = 'topic-row';
        row.innerHTML = `
          <div class="topic-row-label">${TOPIC_LABELS[topic] || topic}</div>
          <div class="topic-row-bar"><div class="fill ${fillClass}" style="width:${pct}%"></div></div>
          <div class="topic-row-pct">${pct}% (${stat.correct}/${stat.total})</div>
        `;
        tbEl.appendChild(row);
      });
  }

  // All sessions
  const sessEl = document.getElementById('parent-sessions');
  if (sessions.length === 0) {
    sessEl.innerHTML = '<p class="empty">No sessions yet.</p>';
  } else {
    sessEl.innerHTML = '';
    sessions.forEach(s => {
      const pct = Math.round((s.correct / s.total) * 100);
      const row = document.createElement('div');
      row.className = 'session-row';
      row.innerHTML = `
        <div class="session-row-top">
          <span class="session-date">${formatDate(s.timestamp)}</span>
          <span class="session-score">${s.correct}/${s.total} · ${pct}%</span>
        </div>
        <div class="session-meta">${s.durationSec ? Math.round(s.durationSec / 60) + ' min' : ''}${s.grade ? ' · Grade ' + s.grade : ''}</div>
      `;
      sessEl.appendChild(row);
    });
  }

  // Mistakes — recent wrong answers, deduped by question text
  const mistakesEl = document.getElementById('parent-mistakes');
  const wrongs = [];
  sessions.slice(0, 20).forEach(s => {
    (s.answers || []).forEach(a => {
      if (!a.correct) wrongs.push({ ...a, timestamp: s.timestamp });
    });
  });
  if (wrongs.length === 0) {
    mistakesEl.innerHTML = '<p class="empty">No mistakes logged yet.</p>';
  } else {
    mistakesEl.innerHTML = '';
    wrongs.slice(0, 15).forEach(w => {
      const row = document.createElement('div');
      row.className = 'mistake-row';
      row.innerHTML = `
        <div class="mistake-q">${w.questionText}</div>
        <div class="mistake-meta">
          ${TOPIC_LABELS[w.topic] || w.topic} · 
          Wrote <span class="wrong-ans">${w.chosenText}</span> · 
          Correct: <span class="correct-ans">${w.correctText}</span> · 
          ${formatDate(w.timestamp)}
        </div>
      `;
      mistakesEl.appendChild(row);
    });
  }
}

document.getElementById('parent-logout').addEventListener('click', () => {
  state.currentProfile = null;
  state.selectedProfileId = null;
  document.querySelectorAll('.profile-btn').forEach(b => b.classList.remove('selected'));
  showView('view-login');
});

// ============ FIRST RUN NOTICE ============
function maybeShowSetupModal() {
  if (!isFirebaseConfigured && !localStorage.getItem('setup_dismissed')) {
    document.getElementById('setup-modal').hidden = false;
  }
}
document.getElementById('setup-ok').addEventListener('click', () => {
  localStorage.setItem('setup_dismissed', '1');
  document.getElementById('setup-modal').hidden = true;
});

// ============ INIT ============
renderProfilePicker();
maybeShowSetupModal();
