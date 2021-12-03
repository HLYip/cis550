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

// Route state information 
app.get('/stateinfo',routes.stateinfo)

app.get('/restlocation',routes.restlocation)

// Route today's recommendation information 
app.get('/todayrecommendation',routes.todayrecommendation)

app.get('/covid',routes.covid)

app.get('/explore',routes.explore)

app.get('/search', routes.search)

app.post('/like', routes.addLike)

app.delete('/like', routes.removeLike)

app.get('/likes/:username', routes.getLikedRest)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;