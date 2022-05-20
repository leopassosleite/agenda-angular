const express = require('express');
const req = require('express/lib/request');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let category = req.body;
    query = "insert into category (name) values(?)";
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Prazo inserido com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select *from category order by name";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let client = req.body;
    var query = "update category set name=? where id=?";
    connection.query(query, [client.name, client.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Categoria não existe" });
            }
            return res.status(200).json({ message: "Prazo atualizado com sucesso" })
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;