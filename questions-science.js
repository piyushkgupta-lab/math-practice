// Picks science questions from subject banks.
// Shuffles options so the correct answer is in a random position each time.
// Also rotates through questions so the same ones don't appear too often.

import { PHYSICS_BANK } from './questions-physics.js';
import { CHEMISTRY_BANK } from './questions-chemistry.js';
import { BIOLOGY_BANK } from './questions-biology.js';

const BANKS = {
  physics: PHYSICS_BANK,
  chemistry: CHEMISTRY_BANK,
  biology: BIOLOGY_BANK
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Shuffle a question's options while keeping track of the correct answer
function shuffleOptions(q) {
  const correctAnswer = q.options[q.correctIndex];
  const shuffled = shuffle(q.options);
  const newCorrectIndex = shuffled.indexOf(correctAnswer);
  return {
    topic: q.topic,
    type: q.type,
    text: q.text,
    options: shuffled,
    correctIndex: newCorrectIndex,
    answerText: correctAnswer,
    explain: q.explain
  };
}

export function generateScienceQuestions(subject, count = 15) {
  const bank = BANKS[subject];
  if (!bank) throw new Error(`Unknown subject: ${subject}`);
  // Randomly pick `count` questions without replacement (if bank is big enough)
  const shuffledBank = shuffle(bank);
  const picked = shuffledBank.slice(0, Math.min(count, bank.length));
  // If the bank is smaller than count, pad with more random picks (allows repeats)
  while (picked.length < count) {
    picked.push(bank[Math.floor(Math.random() * bank.length)]);
  }
  // Shuffle options within each question
  return picked.map(shuffleOptions);
}

export function getBankSize(subject) {
  return BANKS[subject]?.length || 0;
}
