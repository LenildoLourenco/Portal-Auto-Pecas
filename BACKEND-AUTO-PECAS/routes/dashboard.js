const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

router.get('/details', auth.authenticateToken, (req, res, next) => {
    var supplierCount;
    var productCount;
    var userCount;
    var mechanicCount;
    var clientCount;
    var billCount;
    var query = "select count(id) as supplierCount from supplier";
    connection.query(query, (err, results) => {
        if (!err) {
            supplierCount = results[0].supplierCount;
        }
        else {
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as productCount from product";
    connection.query(query, (err, results) => {
        if (!err) {
            productCount = results[0].productCount;
        }
        else {
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as userCount from user";
    connection.query(query, (err, results) => {
        if (!err) {
            userCount = results[0].userCount;
        }
        else {
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as mechanicCount from mechanic";
    connection.query(query, (err, results) => {
        if (!err) {
            mechanicCount = results[0].mechanicCount;
        }
        else {
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as clientCount from client";
    connection.query(query, (err, results) => {
        if (!err) {
            clientCount = results[0].clientCount;
        }
        else {
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as billCount from bill";
    connection.query(query, (err, results) => {
        if (!err) {
            billCount = results[0].billCount;
            var data = {
                supplier: supplierCount,
                product: productCount,
                user: userCount,
                mechanic: mechanicCount,
                client: clientCount,
                bill: billCount
            };
            return res.status(200).json(data);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;