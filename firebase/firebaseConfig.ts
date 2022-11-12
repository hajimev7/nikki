// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC16WfeCy0PXQQv6WpZyF7sGZz_d4OIRxU",
  authDomain: "nikkilist-c4a6b.firebaseapp.com",
  projectId: "nikkilist-c4a6b",
  storageBucket: "nikkilist-c4a6b.appspot.com",
  messagingSenderId: "497394663674",
  appId: "1:497394663674:web:f935d311e01d80a6bd4943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();