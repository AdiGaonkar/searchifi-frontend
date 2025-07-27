// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6iLE23oinFfJsSMxLcHjPkz84Q98hVCo",
  authDomain: "searchifi-24.firebaseapp.com",
  projectId: "searchifi-24",
  storageBucket: "searchifi-24.firebasestorage.app",
  messagingSenderId: "1073716710351",
  appId: "1:1073716710351:web:4519b2950ef7818210e0ba",
  measurementId: "G-E1PT99VEKP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
