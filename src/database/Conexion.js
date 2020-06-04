const mongoose = require('mongoose');
const { dbConfig } = require('../config');

const uri = `mongodb+srv://${dbConfig.user}:${dbConfig.pass}@libreriaonlinedb-v5odo.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(_ => console.log('Conectado'))
    .catch(err => console.log(err));