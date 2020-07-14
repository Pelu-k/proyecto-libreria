const { Router } = require('express');
const passport = require('passport');
const entries = require('../controllers/entries.controller');
const bodyParser = require('body-parser')

const router = new Router();

//#region Comportamiento de la ruta raiz (/)

router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/home');
    } else {
        res.redirect('/signin');
    }
});

//#endregion

//#region Rutas sin protección por autenticación

//#region registrar usuario
router.get('/signup', isNotAuthenticated, entries.renderSignup);
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
}));
//#endregion

//#region autenticar usuario
router.get('/signin', isNotAuthenticated, entries.renderSignin);
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/home',
    failureRedirect: '/signin',
    failureFlash: true
}));
//#endregion

//#region Rutas con protección por autenticación

router.get('/logout', isAuthenticated, (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.get('/home', isAuthenticated, entries.renderHome);
router.get('/profile', isAuthenticated, entries.renderProfile);
router.get('/add-book', isAuthenticated, entries.renderAddBook);

//#endregion

//#region Extra

function isAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function isNotAuthenticated(req, res, next){
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

//#endregion

module.exports = router;