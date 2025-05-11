const Pet = require("../models/pet");
const { getAllPet, getPetById, createPet, updatePetByID, deletePetByID } = require("../services/pet.service");

const getPetAPI = async (req, res) => {
    const { id, start, limit } = req.query;
    if (id) {
        try {
            const results = await getPetById(id);
            if (!results) {
                return res.status(404).json({ message: "Pet not found" });
            }
            return res.status(200).json({
                EC: 0,
                data: results,
                message: "Get pet successfully",
            });
        }
        catch (err) {
            return res.status(500).json({
                EC: 1,
                error: err.message,
                message: "Get pet failed",
            });
        }
    }
    else {
        try {
            const results = await getAllPet(start, limit);
            return res.status(200).json({
                EC: 0,
                data: results,
                message: "Get all pets successfully",
            });
        } catch (err) {
            return res.status(500).json({
                EC: 1,
                error: err.message,
                message: "Get all pets failed",
            });
        }
    }
};

const postPetAPI = async (req, res) => {
    if (Array.isArray(req.body)) {
        const results = [];
        const errors = [];

        for (const pet of req.body) {
            try {
                const result = await createPet(pet);
                results.push(result);
            } catch (err) {
                errors.push(err.message);
            }
        }

        return res.status(200).json({
            EC: errors.length === 0 ? 0 : 1,
            data: results,
            errors: errors,
            message: errors.length === 0
                ? "All pets created successfully"
                : "Some pets failed to be created",
        });
    } else {
        try {
            const { id, name, breed, color, age, weight, gender,
                neutered,
                rabies_vaccine,
                vaccinated,
                friendly_with_human,
                friendly_with_dog,
                friendly_with_cat,
                special_diet,
                toilet_trained,
                des,
                petType } = req.body;
            const image = req.file ? req.file.filename : null;
            const result = await createPet({
                id, name, breed, color, age, weight, gender,
                neutered,
                rabies_vaccine,
                vaccinated,
                friendly_with_human,
                friendly_with_dog,
                friendly_with_cat,
                special_diet,
                toilet_trained,
                des,
                petType,
                image
            });
            return res.status(200).json({
                EC: 0,
                data: result,
                message: "Create pet successfully",
            });
        } catch (err) {
            return res.status(500).json({
                EC: 1,
                error: err.message,
                message: "Create pet failed",
            });
        }
    }
};

const putPetAPI = async (req, res) => {
    const { id, name, breed, color, age, weight, gender,
        neutered,
        rabies_vaccine,
        vaccinated,
        friendly_with_human,
        friendly_with_dog,
        friendly_with_cat,
        special_diet,
        toilet_trained,
        des,
        petType } = req.body;
        const image = req.file ? req.file.filename : null;
    try {
        const result = await updatePetByID(id, {
            name, breed, color, age, weight, gender,
            neutered,
            rabies_vaccine,
            vaccinated,
            friendly_with_human,
            friendly_with_dog,
            friendly_with_cat,
            special_diet,
            toilet_trained,
            des,
            image,
            petType
        })
        return res.status(200).json({
            EC: 0,
            data: result,
            message: "Update pet successfully",
        });
    } catch (err) {
        return res.status(500).json({
            EC: 1,
            error: err.message,
            message: "Update pet failed",
        });
    }
}

const deletePetAPI = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await deletePetByID(id);
        if (!result) {
            return res.status(404).json({
                EC: 1,
                message: "Pet not found",
            });
        }
        return res.status(200).json({
            EC: 0,
            data: result,
            message: "Delete pet successfully",
        });
    } catch (err) {
        return res.status(500).json({
            EC: 1,
            error: err.message,
            message: "Delete pet failed",
        });
    }
}


module.exports = {
    getPetAPI, postPetAPI, putPetAPI, deletePetAPI
}

