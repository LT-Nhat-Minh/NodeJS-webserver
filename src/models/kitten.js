const mongoose = require('mongoose');

//shape data
const kittySchema = new mongoose.Schema({
    name: String
});

// Create a model based on the schema
const Kitten = mongoose.model('Kitten', kittySchema);

module.exports = Kitten;