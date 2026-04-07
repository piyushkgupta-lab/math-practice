# Daily Math Practice

A simple, friendly math practice website for your two kids and you. Built for ICSE Grade 5 and Grade 7, with 15 questions per daily session covering arithmetic, fractions/decimals, percentages/ratios, geometry, algebra, and word problems.

**What you get:**
- Separate PIN-protected logins for your son, daughter, and you (parent)
- Kids see: today's practice button, streak counter, recent sessions, overall accuracy
- Parent sees: per-kid dashboard with accuracy by topic, all sessions, and a list of questions they got wrong (with what they answered vs. the correct answer)
- Progress saved to Firebase (syncs across devices) with automatic fallback to browser storage

---

## Part 1 — Configure the App (5 minutes)

Before you upload anything, open **`firebase-config.js`** in any text editor (Notepad, VS Code, even TextEdit) and do two things:

### 1a. Set your kids' names and PINs

Find the `profiles` section and change the `name` and `pin` for each person:

```js
export const profiles = [
  { id: 'son',      name: 'Aarav',  emoji: '🦁', grade: 5, pin: '1234', role: 'student' },
  { id: 'daughter', name: 'Diya',   emoji: '🦊', grade: 7, pin: '5678', role: 'student' },
  { id: 'parent',   name: 'Parent', emoji: '👤', grade: null, pin: '9999', role: 'parent' }
];
```

Pick 4-digit PINs your kids can remember. The parent PIN should be something they **don't** know (so they can't peek at their own "mistakes" log and feel embarrassed).

You can also change the emoji to anything you like (🐯 🐼 🦄 🚀 etc).

### 1b. Firebase config

You'll fill in the `firebaseConfig` object in **Part 2**. For now, leave the placeholder values — the app will work on a single device using browser storage until Firebase is set up. You can upload to GitHub first and configure Firebase afterwards.

---

## Part 2 — Firebase Setup (10 minutes, FREE)

Firebase is Google's free backend. This is what lets your daughter practice on her laptop and you review her progress on your phone.

### 2a. Create the Firebase project

1. Go to **https://console.firebase.google.com/** and sign in with your Google account.
2. Click **"Add project"** (or "Create a project").
3. Name it something like `daily-math` — click Continue.
4. Google Analytics: **turn it off** (not needed). Click Create project. Wait ~30 seconds.
5. When it's ready, click **Continue**.

### 2b. Add a Web App to the project

1. On the project home screen, click the **`</>`** icon (Web) under "Get started by adding Firebase to your app".
2. App nickname: `math-app` — click **Register app**.
3. Firebase will show you a code block containing `firebaseConfig = { ... }`. **Copy the values inside the braces.**
4. Click **Continue to console** (ignore the SDK installation steps — the app already has them).

### 2c. Paste the config into `firebase-config.js`

Open `firebase-config.js` and replace the `PASTE_...` placeholders with the values you copied. It should end up looking like:

```js
export const firebaseConfig = {
  apiKey: "AIzaSyABC...xyz",
  authDomain: "daily-math-xxxxx.firebaseapp.com",
  projectId: "daily-math-xxxxx",
  storageBucket: "daily-math-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

Save the file.

### 2d. Enable Firestore (the database)

1. Back in the Firebase console, in the left sidebar click **Build → Firestore Database**.
2. Click **Create database**.
3. Location: pick `asia-south1 (Mumbai)` — click Next.
4. Choose **"Start in test mode"** — click Create. Wait ~20 seconds.

### 2e. Set security rules (important!)

Test mode lets anyone read/write for 30 days. Let's lock it down so only your app can write:

1. In Firestore, click the **Rules** tab.
2. Replace everything with this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sessions/{sessionId} {
      allow read, write: if true;
    }
  }
}
```

3. Click **Publish**.

> **Note on security:** this app uses simple PIN auth (not Firebase Auth), so the rules above allow any client to read/write the `sessions` collection. For a private family app on a private GitHub Pages URL this is fine — no one will find it. If you want stronger security later, we can add Firebase Auth (ping me).

