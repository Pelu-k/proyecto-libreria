const { product, stripeConfig } = require('../config');
const stripe = require('stripe')(stripeConfig.sKey);
const User = require('../models/User');
const { response } = require('express');


// GET
//#region RENDER de paginas
const renderSignup = (req, res, next) => {
    res.render('signup');
};

const renderSignin = (req, res, next) => {
    res.render('signin')
};

const renderHome = (req, res, next) => {
    res.render('index')
};

const renderProfile = (req, res, next) => {
    res.render('profile');
};

const renderAddBook = (req, res, next) => {
    res.render('add-book');
};
//#endregion

module.exports = {
    renderSignup,
    renderSignin,
    renderHome,
    renderProfile,
    renderAddBook,
}