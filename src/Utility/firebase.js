import firebase from "firebase/compat/app"
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore" ;
import "firebase/compat/auth";

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
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();