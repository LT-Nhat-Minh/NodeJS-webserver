const User = require("../models/user");

const getUserAPI = async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const postUserAPI = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const user = await User.create({
            name: name,
            email: email,
            address: address
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const putUserAPI = async (req, res) => {
    try {
        const { id, name, email, address } = req.body;
        const user = await User.updateOne({ _id: id }, {
            name: name,
            email: email,
            address: address
        });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteUserAPI = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.deleteOne({ _id: id });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getUserAPI, postUserAPI, putUserAPI, deleteUserAPI
}

