import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYlwfuELGGoW9NKq9nck5sCFqqZCH72rk",
  authDomain: "request-supplies.firebaseapp.com",
  projectId: "request-supplies",
  storageBucket: "request-supplies.firebasestorage.app",
  messagingSenderId: "477294145708",
  appId: "1:477294145708:web:f4ede1642eb23eaecc2f09",
  measurementId: "G-S3LF1R1TN6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  app,
  auth,
  db,
  storage
};