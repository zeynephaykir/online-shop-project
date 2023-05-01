const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//Important for front-end
app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;
const port = 3000;

//  Schema & Models
const Comment = require('./models/comments-ratings');
const Product = require('./models/products');

//

const commentsRouter = require('./routers/comments-ratings');
const productsRouter = require('./routers/products');

//

//---middleware---
app.use(bodyParser.json());
app.use(morgan('tiny'));

//---Routers---
app.use(`${api}/products`, productsRouter);
app.use(`${api}/comments-ratings`, commentsRouter);

//---Connects the mongoDB database---
mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('database is connected !');
    })
    .catch((err) => {
        console.log('error');
    });

//

app.listen(port, () => {
    console.log(`server is listening at 'http://localhost:${port}'`);
});
