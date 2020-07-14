require('dotenv').config();

const config = {
    appConfig: {
        host: process.env.HOST,
        port: process.env.PORT,
        secret: process.env.SECRET,
    },
    dbConfig: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        name: process.env.DB_NAME,
    },
    stripeConfig: {
        pKey: process.env.STRIPE_PUBLISHABLE_KEY,
        sKey: process.env.STRIPE_PRIVATE_KEY,
        webhook: process.env.STRIPE_WEBHOOK_SECRET,
    },
    product: {
        sub: process.env.SUBSCRIPTION,
    }
};

module.exports = config;