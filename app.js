const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
//collection in mongodb = model in node.js = schema in mongoose
const cors = require('cors');

//to use .env file
require('dotenv/config');

app.use(cors());
app.options('*', cors());

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Routers
const productsRouter = require('./routers/products')
const categoriesRouter = require('./routers/categories')
const usersRouter = require('./routers/users')
const ordersRouter = require('./routers/orders')

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);

// Database connection
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'tutorial-eshop'
})
    .then(()=>{
        console.log('Database connection is ready')
    }).catch((err)=>{
    console.log(err);
})

app.listen(3000, ()=>{
    console.log('server is running on localhost:3000');
})

