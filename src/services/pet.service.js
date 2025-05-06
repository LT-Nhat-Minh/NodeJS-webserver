const Pet = require('../models/pet');

const getAllPet = async () => {
    try {
        const result = await Pet.find({});
        return result;
    }
    catch (error) {
        console.error('Error fetching pets:', error);
        throw error; 
    }
}

const getPetById = async (id) => {
    try {
        const result = await Pet.findById({id});
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
    try {
        const result = await Pet.create(data);
        return result;
    } catch (error) {
        console.error('Error creating pet:', error);
        throw error;
    }
}

const updatePetByID = async (id, data) => {
    try {
        console.log('Updating pet with ID:', id, 'and data:', data);
        const result = await Pet.updateOne({_id: id}, data);
        if (!result) {
            throw new Error('Pet not found');
        }
        return result;
    }
    catch (error) {
        console.error('Error updating pet:', error);
        throw error;
    }
}

const deletePetByID = async (id) => {
    try {
        const result = await Pet.deleteOne({_id: id});
        if (!result) {
            throw new Error('Pet not found');
        }
        return result;
    } catch (error) {
        console.error('Error deleting pet:', error);
        throw error;
    }  
}


module.exports = {
    getAllPet, getPetById, createPet, updatePetByID, deletePetByID
}