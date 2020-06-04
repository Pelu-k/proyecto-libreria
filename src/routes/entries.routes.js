const { Router } = require('express');
const passport = require('passport');
const entries = require('../controllers/entries.controller');

const router = new Router();

router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/home');
    } else {
        res.redirect('/signin');
    }
});

// Rutas sin protección por autenticación

router.get('/signup', isNotAuthenticated, entries.renderSignup);
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotAuthenticated, entries.renderSignin);
router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/home',
    failureRedirect: '/signin',
    failureFlash: true
}));

// Rutas con protección por autenticación

router.get('/logout', isAuthenticated, (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.get('/home', isAuthenticated, entries.renderHome);
router.get('/profile', isAuthenticated, entries.renderProfile);

// Extra

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

module.exports = router;