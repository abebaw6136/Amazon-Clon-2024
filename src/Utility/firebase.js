import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// cSpell:ignore Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_LrDGDWAVMFVk6qF_6s1saFqSO4Epzec",
  authDomain: "clone-2024.firebaseapp.com",
  projectId: "clone-2024", // Corrected here
  storageBucket: "clone-2024.firebasestorage.app",
  messagingSenderId: "642541825167",
  appId: "1:642541825167:web:5ec7a240de8b05c7fb54fa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
