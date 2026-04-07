// ============================================================
// FIREBASE CONFIGURATION
// ============================================================
// Replace the values below with your own Firebase project config.
// See README.md "Firebase Setup" section for step-by-step instructions.
// If you leave it as-is, the app will fall back to browser-only storage.
// ============================================================

export const firebaseConfig = {
apiKey: "AIzaSyDAqvV-PzwT_fIVgV17fYS_ZrwCAgLIZs4",
  authDomain: "math-practice-daily.firebaseapp.com",
  projectId: "math-practice-daily",
  storageBucket: "math-practice-daily.firebasestorage.app",
  messagingSenderId: "711620084942",
  appId: "1:711620084942:web:013327038594c8b9d67c9f"
};

// ============================================================
// PROFILES — customize names, emojis, grades, and PINs here
// ============================================================
// Change these to your kids' actual names. PINs should be 4-6 digits.
// ============================================================

export const profiles = [
  {
    id: 'son',
    name: 'Abir',          // ← change to your son's name
    emoji: '🦁',
    grade: 5,
    pin: '1234',          // ← change to a PIN your son will remember
    role: 'student'
  },
  {
    id: 'daughter',
    name: 'Arianna',     // ← change to your daughter's name
    emoji: '🦊',
    grade: 7,
    pin: '1234',          // ← change to a PIN your daughter will remember
    role: 'student'
  },
  {
    id: 'parent',
    name: 'Parent',
    emoji: '👤',
    grade: null,
    pin: '1707',          // ← change to your own PIN
    role: 'parent'
  }
];

// Is Firebase configured?
export const isFirebaseConfigured = firebaseConfig.apiKey !== "PASTE_YOUR_API_KEY_HERE";

