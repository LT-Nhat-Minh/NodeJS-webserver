const express = require('express');
const { getHomePage, handleDeletePet, getCreatePetPage, handleCreatePet } = require('../controllers/routerController');
const fileUploadMiddleware = require('../middleware/multer');

const router = express.Router();

router.get('/', getHomePage);
router.post('/delete-pet', handleDeletePet);

router.get('/create-pet', getCreatePetPage)
router.post('/create-pet', fileUploadMiddleware("petAvatar"), handleCreatePet)

module.exports = router;