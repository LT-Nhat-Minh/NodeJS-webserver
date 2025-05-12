const { create } = require("../models/user");
const { handleUserLogin, handleUserRegister, getUserById } = require("../services/user.service");

const loginAPI = async (req, res) => {
    try {
        const result = await handleUserLogin(req.body);
        console.log('>>>loginResult', result);
        return res.status(200).json({
            EC: 0,
            data: result,
            message: "Login successfully",
            statusCode: 200,
        });
    } catch (err) {
        return res.status(401).json({
            EC: 1,
            data: null,
            message: err.message,
            statusCode: err.statusCode || 401,
        });
    }
}

const registerAPI = async (req, res) => {
    const { name, password, email, phoneNumber} = req.body
    try{
        //check validation fields
        if (!name || !password || !email || !phoneNumber || !role) {
            return res.status(400).json({
                EC: 1,
                data: null,
                message: 'Missing required fields (name, password, email, phoneNumber, role)',
                statusCode: 400,
            });
        }
        const user = await handleUserRegister({ name, password, email, phoneNumber});

        return res.status(200).json({
            EC: 0,
            data: user,   
            message: "Register successfully",
            statusCode: 200,
        });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({
            EC: 1,
            data: null,
            message: err.message,
            statusCode: err.statusCode || 500,
        });
    }
}

const logoutAPI = async (req, res) => {
}

const fetchUserAPI = async (req, res) => {
    const { id } = req.body;
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
        return res.status(err.statusCode || 500).json({
            EC: 1,
            data: null,
            message: err.message,
            statusCode: err.statusCode || 500,
        });
    }
    
}

module.exports = {
    loginAPI, registerAPI, logoutAPI, fetchUserAPI
}