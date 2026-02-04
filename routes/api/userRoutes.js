const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');
const userController = require('../../controllers/userController')

// POST /api/users/register - Create a new user
router.post('/register', userController.registerUser);
 
// POST /api/users/login - Authenticate a user and return a token
router.post('/login', userController.loginUser);

// Apply Authentication Middleware to only this route
router.use(authMiddleware);

router.get('/profilepicture', userController.getUserPicture) //profile picture routes

router.put('/profilepicture', userController.updateUserPicture ) //profile picture routes

module.exports = router;