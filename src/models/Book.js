const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    title: String,
    description: String,
    urlPdf: String,
    urlCover: String
});

module.exports = model('Book', BookSchema);