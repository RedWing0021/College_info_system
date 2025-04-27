// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // For image uploads
import { getFirestore } from "firebase/firestore"; // Optional, if you're using Firestore
import { getAuth } from "firebase/auth"; // Optional, if you're using Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJETG28AB_oyv7cCfg3I8Ebu6Ygs9ieks",
  authDomain: "college-directory-8c465.firebaseapp.com",
  projectId: "college-directory-8c465",
  storageBucket: "college-directory-8c465.appspot.com", // NOTE: fixed the incorrect URL
  messagingSenderId: "455395881276",
  appId: "1:455395881276:web:168aead84e08ecd87b2e39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const storage = getStorage(app);
export const db = getFirestore(app);      // Optional
export const auth = getAuth(app);         // Optional
