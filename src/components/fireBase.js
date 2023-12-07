// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYOHe1AW0C1mpzv0Wpq7HMQJ5MEgvZmQ4",
  authDomain: "sarojmart-11ff4.firebaseapp.com",
  projectId: "sarojmart-11ff4",
  storageBucket: "sarojmart-11ff4.appspot.com",
  messagingSenderId: "11288944778",
  appId: "1:11288944778:web:0dcd820bf2813acf0b4d73",
  measurementId: "G-R8QFCC5T8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider();


export { auth, provider, githubProvider };