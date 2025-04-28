const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: String,
    gender: String,
    breed: String,
    color: String,
    age: String,
    weight: Number,
    sterilized: Boolean,
    rabiesVaccinated: Boolean,
    vaccinated: Boolean,
    friendlyWithPeople: Boolean,
    friendlyWithDogs: Boolean,
    friendlyWithCats: Boolean,
    specialDiet: Boolean,
    housebroken: Boolean,
    images: [String],
    description: String,
},
    {
        timestamps: true,
    }
);

const Pet = mongoose.model('pets', petSchema);

module.exports = Pet;