const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');
const cookieParser=require('cookie-parser');
const Sequelize = require('sequelize');
const hbs = require('hbs');
const flash= require('connect-flash');
const session =require('express-session');
//const SequelStore = require('sequelstore-connect')(session);
//init Express
const app = express();
const router = express.Router();
//app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true }
}))
app.use(flash());
//global variables
// app.use((req,res,next)=>{
//     res.locals.err=req.flash('msg');
//     next();
// });
//const users = require('./routes/users');
const route=require('./routes/router').router1;
const users = require('./routes/router').router2;
const con=require('./routes/users');
//setting view engine
app.set('view engine','hbs');
//BodyParser And Cookie Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Static folder
app.use(express.static(path.join(__dirname , 'public')));
app.use('/',route);
app.use('/api', users);
app.listen(3000, () => {
    console.log('check on 3000');
});