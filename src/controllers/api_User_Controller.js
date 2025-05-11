const { getAllUser, getUserById, createUser, getUserByEmail, updateUserByID, deleteUserByID } = require("../services/user.service");

const getUserAPI = async (req, res) => {
    const { id } = req.query
    if (id) {
        try {
            const results = await getUserById(id);
            if (!results) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({
                EC: 0,
                data: results,
                message: "Get user successfully",
            });
        }
        catch (err) {
            return res.status(500).json({
                EC: 1,
                error: err.message,
                message: "Get user failed",
            });
        }
    }
    else {
        try {
            let results = await getAllUser();
            return res.status(200).json({
                EC: 0,
                data: results,
                message: "Get all users successfully",
            });
        } catch (err) {
            return res.status(500).json({
                EC: 1,
                error: err.message,
                message: "Get all users failed",
            });
        }
    }
}

const postUserAPI = async (req, res) => {
    if (Array.isArray(req.body)) {
        const results = [];
        const errors = [];

        for (const user of req.body) {
            try {
                const result = await createUser(user);
                results.push(result);
            } catch (err) {
                errors.push(err.message);
            }
        }

        return res.status(200).json({
            EC: errors.length === 0 ? 0 : 1,
            data: results,
            errors: errors,
            message: "Create users successfully",
        });
    }
    else {
        try {
            const result = await createUser(req.body);
            return res.status(200).json({
                EC: 0,
                data: result,
                message: "Create user successfully",
            });
        } catch (err) {
            return res.status(500).json({
                EC: 1,
                error: err.message,
                message: "Create user failed",
            });
        }
    }
}

const putUserAPI = async (req, res) => {
    const { id, name, email, password, phoneNumber, role } = req.body
    if (!id) {
        return res.status(400).json({
            EC: 1,
            message: "Missing id",
        });
    }

    //check if email is changing
    // const user = await getUserById(id);
    // if (user.email !== email) {
    //     //check if email is already used by another user
    //     const existingUser = await getUserByEmail(email);
    //     if (existingUser) {
    //         return res.status(400).json({
    //             EC: 1,
    //             message: "Email is already used by another user",
    //         });
    //     }
    // }

    try {
        const result = await updateUserByID(id, { name, email, password, phoneNumber, role });
        if (!result) {
            return res.status(404).json({
                EC: 1,
                message: "User not found",
            });
        }
        return res.status(200).json({
            EC: 0,
            data: result,
            message: "Update user successfully",
        });
    } catch (err) {
        return res.status(500).json({
            EC: 1,
            error: err.message,
            message: "Update user failed",
        });
    }
}

const deleteUserAPI = async (req, res) => {
    const { id } = req.query
    if (!id) {
        return res.status(400).json({
            EC: 1,
            message: "Missing id",
        });
    }
    try {
        const result = await deleteUserByID(id);
        if (!result) {
            return res.status(404).json({
                EC: 1,
                message: "User not found",
            });
        }
        return res.status(200).json({
            EC: 0,
            data: result,
            message: "Delete user successfully",
        });
    } catch (err) {
        return res.status(500).json({
            EC: 1,
            error: err.message,
            message: "Delete user failed",
        });
    }
}

module.exports = {
    getUserAPI, postUserAPI, putUserAPI, deleteUserAPI
}