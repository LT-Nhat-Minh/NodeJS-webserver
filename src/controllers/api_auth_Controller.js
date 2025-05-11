const { create } = require("../models/user");
const { handleUserLogin, handleUserRegister } = require("../services/user.service");

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
    const { name, password, email, phoneNumber } = req.body
    try{
        //check validation fields
        if (!name || !password || !email || !phoneNumber) {
            return res.status(400).json({
                EC: 1,
                data: null,
                message: 'Missing required fields (name, password, email, phoneNumber)',
                statusCode: 400,
            });
        }
        const user = await handleUserRegister({ name, password, email, phoneNumber });

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
    

    if (result.EC === 1) {
        return res.status(400).json({
            EC: 1,
            data: null,
            message: result.message,
            statusCode: 400,
        });
    }

    if (result.EC === 0) {
        return res.status(200).json({
            EC: 0,
            data: result.data,
            message: result.message,
            statusCode: 200,
        });
    }
}

const logoutAPI = async (req, res) => {

}

module.exports = {
    loginAPI, registerAPI, logoutAPI,
}