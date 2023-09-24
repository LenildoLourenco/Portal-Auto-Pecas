const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let mechanic = req.body;
    var query = "insert into mechanic(name,specialty,status) values(?,?,'true')";
    connection.query(query, [mechanic.name, mechanic.specialty], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Mecânico adicionado com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select *from mechanic order by name";
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
    var query = "select id,name,specialty from mechanic where id=?";
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
    let mechanic = req.body;
    var query = "update mechanic set name=?,specialty=? where id=?";
    connection.query(query, [mechanic.name, mechanic.specialty, mechanic.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "O ID do mecânico não foi encontrado" })
            }
            return res.status(200).json({ message: "Mecânico atualizado com sucesso" })
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    const id = req.params.id;
    var query = "delete from mechanic where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "O ID do Mecânico não foi encontrado" });
            }
            return res.status(200).json({ message: "Mecânico excluído com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let user = req.body;
    var query = "update mechanic set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "O ID do mecânico não foi encontrado" });
            }
            return res.status(200).json({ message: "Status do mecânico atualizado com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;