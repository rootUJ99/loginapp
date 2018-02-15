const express = require('express');
const axios = require('axios');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//const popups=require('popups');
//const redis = require('redis');
//const redisStore = require('connect-redis')(session);
//const client =redis.createClient(); 
const con = require('../models/models').con;
const Users = require('../models/models').Users;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
const api = 'http://localhost:3000/api/usr/';
//const bodyParser = require('body-parser');
const router1 = express.Router();

//let sess;
//login page as 1st page
router1.get('/', (req, res) => {
    if (req.session.user) {
        res.render('dashboard');
    }
    else {  
        res.render('login');
    }
});
router1.post('/', (req, res) => {
    console.log(req.session);
    axios.get(api).then(response => {
        console.log(response.data);
        let userr = req.body.usr;
        let passwordd = req.body.pass;
        app.set('usr', userr);
        app.set('pass', passwordd);
        let usr = response.data.data[0].username;
        let pass = response.data.data[0].password;
        let status=undefined;
        function hasedPass(callback){
            bcrypt.compare(passwordd, pass, function (err, res) {
                status = res;
                callback()
            });
        }
        function getvalue(){
            if(!(req.body.usr === usr && status ==true)) {
                res.render('login',{msg:'wrong username or password'});
                //res.send(500, 'showAlert');
                //req.flash('err', 'Enter right username and password');
                console.log('enter right username and password');
            }
        else {
                req.session.authenticated=true;
                req.session.user = usr;
                res.render('dashboard');
            }
        }
        hasedPass(getvalue);
        
    }).catch(function (error) {
        console.log(error);
    });
});

//dashboard page after log in completed

router1.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        console.log(req.session.user);
        res.render('dashboard');
    }
    else {
        res.redirect('/');
    }
});
// const crypt=bcrypt.hash("bacon", null, null, function (err, hash) {
//     return hash;
// });
// console.log(crypt)
//register page for registration
router1.get('/register', (req, res) => {
    res.render('register');
});

router1.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        axios.post(api, {
            username: req.body.name,
            email: req.body.email,
            password: hash
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        app.set('con', true);
        res.redirect('/');
    });
});

router1.get('/logout', (req, res) => {
if (req.session.authenticated) {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        else{
            res.clearCookie('connect.sid', { path: '/' });
            console.log('session destroyed');
            return res.redirect('/');
        }
    });
}
});
////////////////////

//router 2
const router2 = express.Router();

//adding

//     });
// }).catch((err) => {
//     console.log(err);
// });
router2.post('/usr/all', (req, res) => {
    const { username, password, email } = req.body;
    // console.log(username);
    // console.log(password);
    con.sync().then(() => {
        Users.create({
            username: username,
            password: password,
            email: email
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
router2.get('/usr', (req, res) => {
    console.log(app.get('usr'));
    con.sync({
        logging: console.log
    }).then(() => {
        Users.findAll({ where: { username: app.settings.usr } }).then(users => {
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
router2.get('/usr/all', (req, res) => {
    console.log(app.get('usr'));
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

module.exports = {
    router1,
    router2
};