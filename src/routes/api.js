const express = require('express');
const { getPetAPI, postPetAPI, putPetAPI, deletePetAPI } = require('../controllers/apiController');
const multer = require('multer');
const fileUploadMiddleware = require('../middleware/multer');

const api = express.Router();

api.get('/pets', getPetAPI)
api.post('/pets', fileUploadMiddleware('petAvatarImage'), postPetAPI)

api.put('/pets', fileUploadMiddleware('petAvatarImage'), putPetAPI)
api.delete('/pets', deletePetAPI)

module.exports = api;