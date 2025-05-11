const express = require('express');
const { getPetAPI, postPetAPI, putPetAPI, deletePetAPI } = require('../controllers/api_Pet_Controller');
const fileUploadMiddleware = require('../middleware/multer');
const { getUserAPI, postUserAPI, putUserAPI, deleteUserAPI } = require('../controllers/api_User_Controller');
const { loginAPI, registerAPI, logoutAPI } = require('../controllers/api_auth_Controller');
const { checkValidJWT } = require('../middleware/jwt.middleware');

const api = express.Router();

api.get('/pets', getPetAPI)
api.post('/pets', fileUploadMiddleware('petAvatarImage'), postPetAPI)
api.put('/pets', fileUploadMiddleware('petAvatarImage'), putPetAPI)
api.delete('/pets', deletePetAPI)

api.get('/users', checkValidJWT, getUserAPI)
api.post('/users', postUserAPI)
api.put('/users', putUserAPI)
api.delete('/users', deleteUserAPI)

api.post('/auth/login', loginAPI);
api.post('/auth/register', registerAPI);
api.post('/auth/logout', logoutAPI);

module.exports = api;