const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');

router.get('/details', auth.authenticateToken, (req, res, next) => {
    var supplierCount;
    var productCount;
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

    var query = "select count(id) as billCount from bill";
    connection.query(query, (err, results) => {
        if (!err) {
            billCount = results[0].billCount;
            var data = {
                supplier: supplierCount,
                product: productCount,
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