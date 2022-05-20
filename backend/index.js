const express = require('express');
var cors = require('cors');
const connection = require('./connection')
const userRoute = require('./routes/user')
const categoryRoute = require('./routes/category')
const clientRoute = require('./routes/client')
const app = express();

app.use(cors());
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/client', clientRoute);

module.exports = app;