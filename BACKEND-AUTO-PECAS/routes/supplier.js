const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let supplier = req.body;
    query = "insert into supplier (name,address,phone,email) values(?,?,?,?)";
    connection.query(query, [supplier.name, supplier.address, supplier.phone, supplier.email], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Fornecedor adicionado com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select *from supplier order by name";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let supplier = req.body;
    var query = "update supplier set name=?,address=?,phone=?,email=? where id=?";
    connection.query(query, [supplier.name, supplier.address, supplier.phone, supplier.email, supplier.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "O ID do fornecedor não foi encontrado" });
            }
            return res.status(200).json({ message: "Fornecedor atualizado com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;