const express = require('express');
const cors = require('cors');
const passport = require('passport')
const session = require("express-session");
const { check } = require('express-validator');

const routes = require('./routes')
const config = require('./config.json')
const { inputValidatedAndSanitized } = require('./utils')
require('./appPassport')(passport);

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: config.sesssion_secret,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())


// Route 1 - register as POST
app.post('/signup', [
    check('username').trim().isLength({ min: 1 }).escape(),
    check('password').trim().isLength({ min: 6, max: 18 }).escape(),
    check('prefer_health').trim().isBoolean().escape()
], inputValidatedAndSanitized, routes.signup)
// Route 2 - login as POST
app.post('/login', [
    check('username').trim().isLength({ min: 1 }).escape(),
    check('password').trim().isLength({ min: 6, max: 18 }).escape(),
], inputValidatedAndSanitized, routes.login)




app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;