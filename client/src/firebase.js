// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3dd38.firebaseapp.com",
  projectId: "mern-blog-3dd38",
  storageBucket: "mern-blog-3dd38.appspot.com",
  messagingSenderId: "24100682051",
  appId: "1:24100682051:web:a7439ae190f112586917f6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
