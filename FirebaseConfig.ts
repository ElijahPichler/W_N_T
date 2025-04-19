// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3R56BEmnaBU5u2wo4qAgtcJmNrrJ0Q8A",
  authDomain: "therapii.firebaseapp.com",
  projectId: "therapii",
  storageBucket: "therapii.firebasestorage.app",
  messagingSenderId: "1074150388117",
  appId: "1:1074150388117:web:1a902cee9eaf26fa0ac69c",
  measurementId: "G-EFTE785W9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const analytics = getAnalytics(app)



export { auth }