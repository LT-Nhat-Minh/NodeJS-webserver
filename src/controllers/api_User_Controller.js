const { getAllUser, getUserById, createUser, getUserByEmail, updateUserByID, deleteUserByID } = require("../services/user.service");

const getUserAPI = async (req, res) => {
    const { id } = req.query
    if (id) {
        try {
            const results = await getUserById(id);
            if (!results) {
                return res.status(404).json({
                    EC: 1,
                    data: null,
                    message: "User not found",
                    statusCode: 404,
                });
            }
            return res.status(200).json({
                EC: 0,
                data: results.data,
                message: "Get user successfully",
                statusCode: 200,
            });
        }
        catch (err) {
            return res.status(500).json({
                EC: 1,
                data: null,
                error: err.message,
                message: "Get user failed",
                statusCode: 500,
            });
        }
    }
    else {
        try {
            let results = await getAllUser();
            return res.status(200).json({
                EC: 0,
                data: results.data,
                message: "Get all users successfully",
                statusCode: 200,
            });
        } catch (err) {
            return res.status(500).json({
                EC: 1,
                data: null,
                error: err.message,
                message: "Get all users failed",
                statusCode: 500,
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
                results.push(result.data);
            } catch (err) {
                errors.push(err.message);
            }
        }

        return res.status(200).json({
            EC: errors.length === 0 ? 0 : 1,
            data: results,
            errors: errors,
            message: "Create users successfully",
            statusCode: 200,
        });
    }
    else {
        try {
            const result = await createUser(req.body);
            return res.status(200).json({
                EC: 0,
                data: result.data,
                message: "Create user successfully",
                statusCode: 200,
            });
        } catch (err) {
            return res.status(500).json({
                EC: 1,
                data: null,
                error: err.message,
                message: "Create user failed",
                statusCode: 500,
            });
        }
    }
}

const putUserAPI = async (req, res) => {
    const { id, name, email, phoneNumber, role } = req.body
    if (!id) {
        return res.status(400).json({
            EC: 1,
            data: null,
            message: "Missing id",
            statusCode: 400,
        });
    }

    try {
        const result = await updateUserByID({ id, name, email, phoneNumber, role });
        console.log(result);
        if (!result) {
            return res.status(404).json({
                EC: 1,
                data: null,
                message: "User not found",
                statusCode: 404,
            });
        }
        return res.status(200).json({
            EC: 0,
            data: result.data,
            message: "Update user successfully",
        });
    } catch (err) {
        return res.status(500).json({
            EC: 1,
            data: null,
            error: err.message,
            message: "Update user failed",
            statusCode: 500,
        });
    }
}

const deleteUserAPI = async (req, res) => {
    const { id } = req.query
    if (!id) {
        return res.status(400).json({
            EC: 1,
            data: null,
            message: "Missing id",
            statusCode: 400,
        });
    }
    try {
        const result = await deleteUserByID(id);
        if (!result) {
            return res.status(404).json({
                EC: 1,
                data: null,
                message: "User not found",
                statusCode: 404,
            });
        }
        return res.status(200).json({
            EC: 0,
            data: result.data,
            message: "Delete user successfully",
            statusCode: 200,
        });
    } catch (err) {
        return res.status(500).json({
            EC: 1,
            data: null,
            error: err.message,
            message: "Delete user failed",
            statusCode: 500,
        });
    }
}

module.exports = {
    getUserAPI, postUserAPI, putUserAPI, deleteUserAPI
}