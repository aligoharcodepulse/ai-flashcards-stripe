// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBxJDTePwX98QQJcn-_abO4EGEa6D-mJE",
  authDomain: "flashcard-463d7.firebaseapp.com",
  projectId: "flashcard-463d7",
  storageBucket: "flashcard-463d7.appspot.com",
  messagingSenderId: "706505969441",
  appId: "1:706505969441:web:a1d462804b2ce879dff860",
  measurementId: "G-KB9VDDWJBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}