require('dotenv').config();

const config = {
    appConfig: {
        host: process.env.HOST,
        port: process.env.PORT,
        secret: process.env.SECRET
    },
    dbConfig: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS
    }
};

module.exports = config;