// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9plfeglhskLJ7eBwE4U9Ox-ZqewbrnUQ",
  authDomain: "auto-negocie.firebaseapp.com",
  projectId: "auto-negocie",
  storageBucket: "auto-negocie.appspot.com",
  messagingSenderId: "851854343265",
  appId: "1:851854343265:web:dfcc1a9aea5edbe9397e20",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
