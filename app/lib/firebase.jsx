// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "wseifronteendapp.firebaseapp.com",
  projectId: "wseifronteendapp",
  storageBucket: "wseifronteendapp.firebasestorage.app",
  messagingSenderId: "303196241934",
  appId: "1:303196241934:web:4242aaa4896aea3b1efc5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);