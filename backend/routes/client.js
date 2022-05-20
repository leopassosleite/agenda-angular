const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let client = req.body;
    query = "insert into client (name,company,contactNumber,email,categoryId) values(?,?,?,?,?)";
    connection.query(query, [client.name, client.company, client.contactNumber, client.email, client.categoryId], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Cliente inserido com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select cl.id,cl.company,cl.contactNumber,cl.email,c.id as categoryId,c.name as categoryName from client as cl INNER JOIN category as c where cl.categoryId = c.id";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;