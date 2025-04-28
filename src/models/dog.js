const mongoose = require('mongoose');
const petSchema = require('./pet').schema;

const dogSchema = new mongoose.Schema({
    ...petSchema.obj,
});

const Dog = mongoose.model('dogs', dogSchema);

module.exports = Dog;