const Character = require('../models/Character')
const { resourceNotFoundErrorObj, badRequestErrorObj, forbiddenAccessErrorObj } = require('../utils/errorhandling')

const getCharacters = async (req, res) => {
    try {
        const characters = await Character.find({ owner: req.user._id });
        res.json([{ characters: characters, count: characters.length }]);
    } catch (error) {
        res.status(400).json(badRequestErrorObj("obtaining characters", error));
    }
}

const getOneCharacter = async (req, res) => {
    try {

        const ownCharacter = await Character.findOne({ _id: req.params.characterId, owner: req.user._id })
        if (!ownCharacter) {
            return res.status(403).json(forbiddenAccessErrorObj("character"))
        }

        res.json([{ character: ownCharacter}]);
    } catch (error) {
        res.status(404).json(resourceNotFoundErrorObj("character"));
    }
}

const createCharacter = async (req, res) => {
    try {
        const character = await Character.create({
            ...req.body,
            owner: req.user._id
        });
        res.status(201).json([{ message: 'Successfully created character.' , character: character }]);
    } catch (error) {
        res.status(400).json(badRequestErrorObj("creating character", error));
    }
}

const updateCharacter = async (req, res) => {
    try {
        const ownCharacter = await Character.findOne({ _id: req.params.characterId, owner: req.user._id })
        if (!ownCharacter) {
            return res.status(403).json(forbiddenAccessErrorObj("character"))
        }

        const character = await Character.findByIdAndUpdate(req.params.characterId, req.body, { new: true });
        if (!character) {
            return res.status(404).json(resourceNotFoundErrorObj("character"));
        }
        res.json([{ message: 'Successfully updated character.' , character: character }]);
    } catch (error) {
        res.status(400).json(badRequestErrorObj("updating character", error));
    }
}

const deleteCharacter = async (req, res) => {
    try {
        const ownCharacter = await Character.findOne({ _id: req.params.characterId, owner: req.user._id })
        if (!ownCharacter) {
            return res.status(403).json(forbiddenAccessErrorObj("character"))
        }
        const character = await Character.findByIdAndDelete(req.params.characterId);
        if (!character) {
            return res.status(404).json(resourceNotFoundErrorObj("character"));
        }
        res.json([{ message: 'Character deleted!' }]);
    } catch (error) {
        res.status(400).json(badRequestErrorObj("deleting character", error));
    }
}

module.exports = {
    getCharacters,
    getOneCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter
}