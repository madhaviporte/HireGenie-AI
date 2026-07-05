import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "hiregenie-ai.firebaseapp.com",
  projectId: "hiregenie-ai",
  storageBucket: "hiregenie-ai.firebasestorage.app",
  messagingSenderId: "90537722292",
  appId: "1:90537722292:web:c24528141aa6458717f2e1"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}