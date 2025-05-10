require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

const checkvalidJWT = (req, res, next) => {
    console.log('>>>checkvalidJWT', req.headers);

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            EC: 1,
            message: 'Unauthorized',
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
            });
        }
        // Attach the decoded token to the request object
        req.user = decoded;
    });


    next();
}

module.exports = {
    checkvalidJWT
};