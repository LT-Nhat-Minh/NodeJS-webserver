const express = require('express');
const { getPetAPI, postPetAPI, putPetAPI } = require('../controllers/apiController');
const api = express.Router();

api.get('/pets', getPetAPI)
api.post('/pets', postPetAPI)
api.put('/pets', putPetAPI)

module.exports = api;