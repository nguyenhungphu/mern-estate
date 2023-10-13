// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5fbd2.firebaseapp.com",
  projectId: "mern-estate-5fbd2",
  storageBucket: "mern-estate-5fbd2.appspot.com",
  messagingSenderId: "401582335785",
  appId: "1:401582335785:web:8ca04a284933e091933938"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);