const router = require('express').Router();
const userRoutes = require('./userRoutes')
const characterRoutes = require('./characterRoutes')
const activityRoutes = require('./activityRoutes')

router.use('/users', userRoutes) //User Routes
router.use('/characters', characterRoutes) //Character Routes

//Base API Route - localhost:3000/api
router.get('/', (req, res)=>{ res.send('<h1>Welcome to the root of the API.</h1>') })

router.use('/', activityRoutes) //Task Routes from Root, Vary in Prefix


module.exports = router;