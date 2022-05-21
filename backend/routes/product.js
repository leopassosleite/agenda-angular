const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let product = req.body;
    query = "insert into product (name,model,year,brand,description,price,statusProductId) values(?,?,?,?,?,?,?)";
    connection.query(query, [product.name, product.model, product.year, product.brand, product.description, product.price, product.statusProductId], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "produto inserido com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

//p = product, sp = statusProduct
router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select p.id,p.name,p.model,p.year,p.brand,p.description,p.price,sp.id as statusProductId,sp.name as statusProductName from product as p INNER JOIN statusProduct as sp where p.statusProductId = sp.id";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getBystatusProduct/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select id,name from product where statusProductId=? ";
    connection.query(query, [id], (err, results) => {
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
    var query = "select p.id,p.name,p.model,p.year,p.brand,p.description,p.price,sp.id as statusProductId,sp.name as statusProductName from product as p INNER JOIN statusProduct as sp where p.statusProductId = sp.id";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        }
        else {
            return res.status(500).json(err);
        }
    })
})


module.exports = router;