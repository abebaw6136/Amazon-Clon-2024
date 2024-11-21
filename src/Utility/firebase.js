
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import the Firestore function

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_LrDGDWAVMFVk6qF_6s1saFqSO4Epzec",
  authDomain: "clon-2024.firebaseapp.com",
  projectId: "clon-2024",
  storageBucket: "clon-2024.firebasestorage.app",
  messagingSenderId: "642541825167",
  appId: "1:642541825167:web:5ec7a240de8b05c7fb54fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 