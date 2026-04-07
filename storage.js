// Storage layer — uses Firebase Firestore if configured, else localStorage.
// Exposes: saveSession(profileId, session), getSessions(profileId)

import { firebaseConfig, isFirebaseConfigured } from './firebase-config.js';

let db = null;
let useFirebase = false;

async function initFirebase() {
  if (!isFirebaseConfigured) return false;
  try {
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
    const { getFirestore, collection, addDoc, getDocs, query, where, orderBy } =
      await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    db._helpers = { collection, addDoc, getDocs, query, where, orderBy };
    useFirebase = true;
    return true;
  } catch (e) {
    console.warn('Firebase init failed, falling back to localStorage:', e);
    useFirebase = false;
    return false;
  }
}

export const storageReady = initFirebase();

// ============ LOCAL STORAGE FALLBACK ============
const LS_KEY = 'mathapp_sessions_v1';

function lsGetAll() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function lsSave(profileId, session) {
  const all = lsGetAll();
  if (!all[profileId]) all[profileId] = [];
  all[profileId].push(session);
  localStorage.setItem(LS_KEY, JSON.stringify(all));
}

function lsGet(profileId) {
  const all = lsGetAll();
  return (all[profileId] || []).slice().sort((a, b) => b.timestamp - a.timestamp);
}

// ============ PUBLIC API ============

export async function saveSession(profileId, session) {
  await storageReady;
  if (useFirebase && db) {
    try {
      const { collection, addDoc } = db._helpers;
      await addDoc(collection(db, 'sessions'), {
        profileId,
        ...session
      });
      return true;
    } catch (e) {
      console.warn('Firebase save failed, falling back to localStorage:', e);
      lsSave(profileId, session);
      return true;
    }
  }
  lsSave(profileId, session);
  return true;
}

export async function getSessions(profileId) {
  await storageReady;
  if (useFirebase && db) {
    try {
      const { collection, getDocs, query, where, orderBy } = db._helpers;
      const q = query(
        collection(db, 'sessions'),
        where('profileId', '==', profileId),
        orderBy('timestamp', 'desc')
      );
      const snap = await getDocs(q);
      const out = [];
      snap.forEach(doc => out.push({ id: doc.id, ...doc.data() }));
      return out;
    } catch (e) {
      console.warn('Firebase fetch failed, falling back to localStorage:', e);
      return lsGet(profileId);
    }
  }
  return lsGet(profileId);
}

export function isUsingFirebase() {
  return useFirebase;
}
