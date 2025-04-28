const mongoose = require('mongoose');

//shape data
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
});

// Create a model based on the schema
const User = mongoose.model('users', userSchema);

module.exports = User;