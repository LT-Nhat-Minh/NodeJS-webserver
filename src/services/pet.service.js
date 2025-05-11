const Pet = require('../models/pet');
const path = require('path');
const fs = require('fs');

const getAllPet = async (start, end) => {
    if(start && end) {
        try {
            console.log('Fetching all pets with pagination:', start, end);
            const result = await Pet.find({}).skip(start).limit(end-start);
            const length = await Pet.countDocuments({});
            return {
                data: result,
                total: length,
                start: start,
                end: end,
            };
        } catch (error) {
            console.error('Error fetching pets with pagination:', error);
            throw error;
        }
    }
    else {
        try {
            console.log('Fetching all pets without pagination');
            const result = await Pet.find({});
            return result;
        } catch (error) {
            console.error('Error fetching all pets:', error);
            throw error;
        }
    }
    // try {
    //     const result = await Pet.find({});
    //     return result;
    // }
    // catch (error) {
    //     console.error('Error fetching pets:', error);
    //     throw error;
    // }
}

const getPetById = async (id) => {
    try {
        console.log('Fetching pet with ID:', id);
        const result = await Pet.findOne({ _id: id });
        if (!result) {
            throw new Error('Pet not found');
        }
        return result;
    } catch (error) {
        console.error('Error fetching pet:', error);
        throw error;
    }
}

const createPet = async (data) => {
    if (Array.isArray(data)) {
        try {
            const result = await Pet.insertMany(data);
            return result;
        }
        catch (error) {
            console.error('Error creating pets:', error);
            throw error;
        }
    }
    else {
        try {
            const result = await Pet.create(data);
            return result;
        } catch (error) {
            console.error('Error creating pet:', error);
            throw error;
        }
    }
}

const updatePetByID = async (id, data) => {
    try {
        // Check if the pet exists
        const pet = await Pet.findById(id);
        if (!pet) {
            throw new Error('Pet not found');
        }

        //check if updating image file
        if(data.image){
            const pet = await getPetById(id)
            //check if image file exists
            if (pet.image) {
                const imagePath = path.join(__dirname, '../../public/images', pet.image);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image file:', err.message);
                    } else {
                        console.log('Image file deleted successfully:', imagePath);
                    }
                });
            }
        }

        console.log('Updating pet with ID:', id, 'and data:', data);
        const result = await Pet.updateOne({ _id: id }, data);
        return result;
    }
    catch (error) {
        console.error('Error updating pet:', error);
        throw error;
    }
}

const deletePetByID = async (id) => {
    try {
        const pet = await getPetById(id)

        // delete image file logic
        const imagePath = path.join(__dirname, '../../public/images', pet.image);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image file:', err.message);
            } else {
                console.log('Image file deleted successfully:', imagePath);
            }
        });

        const result = await Pet.deleteOne({ _id: id });
        return result;
    } catch (error) {
        console.error('Error deleting pet:', error);
        throw error;
    }
}

module.exports = {
    getAllPet, getPetById, createPet, updatePetByID, deletePetByID
}