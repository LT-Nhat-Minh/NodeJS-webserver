const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: String,
    breed: String,
    color: String,
    age: String,
    weight: Number,
    gender: String,
    neutered: Boolean,
    rabies_vaccine: Boolean,
    vaccinated: Boolean,
    friendly_with_human: Boolean,
    friendly_with_dog: Boolean,
    friendly_with_cat: Boolean,
    special_diet: Boolean,
    toilet_trained: Boolean,
    des: String,
    image: String,
    petType: {
        type: String,
        enum: ['dog', 'cat', 'other'],
        required: true,
    },
},
    {
        timestamps: true,
    }
);

const Pet = mongoose.model('pets', petSchema);

module.exports = Pet;