### 2f. (After GitHub upload) Authorize your GitHub Pages domain

Once you have your GitHub Pages URL (from Part 3 below), come back here:
1. In Firebase console, go to **Build → Authentication → Settings → Authorized domains**.
2. Click **Add domain** and add `yourusername.github.io`.

This step is only needed if you later add Firebase Auth. For just Firestore, you can skip it.

---

## Part 3 — Host on GitHub Pages (10 minutes)

### 3a. Create a GitHub account (skip if you have one)

Go to **https://github.com** and sign up. Free account is fine.

### 3b. Create a new repository

1. After logging in, click the **`+`** icon in the top-right → **New repository**.
2. Repository name: `math-practice` (or anything you like — lowercase, no spaces).
3. Set it to **Public** (GitHub Pages requires public for free accounts).
4. **Do NOT** tick "Add a README file" — leave everything unchecked.
5. Click **Create repository**.

### 3c. Upload the files

GitHub will show you a nearly empty page. Look for the text **"uploading an existing file"** (it's a link in the middle of the page) and click it.

1. Drag and drop **all the files** from this project folder into the upload area:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `questions.js`
   - `storage.js`
   - `firebase-config.js` (the one you edited)
   - `README.md`
2. Scroll down, in the "Commit changes" section just click the green **Commit changes** button.

Wait until the files appear in the list at the top of the repo page.

### 3d. Turn on GitHub Pages

1. In your repo, click the **Settings** tab (top right of the repo, next to "Insights").
2. In the left sidebar, click **Pages**.
3. Under "Build and deployment" → "Source", select **Deploy from a branch**.
4. Under "Branch", select **main** (or `master`) and **/ (root)**. Click **Save**.
5. GitHub will now build your site. Wait ~1 minute, then refresh the page.
6. At the top you'll see: **"Your site is live at `https://yourusername.github.io/math-practice/`"** — that's your URL! Click it.

**Bookmark that URL** on every device your family uses (phones, tablets, laptops). On iPhone/iPad you can use Safari's Share → "Add to Home Screen" to make it look like an app.

### 3e. Test it

1. Open the URL on one device, log in as your son with his PIN, do a practice session.
2. Open the same URL on another device, log in as parent with your PIN — you should see the session you just did under the kid's tab.
3. If the second device shows nothing, Firebase isn't connected yet. Double-check Part 2c (the config values) and Part 2d (Firestore is created).

---

## Updating the App Later

If you want to change PINs, names, or fix anything:
1. Edit the file in GitHub directly (click the file → pencil icon → edit → Commit changes), OR
2. Upload a replacement file (same way as Part 3c).

Changes go live within ~1 minute.

---

## Files in this project

| File | What it does |
|---|---|
| `index.html` | The page structure (all views in one file) |
| `styles.css` | All styling |
| `app.js` | Main app logic — login, routing, dashboards |
| `questions.js` | Math question generators for Grade 5 and 7 |
| `storage.js` | Saves/loads sessions from Firebase or browser |
| `firebase-config.js` | Your personal config — names, PINs, Firebase keys |
| `README.md` | This file |

---

## Troubleshooting

**"I see the setup modal about Firebase every time"**
→ Your Firebase config still has placeholders. Check `firebase-config.js` — all six `PASTE_...` values need to be replaced.

**"Progress doesn't sync between devices"**
→ Firebase isn't connected. Open the browser's developer console (F12) on your site and look for errors. Usually it's one of: (a) typo in `firebase-config.js`, (b) Firestore not created, (c) Firestore rules still blocking access.

**"My daughter forgot her PIN"**
→ Edit `firebase-config.js` in GitHub, change her PIN, commit. Within a minute the new PIN is active.

**"I want to change the number of questions per session"**
→ In `app.js`, find `generateQuestions(p.grade, 15)` and change `15` to whatever you want.

**"The questions are too easy/hard"**
→ Edit `questions.js` — each topic generator is a small function you can tweak. Ranges like `rand(100, 9999)` control difficulty. Ask me if you want help adjusting.

---

Have fun practicing! 🎓
