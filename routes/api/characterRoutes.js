const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');
const characterController = require('../../controllers/characterController')

// Apply Authentication Middleware to all routes in this file
router.use(authMiddleware);

//READ - GET ROUTES==================
router.get('/', characterController.getCharacters) //Get All Characters
router.get('/:characterId', characterController.getOneCharacter) //Get Specific Character by ID

//CREATE - POST ROUTES=====================
router.post('/', characterController.createCharacter) //Create One New Character

//UPDATE - PUT ROUTE====================
router.put('/:characterId', characterController.updateCharacter) //Update Specific Character by ID

//DELETE - DELETE ROUTE=================
router.delete('/:characterId', characterController.deleteCharacter) //Delete Specific Character by ID


module.exports = router;