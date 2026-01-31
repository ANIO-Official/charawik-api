const router = require('express').Router();
const apiRoutes = require('./api');
 
router.use('/api', apiRoutes); //apiRoutes
 
router.use((req, res) => { //base page
  res.send(
    `<div style="font-family:Arial;">
    <h1>Welcome to the CharaWik API!</h1>
        <h2>Available Endpoints 🟢</h2>
        <p style="font-size: 18px;">
        /api/users/register || <i style="color:gray">Post/Create User</i></br></br>
        /api/users/login || <i style="color:gray">Post/Login Existing User</i></br></br>

        /api/characters || <i style="color:gray">Get/Read All characters or Post/Create a new character. Must be the owner of the character.</i></br></br>
        /api/characters/:characterId  || <i style="color:gray"> Get/Read, Put/Update, Delete characters a specific character. Must be the owner of the character.</i></br></br>

        /api/characters/:characterId/activities || <i style="color:gray">Get/Read All activity. Must be the owner of the character the activity belongs to.</i></br></br>
        /api/characters/:characterId/activities/:activityId || <i style="color:gray">Get/View A specific activity by ID. Must be the owner of the character the activity belongs to.</i></br></br>
        /api/activities/:activityId  || <i style="color:gray">Put/Update & Delete A specific activity by ID. Must be the owner of the character the activity belongs to.</i></br></br>
        </p>
        <h3>Thanks for Checking out the CharaWik API!</h3>
        </div>
    `);
});
 
module.exports = router;