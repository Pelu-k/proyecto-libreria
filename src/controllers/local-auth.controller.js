const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const { stripeConfig } = require('../config');
const stripe = require('stripe')(stripeConfig.sKey);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if (user) {
        return done(null, false, req.flash('signupMessage', 'El email ya esta en uso'));
    } else {
        const customer = await stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken,
        });
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            customer: customer.id,
            description: 'Suscripción a Libreria Online',
        });
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.direction = req.body.direction;
        newUser.registrationDate = Date.now();
        newUser.stripeCustomerId = customer.id;
        await newUser.save();
        done(null, newUser, req.flash('successMessage', 'Bienvenido a nuestra Libreria Online'));
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({email: email});
    if (!user) {
        return done(null, false, req.flash('signinMessage', 'El correo no existe'));
    }
    if (!user.comparePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    return done(null, user);
}))