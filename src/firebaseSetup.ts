import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCij0eIhqE5qlvlklFFwEWtZN83t7mHN9s",
  authDomain: "report-management-system-c9df9.firebaseapp.com",
  projectId: "report-management-system-c9df9",
  storageBucket: "report-management-system-c9df9.appspot.com",
  messagingSenderId: "279636190755",
  appId: "1:279636190755:web:0eeae26f69e18156b8b396"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);