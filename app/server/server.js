const express = require('express');
const cors = require('cors');
const passport = require('passport')
const session = require("express-session");
const { check } = require('express-validator');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');

const routes = require('./routes')
const config = require('./config.json')
const { inputValidatedAndSanitized, checkAuthentication } = require('./utils')
require('./appPassport')(passport);

const app = express();

const options = {
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
}
app.use(session({
    secret: config.sesssion_secret,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(options),
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: true}));
app.use(passport.initialize())
app.use(passport.session())

app.use((_req, res, next) => {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', 'true');
    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
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
// Route 3 - login with social media coount as POST
app.post('/loginWithAccount', routes.login2)
// Route 4 - state information as GET
app.get('/stateinfo',routes.stateinfo)
// Route 5 - restaurant location as GET
app.get('/restlocation',routes.restlocation)
// Route 6- today's recommendation information as GET
app.get('/todayrecommendation',routes.todayrecommendation)
// Route 7 - covid statistics by state as GET
app.get('/covid',routes.covid)
// /Route 8 - explore businesses rather than restaurants as GET
app.get('/explore',routes.explore)
// Route 9 - search restaurants by city as GET
app.get('/search', routes.search)
// Route 10 - add like as POST
app.post('/like', routes.addLike)
// Route 11 - demove like as DELETE
app.delete('/like', routes.removeLike)
// Route 12 - get a list of liked restaurants as GET
app.get('/likes', routes.getLikedRest)
// Route 13 - get a restaurant information as GET
app.get('/restaurant',routes.getRestInfo)
// Route 14 - get whether a restaurant is liked by the user as GET
app.get('/like',routes.isLike)
// Route 16 - get COVID statistics by restaurant as GET
app.get('/countyhealth',routes.countyHealth)
// Route 17 - log out as POST
app.post('/logout', routes.logout)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;