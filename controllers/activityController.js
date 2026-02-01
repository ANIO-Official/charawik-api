const Activity = require('../models/Activity')
const Character = require('../models/Character')

//=============Utils
const checkCharacterOwnership = async (req, characterId) => {
    const ownCharacter = await Character.findOne({ owner: req.user._id, _id: characterId })
    return ownCharacter
}

const checkCharacterByProxy = async (req) => {
    const queriedActivity = await Activity.findOne({ _id: req.params.activityId }) //find Activty by ID
    const characterId = queriedActivity.character //get the character assigned to the activity
    return checkCharacterOwnership(req, characterId) //check if the current user owns this character.
}
//===================

const createActivity = async (req, res) => {
    try {
        const owned = await checkCharacterOwnership(req, req.params.characterId) //check if user owns character
        if (!owned) {
            return res.status(401).json({ message: 'You are not permitted to access this character.' })
        }
        const activity = await Activity.create({
            ...req.body,
            character: req.params.characterId //set provided characterId params as assigned character
        });
        res.status(201).json([{ message: 'Successfully created activity.' }, { activity: activity }]);
    } catch (error) {
        console.error("[ Error Creating Activity ] ", error)
        res.status(400).json({ error: "Error creating new activity." });
    }
}
const getActivities = async (req, res) => {
    try {
        const owned = await checkCharacterOwnership(req, req.params.characterId) //check if user owns character
        if (!owned) {
            return res.status(401).json({ error: "Invalid Access Token.", message: 'You are not permitted to interact with this character.' })
        }
        const activities = await Activity.find({ character: req.params.characterId }); //return multiple activities
        return activities ? res.json({ activities: activities, count: activities.length }) : error //Edge Case: Character match but no Activity match. Otherwise will return null as response.
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getOneActivity = async (req, res) => {
    try {
        const owned = await checkCharacterOwnership(req, req.params.characterId) //check if user owns character
        if (!owned) {
            return res.status(401).json({ message: 'You are not permitted to interact with this character.' })
        }
        const activity = await Activity.findOne({ _id: req.params.activityId, character: req.params.characterId })
        return activity ? res.json(activity) : err //Edge Case: Character match but no Activity match. Otherwise will return null as response.
    } catch (error) {
        res.status(404).json({ error: "Could not find activity of matching ID." });
    }
}
const editActivity = async (req, res) => {
    try {
        const owned = await checkCharacterByProxy(req) //Check if activity's character is owned by user.
        if (!owned) {
            return res.status(401).json({ message: 'You are not permitted to interact with this character.' })
        }
        const activity = await Activity.findByIdAndUpdate(req.params.activityId, req.body, { new: true });
        if (!activity) {
            return res.status(404).json({ error: 'No activity found with this id!' });
        }
        res.json([{ message: 'Successfully updated activity.' }, { activity: activity }]);
    } catch (error) {
        res.status(500).json({ error: `Encoutered an error while editing activity. [Error] ${error.message}` });
    }
}
const deleteActivity = async (req, res) => {
    try {
        const owned = await checkCharacterByProxy(req) //Check if activity's character is owned by user.
                if (!owned) {
                    return res.status(401).json({ message: 'You are not permitted to interact with this character.' })
                }
                const activity = await Activity.findByIdAndDelete(req.params.activityId);
                if (!activity) {
                    return res.status(404).json({ error: 'No activity found with this id!' });
                }
                res.json({ message: 'Activity deleted!' });
    } catch (error) {
        res.status(500).json({ error: `Encoutered an error while deleting activity. [Error] ${error.message}` });
    }
}

module.exports = {
    createActivity,
    getActivities,
    getOneActivity,
    editActivity,
    deleteActivity
}