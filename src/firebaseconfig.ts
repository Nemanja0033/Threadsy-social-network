// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7Ivok-ODBa2P_ZG-7Q82ZqbdpM_eT49w",
  authDomain: "dev-talks-7a603.firebaseapp.com",
  projectId: "dev-talks-7a603",
  storageBucket: "dev-talks-7a603.firebasestorage.app",
  messagingSenderId: "1096719980531",
  appId: "1:1096719980531:web:c00c4b12608d5221aba486"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();