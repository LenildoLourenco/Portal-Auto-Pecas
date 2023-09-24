const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/user');
const supplierRoute = require('./routes/supplier');
const productRoute = require('./routes/product');
const clientRoute = require('./routes/client');
const mechanicRoute = require('./routes/mechanic');
const billRoute = require('./routes/bill');
const dashboard = require('./routes/dashboard');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/user', userRoute);
app.use('/supplier', supplierRoute);
app.use('/product', productRoute);
app.use('/client',clientRoute);
app.use('/mechanic',mechanicRoute);
app.use('/bill',billRoute);
app.use('/dashboard',dashboard);

module.exports = app;