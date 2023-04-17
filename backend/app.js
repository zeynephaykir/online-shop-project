//const Customer = require('./config');
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

