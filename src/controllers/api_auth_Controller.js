const { handleUserLogin, handleUserRegister } = require("../services/user.service");

const loginAPI = async (req, res) => {
    try {
        const access_token = await handleUserLogin(req.body);
        console.log('>>>access_token', access_token);
        return res.status(200).json({
            EC: 0,
            data: {
                access_token
            },
            message: "Login successfully",
        });
    } catch (err) {
        return res.status(401).json({
            EC: 1,
            data: null,
            message: err.message,
        });
    }
}

const registerAPI = async (req, res) => {
    const { name, password, email, phoneNumber } = req.body.data
    const result = await handleUserRegister({ name, password, email, phoneNumber });

    if (result.EC === 1) {
        return res.status(400).json({
            EC: 1,
            data: null,
            message: result.message,
        });
    }

    if (result.EC === 0) {
        return res.status(200).json({
            EC: 0,
            data: result.data,
            message: result.message,
        });
    }
}

const logoutAPI = async (req, res) => {

}

module.exports = {
    loginAPI, registerAPI, logoutAPI,
}