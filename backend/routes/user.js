const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/signup', (req, res) => {
    let user = req.body;
    query = "select email,password,role,status from user where email=?"
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into user(name, contactNumber, email, password, status, role) values(?, ?, ?, ?, 'false', 'user')";
                connection.query(query, [user.name, user.contactNumber, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Registrato com sucesso" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Email Já Existe." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, res) => {
    const user = req.body;
    query = "select email,password,role,status from user where email=?"
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Nome de usuário ou senha incorreta" });
            }
            else if (results[0].status === 'false') {
                return res.status(401).json({ message: "Espere a aprovação do Admin" });
            }
            else if (results[0].password == user.password) {
                const response = { email: results[0].email, role: results[0].role }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                res.status(200).json({ token: accessToken });

            }
            else {
                return res.status(400).json({ message: "Algo deu errado. Tente novamente mais tarde" })
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

router.post('/forgotPassword', (req, res) => {
    const user = req.body;
    query = "select email,password from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(200).json;
            }
            else {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Solicitação de troca de senha',
                    html: '<p><b>Detalhes do seu login em XBAgenda</b><br><b>Email: </b>' + results[0].email + '<br><b>Para redefinir sua senha clique no link abaixo.</b>' + '<br><a href="http://localhost:4200/">Redefinir senha</a><br><b> Caso a solitação de troca de senha não tenha sido feita por você, entre em contato pelo número (51) 99154-6743.</b></p>'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                return res.status(200).json({ message: "Redefinição de senha enviada com sucesso para o seu email." });
            }
        }
        else {
            return res.status(500).json(err)
        }
    })
})

router.get('/get', (req, res) => {
    var query = "select id,name,email,contactNumber,status,role from user"
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', (req, res) => {
    let user = req.body
    var query = "update user set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.effectedRows == 0) {
                return res.status(404).json({ message: "Usuário não existe" });
            }
            return res.status(200).json({ message: "Usuário atualizado com sucesso" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/checkToken', (req, res) => {
    return res.status(200).json({ message: "true" });
})

router.post('/changePassword', (req, res) => {
    //const
})

module.exports = router;