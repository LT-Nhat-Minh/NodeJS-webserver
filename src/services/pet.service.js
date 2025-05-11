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
            throw {
                EC: 1,
                data: null,
                message: 'Error fetching pets with pagination',
                statusCode: 500,
            };
        }
    }
    else {
        try {
            const result = await Pet.find({});
            return {
                EC: 0,
                data: result,
                message: 'Get all pets successfully',
                statusCode: 200,
            };
        } catch (error) {
            console.error('Error fetching all pets:', error);
            throw error;
        }
    }
}

const getPetById = async (id) => {
        console.log('Fetching pet with ID:', id);
        const result = await Pet.findOne({ _id: id });
        if (!result) {
            throw {
                EC: 1,
                data: null,
                message: 'Pet not found',
                statusCode: 404,
            };
        }
        return {
            EC: 0,
            data: result,
            message: 'Get pet successfully',
            statusCode: 200,
        };
}

const createPet = async (data) => {
    if (Array.isArray(data)) {
        try {
            const result = await Pet.insertMany(data);
            return {
                EC: 0,
                data: result,
                message: 'Create pets successfully',
                statusCode: 200,
            };
        }
        catch (error) {
            throw {
                EC: 1,
                data: null,
                message: 'Error creating pets',
                statusCode: 500,
            };
        }
    }
    else {
        try {
            const result = await Pet.create(data);
            return {
                EC: 0,
                data: result,
                message: 'Create pet successfully',
                statusCode: 200,
            };
        } catch (error) {
            throw {
                EC: 1,
                data: null,
                message: 'Error creating pet',
                statusCode: 500,
            };
        }
    }
}

const updatePetByID = async (id, data) => {
    // Check if the pet exists
    const pet = await Pet.findById(id);
    if (!pet) {
        throw {
            EC: 1,
            data: null,
            message: 'Pet not found',
            statusCode: 404,
        };
    }

    // Check if updating image file
    if (data.image) {
        if (pet.image) {
            const imagePath = path.join(__dirname, '../../public/images', pet.image);
            await fs.promises.unlink(imagePath).catch((err) => {
                console.error('Error deleting image file:', err.message);
            });
        }
    }

    console.log('Updating pet with ID:', id, 'and data:', data);
    const result = await Pet.updateOne({ _id: id }, data);
    return {
        EC: 0,
        data: result,
        message: 'Update pet successfully',
        statusCode: 200,
    };
};

const deletePetByID = async (id) => {
    const pet = await getPetById(id);

    if (!pet) {
        throw {
            EC: 1,
            data: null,
            message: 'Pet not found',
            statusCode: 404,
        };
    }

    // Check if the pet has an image and delete it
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

    const result = await Pet.deleteOne({ _id: id });
    return {
        EC: 0,
        data: result,
        message: 'Delete pet successfully',
        statusCode: 200,
    };
};

module.exports = {
    getAllPet, getPetById, createPet, updatePetByID, deletePetByID
}