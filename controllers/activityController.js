const Activity = require('../models/Activity')
const Character = require('../models/Character')
const { resourceNotFoundErrorObj, badRequestErrorObj, forbiddenAccessErrorObj } = require('../utils/errorhandling')

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
//====================

const createActivity = async (req, res) => {
    try {
        const owned = await checkCharacterOwnership(req, req.params.characterId) //check if user owns character
        if (!owned) {
            return res.status(403).json(forbiddenAccessErrorObj("character"))
        }
        const activity = await Activity.create({
            ...req.body,
            character: req.params.characterId //set provided characterId params as assigned character
        });
        res.status(201).json([{ message: 'Successfully created activity.' }, { data: activity }]);
    } catch (error) {
        console.error("[ Error Creating Activity ] ", error)
        res.status(400).json(badRequestErrorObj("creating activity", error));
    }
}
const getActivities = async (req, res) => {
    try {
        const owned = await checkCharacterOwnership(req, req.params.characterId) //check if user owns character
        if (!owned) {
            return res.status(403).json(forbiddenAccessErrorObj("character"))
        }
        const activities = await Activity.find({ character: req.params.characterId }); //return multiple activities
        return activities ? res.json({ data: activities, count: activities.length }) : error //Edge Case: Character match but no Activity match. Otherwise will return null as response.
    } catch (error) {
        res.status(400).json(badRequestErrorObj("obtaining activities", error));
    }
}
const getOneActivity = async (req, res) => {
    try {
        const owned = await checkCharacterOwnership(req, req.params.characterId) //check if user owns character
        if (!owned) {
            return res.status(403).json(forbiddenAccessErrorObj("character"))
        }
        const activity = await Activity.findOne({ _id: req.params.activityId, character: req.params.characterId })
        return activity ? res.json(activity) : error //Edge Case: Character match but no Activity match. Otherwise will return null as response.
    } catch (error) {
        res.status(404).json(resourceNotFoundErrorObj("activity"));
    }
}
const editActivity = async (req, res) => {
    try {
        const owned = await checkCharacterByProxy(req) //Check if activity's character is owned by user.
        if (!owned) {
            return res.status(403).json(forbiddenAccessErrorObj("character"))
        }
        const activity = await Activity.findByIdAndUpdate(req.params.activityId, req.body, { new: true });
        if (!activity) {
            res.status(404).json(resourceNotFoundErrorObj("activity"));
        }
        res.json([{ message: 'Successfully updated activity.' }, { data: activity }]);
    } catch (error) {
        res.status(400).json(badRequestErrorObj("editing activity", error));
    }
}
const deleteActivity = async (req, res) => {
    try {
        const owned = await checkCharacterByProxy(req) //Check if activity's character is owned by user.
        if (!owned) {
            return res.status(403).json(forbiddenAccessErrorObj("character"))
        }
        const activity = await Activity.findByIdAndDelete(req.params.activityId);
        if (!activity) {
            res.status(404).json(resourceNotFoundErrorObj("activity"));
        }
        res.json({ message: 'Activity deleted!' });
    } catch (error) {
        res.status(400).json(badRequestErrorObj("deleting activity", error));
    }
}

module.exports = {
    createActivity,
    getActivities,
    getOneActivity,
    editActivity,
    deleteActivity
}