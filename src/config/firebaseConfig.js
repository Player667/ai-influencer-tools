// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8wN57Ozu7jwa384NtT18uAuNI55kes8Q",
    authDomain: "ai-influencer-tools.firebaseapp.com",
    projectId: "ai-influencer-tools",
    storageBucket: "ai-influencer-tools.firebasestorage.app",
    messagingSenderId: "791893165284",
    appId: "1:791893165284:web:2eaea34ea3f435424ed8f1",
    measurementId: "G-5JCQ7MGLJ2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
