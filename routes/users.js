const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
//init Express
const app = express();
const router = express.Router();

    //adding
const con=require('../models/models').con;
const Users=require('../models/models').Users;
//     });
// }).catch((err) => {
//     console.log(err);
// });
router.post('/usr', (req, res) => {
    const { username, password, email } = req.body;
    // console.log(username);
    // console.log(password);
    con.sync().then(() => {
        Users.create({
            username: username,
            password: password,
            email:email
        }).then(users => {
            res.status(201).json({
                error: false,
                data: users,
                message: 'user has been created'
            });
        })
    }).catch((err) => {
        res.json({
            error: true,
            data: [],
            error: error
        })
    });
});

//get 
router.get('/usr', (req, res) => {
    console.log(app.get('usr'));
    con.sync({
        logging: console.log
    }).then(() => {
        Users.findAll({ where: { username: userr,password:passwordd}}).then(users => {
            res.json({
                error: false,
                data: users
            });
        });
    }).catch((err) => res.json({
        error: true,
        data: [],
        error: error
    }));
});
//get all
router.get('/usr/all', (req, res) => {
    con.sync({
        logging: console.log
    }).then(() => {
        Users.findAll({}).then(users => {
            res.json({
                error: false,
                data: users
            });
        });
    }).catch((err) => res.json({
        error: true,
        data: [],
        error: error
    }));
});

module.exports=router;