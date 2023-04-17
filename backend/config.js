const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyADSrtgLp139Xg42PCzG0YoX5ZfAQloze8",
    authDomain: "cs308-group20.firebaseapp.com",
    projectId: "cs308-group20",
    storageBucket: "cs308-group20.appspot.com",
    messagingSenderId: "587594797393",
    appId: "1:587594797393:web:769bb73e1d57652a480370",
    measurementId: "G-QLGPBFHL11"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const Customer = db.collection("customers");
//module.exports = Customer;

//https://www.youtube.com/watch?v=YPsftzOURLw&ab_channel=SyedZano 9. dakikadan devam