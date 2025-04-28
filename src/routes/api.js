const express = require('express');
const { getUserAPI, postUserAPI, putUserAPI, deleteUserAPI } = require('../controllers/apiController');
const api = express.Router();

api.get('/users', getUserAPI)
api.post('/users', postUserAPI)
api.put('/users', putUserAPI)
api.delete('/users', deleteUserAPI)

module.exports = api;