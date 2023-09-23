const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const supplierRoute = require('./routes/supplier');
const productRoute = require('./routes/product');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', userRoute);
app.use('/supplier', supplierRoute);
app.use('/product', productRoute);

module.exports = app;