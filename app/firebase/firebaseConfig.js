// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvqhl5_0Tf9uJKScbR8YJLP8JeN7B2UQI",
  authDomain: "ai-flashcards-3cc8e.firebaseapp.com",
  projectId: "ai-flashcards-3cc8e",
  storageBucket: "ai-flashcards-3cc8e.appspot.com",
  messagingSenderId: "435350297634",
  appId: "1:435350297634:web:e94887e51b526dd7c13e7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}