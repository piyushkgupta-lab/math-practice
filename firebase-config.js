// ============================================================
// FIREBASE CONFIGURATION
// ============================================================
// Replace the values below with your own Firebase project config.
// See README.md "Firebase Setup" section for step-by-step instructions.
// If you leave it as-is, the app will fall back to browser-only storage.
// ============================================================

export const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId: "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_SENDER_ID_HERE",
  appId: "PASTE_YOUR_APP_ID_HERE"
};

// ============================================================
// PROFILES — customize names, emojis, grades, and PINs here
// ============================================================
// Change these to your kids' actual names. PINs should be 4-6 digits.
// ============================================================

export const profiles = [
  {
    id: 'son',
    name: 'Son',          // ← change to your son's name
    emoji: '🦁',
    grade: 5,
    pin: '1234',          // ← change to a PIN your son will remember
    role: 'student'
  },
  {
    id: 'daughter',
    name: 'Daughter',     // ← change to your daughter's name
    emoji: '🦊',
    grade: 7,
    pin: '5678',          // ← change to a PIN your daughter will remember
    role: 'student'
  },
  {
    id: 'parent',
    name: 'Parent',
    emoji: '👤',
    grade: null,
    pin: '9999',          // ← change to your own PIN
    role: 'parent'
  }
];

// Is Firebase configured?
export const isFirebaseConfigured = firebaseConfig.apiKey !== "PASTE_YOUR_API_KEY_HERE";
