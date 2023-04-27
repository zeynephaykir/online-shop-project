// const firebase = require('firebase');

// const firebaseConfig = {
//     apiKey: "AIzaSyADSrtgLp139Xg42PCzG0YoX5ZfAQloze8",
//     authDomain: "cs308-group20.firebaseapp.com",
//     projectId: "cs308-group20",
//     storageBucket: "cs308-group20.appspot.com",
//     messagingSenderId: "587594797393",
//     appId: "1:587594797393:web:769bb73e1d57652a480370",
//     measurementId: "G-QLGPBFHL11"
//   };

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

// const Customer = db.collection("customer");
// module.exports = Customer;


const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');

const api = process.env.API_URL;

app.get(`${api}/products`, (req, res) =>{
    const product = {
        id: 1,
        name: 'hair dresser',
        image: 'some_url'
    }
    res.send(product);
})

app.post('/create', async (req, res) =>{
    const data = req.body;
    console.log("data of customers ", data);
    //await Customer.add(data)
    res.send({msg : "User added"});
});

app.post(`${api}/products`, (req, res) =>{
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct);
})

app.listen(3000, ()=>{
    console.log('server is running on 3000');
    console.log(api);
})

//const Customer = require('./config');
