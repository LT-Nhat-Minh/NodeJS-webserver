const Pet = require("../models/pet");
const { getAllPet, getPetById, createPet, updatePetByID } = require("../services/pet.service");

const getPetAPI = async (req, res) => {
    const { id } = req.params;
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
            let results = await getAllPet();
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
    try {
        const { name, gender, breed, color, age } = req.body;
        const result = await createPet({
            name,
            gender,
            breed,
            color,
            age,
        });
        res.status(201).json({
            EC: 0,
            data: result,
            message: "Create pet successfully",
        });
    } catch (err) {
        res.status(500).json({
            EC: 1,
            error: err.message,
            message: "Create pet failed",
        });
    }
};

const putPetAPI = async (req, res) => {
    const { id, name, gender, breed, color, age } = req.body;
    try {
        const result = await updatePetByID(id, {
            name,
            gender,
            breed,
            color,
            age,
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



// const getUserAPI = async (req, res) => {
//     try {
//         const users = await User.find({});

//         res.status(200).json(users);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// const postUserAPI = async (req, res) => {
//     try {
//         const { name, email, address } = req.body;
//         const user = await User.create({
//             name: name,
//             email: email,
//             address: address
//         });

//         res.status(201).json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// const putUserAPI = async (req, res) => {
//     try {
//         const { id, name, email, address } = req.body;
//         const user = await User.updateOne({ _id: id }, {
//             name: name,
//             email: email,
//             address: address
//         });

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

// const deleteUserAPI = async (req, res) => {
//     try {
//         const { id } = req.body;
//         const user = await User.deleteOne({ _id: id });

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// }

module.exports = {
    getPetAPI, postPetAPI, putPetAPI
}

