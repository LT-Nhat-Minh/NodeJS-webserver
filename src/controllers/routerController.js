const Pet = require('../models/pet');
const { getAllPet, createPet, deletePetByID } = require('../services/pet.service');

const getHomePage = async (req, res) => {
    const pets = await getAllPet();
    return res.render('home.ejs', { pets });
}

const handleDeletePet = async (req, res) => {
    await deletePetByID(req.body.id);
    return res.redirect('/');
}

const getCreatePetPage = async (req, res) => {
    return res.render('createPet.ejs');
}

const handleCreatePet = async (req, res) => {

    // console.log(req.file)>>>FileName {
    //     fieldname: 'petAvatar',
    //     originalname: '1.jpeg',
    //     encoding: '7bit',
    //     mimetype: 'image/jpeg',
    //     destination: 'public/images/',
    //     filename: 'b1fedbf3-a5f6-4d49-bdf0-0d211bc492b4-1746816205390.jpeg',
    //     path: 'public\\images\\b1fedbf3-a5f6-4d49-bdf0-0d211bc492b4-1746816205390.jpeg',
    //     size: 722363
    //   }

    const file = req.file;
    const petAvatar = file.filename;

    const { name, breed, color, age, weight, gender, 
        neutered, 
        rabies_vaccine, 
        vaccinated, 
        friendly_with_human, 
        friendly_with_dog, 
        friendly_with_cat, 
        special_diet, 
        toilet_trained, 
        des, 
        petType } = req.body;
    const result = await createPet({ name, breed, color, age, weight, gender, 
        neutered, 
        rabies_vaccine, 
        vaccinated, 
        friendly_with_human, 
        friendly_with_dog, 
        friendly_with_cat, 
        special_diet, 
        toilet_trained, 
        des, 
        image: petAvatar,
        petType });
    return res.redirect('/create-pet');
}

module.exports = { getHomePage, handleDeletePet, getCreatePetPage, handleCreatePet };