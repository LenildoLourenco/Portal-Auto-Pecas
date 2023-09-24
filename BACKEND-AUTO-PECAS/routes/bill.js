const express = require('express');
const connection = require('../connection');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');
var auth = require('../services/authentication');

router.post('/generateReport', auth.authenticateToken, (req, res) => {
    const generatedUuid = uuid.v1();
    const orderDetails = req.body;
    var productDetailsReport = JSON.parse(orderDetails.productDetails);

    query = "insert into bill (name,uuid,email,address,cpf,mechanic,observation,contactNumber,paymentMethod,total,productDetails,createdBy) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    connection.query(query, [orderDetails.name, generatedUuid, orderDetails.email, orderDetails.address, orderDetails.cpf, orderDetails.mechanic, orderDetails.observation, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.productDetails, res.locals.email], (err, results) => {
        if (!err) {
            let id = results.insertId;

            ejs.renderFile(path.join(__dirname, '', "report.ejs"), { productDetails: productDetailsReport, name: orderDetails.name, email: orderDetails.email, address: orderDetails.address, cpf: orderDetails.cpf, mechanic: orderDetails.mechanic, observation: orderDetails.observation, contactNumber: orderDetails.contactNumber, paymentMethod: orderDetails.paymentMethod, totalAmount: orderDetails.totalAmount, id: id }, (err, results) => {
                if (err) {
                    return res.status(500).json(err);
                }
                else {
                    pdf.create(results).toFile('./generated_pdf/' + generatedUuid + ".pdf", function (err, data) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        }
                        else {
                            return res.status(200).json({ uuid: generatedUuid });
                        }
                    })
                }
            })
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;