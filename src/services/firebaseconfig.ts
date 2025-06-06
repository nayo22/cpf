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
const db = getFirestore(app);
const auth = getAuth(app);

const registerUser = async (email: string, password: string) => {
  try {
    console.log("Registering user with email:", email);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user);
    return { isRegistered: true, user: userCredential };
  } catch (error) {
    console.error(error);
    return { isRegistered: false, error: error };
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    console.log("Logging in user with email:", email);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user);
    return { isLoggedIn: true, user: userCredential };
  } catch (error) {
    console.error(error);
    return { isLoggedIn: false, error: error };
  }
};

export { db, auth, registerUser, loginUser };