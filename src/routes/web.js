const express = require('express');
const { getHomePage, getSample, postSample } = require('../controllers/homeController');
const router = express.Router();

router.get('/', getHomePage)
router.get('/sample', getSample)
router.post('/sample', postSample)

module.exports = router;