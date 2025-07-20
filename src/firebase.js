// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_21RKeEfsNp6PK3zdrQQK-O6YlNPW8gA",
  authDomain: "gdg-connect-1f584.firebaseapp.com",
  projectId: "gdg-connect-1f584",
  storageBucket: "gdg-connect-1f584.firebasestorage.app",
  messagingSenderId: "834762931358",
  appId: "1:834762931358:web:95580f71991e33f1688f8f",
  measurementId: "G-Q8E18GCGV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);