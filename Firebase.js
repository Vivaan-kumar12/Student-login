// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDC0bSVvhqkRPZ8ivBBvGgkPYv7JBoazJk",
  authDomain: "student-result-portal-d231f.firebaseapp.com",
  projectId: "student-result-portal-d231f",
  storageBucket: "student-result-portal-d231f.firebasestorage.app",
  messagingSenderId: "321281975258",
  appId: "1:321281975258:web:b4daaebec7af05435d96e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db };
