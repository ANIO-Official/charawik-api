const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');
const activityController = require('../../controllers/activityController')


// Apply authMiddleware to all routes in this file.
router.use(authMiddleware);

//READ - GET ROUTES==================
router.get('/characters/:characterId/activities', activityController.getActivities)
router.get('/characters/:characterId/activities/:activityId', activityController.getOneActivity)

//CREATE - POST ROUTES=====================
router.post('/characters/:characterId/activities', activityController.createActivity)

//UPDATE - PUT ROUTE====================
router.put('/activities/:activityId', activityController.editActivity)

//DELETE - DELETE ROUTE=================
router.delete('/activities/:activityId', activityController.deleteActivity)

module.exports = router