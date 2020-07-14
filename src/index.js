const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');

const { appConfig, stripeConfig } = require('./config');

//#region Inicializar
const app = express();
const db = require('./database/Conexion');
require('./controllers/local-auth.controller');
const stripe = require('stripe')(stripeConfig.sKey);
//#endregion

//#region Settings
app.set('port', appConfig.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));
//#endregion

//#region Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: appConfig.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.signInMessage = req.flash('signinMessage');
    app.locals.signUpMessage = req.flash('signupMessage');
    app.locals.successMessage = req.flash('successMessage');
    app.locals.user = req.user;
    //console.log(app.locals);
    next();
});
//#endregion

//#region Routes
app.use(require('./routes/entries.routes'));
//#endregion

//#region Error 404
app.use((req, res, next) => {
    res.status(404).render('404');
});
//#endregion

//#region Start server
app.listen(app.get('port'), () => {
    console.log('');
    console.log(`${appConfig.host}:${appConfig.port}`);
    console.log('');
});
//#endregion
