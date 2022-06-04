const express = require('express');
const req = require('express/lib/request');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let product = req.body;
    query = "insert into product (name) values('contatado')";
    connection.query(query, [product.name, product.model, product.year, product.brand, product.description, product.price, product.statusProductId, product.categoryId], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "produto inserido com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select *from status order by name";
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