require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

const checkValidJWT = (req, res, next) => {
    console.log('>>>checkvalidJWT', req.headers);
    //check if token is in the header
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            EC: 1,
            data: null,
            message: 'Unauthorized',
            statusCode: 401,
        });
    }

    //split token to get the actual token
    const tokenWithoutBearer = token.split(' ')[1];

    //verify token
    jwt.verify(tokenWithoutBearer, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                EC: 1,
                data: null,
                message: err.message,
                statusCode: 401,
            });
        }
        // Attach the decoded token to the request object
        req._id = decoded._id;
    });
    next();
}

//delete token
const deleteToken = (req, res) => {
    //delete token logic
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            EC: 1,
            data: null,
            message: 'Unauthorized',
            statusCode: 401,
        });
    }
    //split token to get the actual token
    const tokenWithoutBearer = token.split(' ')[1];
    //delete token logic
    jwt.destroy(tokenWithoutBearer);
    return res.status(200).json({
        EC: 0,
        data: null,
        message: 'Logout successfully',
        statusCode: 200,
    });
}

module.exports = {
    checkValidJWT, deleteToken
};