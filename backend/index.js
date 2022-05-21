const express = require('express');
var cors = require('cors');
const connection = require('./connection')
const userRoute = require('./routes/user')
const deadlineRoute = require('./routes/deadline')
const statusProductRoute = require('./routes/statusProduct')
const clientRoute = require('./routes/client')
const productRoute = require('./routes/product')
const app = express();

app.use(cors());
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use('/user', userRoute);
app.use('/deadline', deadlineRoute);
app.use('/client', clientRoute);
app.use('/product', productRoute);
app.use('/statusProduct', statusProductRoute);

module.exports = app;