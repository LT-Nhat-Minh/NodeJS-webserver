const express = require('express');
const { getPetAPI, postPetAPI, putPetAPI, deletePetAPI } = require('../controllers/api_Pet_Controller');
const fileUploadMiddleware = require('../middleware/multer');
const { getUserAPI, postUserAPI, putUserAPI, deleteUserAPI } = require('../controllers/api_User_Controller');
const { loginAPI, registerAPI, logoutAPI, fetchUserAPI } = require('../controllers/api_auth_Controller');
const { checkValidJWT, deleteToken } = require('../middleware/jwt.middleware');
const { postPostAPI, getPostAPI, deletePostAPI, updatePostAPI } = require('../controllers/api_post_Controller');
const { uploadFileAPI } = require('../controllers/api_uploadFile_Controller');

const api = express.Router();

api.get('/pets', getPetAPI)
api.post('/pets', fileUploadMiddleware('petAvatar'), postPetAPI)
api.put('/pets', fileUploadMiddleware('petAvatar'), putPetAPI)
api.delete('/pets', deletePetAPI)

api.get('/users', checkValidJWT, getUserAPI)
api.post('/users', postUserAPI)
api.put('/users', putUserAPI)
api.delete('/users', deleteUserAPI)

api.get('/auth/account', checkValidJWT, fetchUserAPI);
api.post('/auth/login', loginAPI);
api.post('/auth/register', registerAPI);
api.post('/auth/logout', deleteToken, logoutAPI);

api.get('/posts', getPostAPI);
api.post('/posts', fileUploadMiddleware("postThumbnail"), postPostAPI);
api.put('/posts', fileUploadMiddleware("postThumbnail"), updatePostAPI);
api.delete('/posts', deletePostAPI);

// Upload temporary file
api.post('/upload', fileUploadMiddleware("temp"), uploadFileAPI);

module.exports = api;