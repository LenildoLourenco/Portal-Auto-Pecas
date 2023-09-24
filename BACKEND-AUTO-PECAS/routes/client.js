const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let client = req.body;
    var query = "insert into client(name,email,address,cpf,contactNumber,status) values(?,?,?,?,?,'true')";
    connection.query(query, [client.name, client.email, client.address, client.cpf, client.contactNumber], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Cliente adicionado com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select *from client order by name";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getById/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select id,name,email,address,cpf,contactNumber from client where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let client = req.body;
    var query = "update client set name=?,email=?,address=?,cpf=?,contactNumber=? where id=?";
    connection.query(query, [client.name, client.email, client.address, client.cpf, client.contactNumber, client.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "O ID do cliente não foi encontrado" })
            }
            return res.status(200).json({ message: "Cliente atualizado com sucesso" })
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    const id = req.params.id;
    var query = "delete from client where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "O ID do cliente não foi encontrado" });
            }
            return res.status(200).json({ message: "Cliente excluído com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let user = req.body;
    var query = "update client set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "O ID do cliente não foi encontrado" });
            }
            return res.status(200).json({ message: "Status do cliente atualizado com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;