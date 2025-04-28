const mongoose = require('mongoose');
const petSchema = require('./pet').schema;

const catSchema = new mongoose.Schema({
    ...petSchema.obj,
});

const Cat = mongoose.model('cats', catSchema);

module.exports = Cat;