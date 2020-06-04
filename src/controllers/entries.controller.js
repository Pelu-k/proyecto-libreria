
const renderSignup = (req, res, next) => {
    res.render('signup');
};

const renderSignin = (req, res, next) => {
    res.render('signin')
};

const renderHome = (req, res, next) => {
    res.render('index')
};



module.exports = {
    renderSignup,
    renderSignin,
    renderHome,
}