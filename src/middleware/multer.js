const multer = require('multer');
const v4 = require('uuid').v4;
const path = require('path');

const fileUploadMiddleware = (fileFieldName) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `public/images/${fileFieldName}`);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = v4() + '-' + Date.now() + path.extname(file.originalname);
                cb(null, uniqueSuffix);
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
        fileFilter: (req, file, cb) => {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new Error('Only .png, .jpg and .gif format allowed!'), false);
            }
            cb(null, true);
        },
    }).single(fileFieldName);
}

module.exports = fileUploadMiddleware;