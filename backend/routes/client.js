const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let client = req.body;
    query = "insert into client (name,company,contactNumber,email,city,description,deadlineId,productId,moment,status) values(?,?,?,?,?,?,?,?,?,'false')";
    connection.query(query, [client.name, client.company, client.contactNumber, client.email, client.city, client.description, client.deadlineId, client.productId, client.moment, client.status], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Cliente inserido com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

//cl = client, d = deadline, p = product
router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select cl.id,cl.name,cl.company,cl.contactNumber,cl.email,cl.city,cl.description,cl.moment,cl.status,d.id as deadlineId,d.name as deadlineName,p.id as productId,p.name as productName from client as cl INNER JOIN deadline as d, product as p where cl.deadlineId = d.id and cl.productId = p.id";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getBydeadline/:id', auth.authenticateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "select id,name from client where deadlineId= ? ";
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
    var query = "select cl.id,cl.name,cl.company,cl.contactNumber,cl.email,cl.city,cl.description,cl.moment,cl.status,d.id as deadlineId,d.name as deadlineName,p.id as productId,p.name as productName from client as cl INNER JOIN deadline as d, product as p where cl.deadlineId = d.id and cl.productId = p.id";
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
    var query = "update client set name=?,company=?,contactNumber=?,email=?,city=?,description=?,moment=?,status=?,deadlineId=?,productId=? where id=?";
    connection.query(query, [client.name, client.company, client.contactNumber, client.email, client.city, client.description, client.moment, client.status, client.deadlineId, client.productId, client.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Cliente não existe" });
            }
            return res.status(200).json({ message: "Dados do cliente atualizado com sucesso" });
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
                return res.status(404).json({ message: "Cliente não existe" });
            }
            return res.status(200).json({ message: "Status do cliente atualizado com sucesso" });
        }

        else {
            return res.status(500).json(err);
        }
    })
})


router.delete('/delete/:id', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    const id = req.params.id;
    var query = "delete from client where id=?"
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Cliente não existe" });
            }
            return res.status(200).json({ message: "Cliente deletado com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;