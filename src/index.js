const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash');
const passport = require('passport');

const { appConfig } = require('./config');

// Inicializar
const app = express();
const db = require('./database/Conexion');
require('./controllers/local-auth.controller');

//Settings
app.set('port', appConfig.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));

//Middlewares
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
    app.locals.user = req.user;
    //console.log(app.locals);
    next();
});

//Routes
app.use(require('./routes/entries.routes'));

// Error 404
app.use((req, res, next) => {
    res.status(404).render('404');
});

//Start server
app.listen(app.get('port'), () => {
    console.log('');
    console.log(`${appConfig.host}:${appConfig.port}`);
    console.log('');
});
