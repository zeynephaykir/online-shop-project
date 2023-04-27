// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADSrtgLp139Xg42PCzG0YoX5ZfAQloze8",
  authDomain: "cs308-group20.firebaseapp.com",
  projectId: "cs308-group20",
  storageBucket: "cs308-group20.appspot.com",
  messagingSenderId: "587594797393",
  appId: "1:587594797393:web:769bb73e1d57652a480370",
  measurementId: "G-QLGPBFHL11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//https://www.youtube.com/watch?v=YPsftzOURLw&ab_channel=SyedZano 9. dakikadan devam

const firestore = getFirestore();

console.log('Hello firestore');