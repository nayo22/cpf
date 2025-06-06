// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPzx2lfCE55U4nBz_L5EJwzmf2lpOnAlA",
  authDomain: "parcial3-5a13c.firebaseapp.com",
  projectId: "parcial3-5a13c",
  storageBucket: "parcial3-5a13c.firebasestorage.app",
  messagingSenderId: "622306714787",
  appId: "1:622306714787:web:935d13040ced8cb35fcb16",
  measurementId: "G-S2H6FHECN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);