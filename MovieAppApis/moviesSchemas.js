const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    director: String,
    releaseDate: String,
    genre: String,
    country: String,
    description: String,
    cast:[String],
    posterUrl:String

});

module.exports = mongoose.model("movieColls", MovieSchema);
