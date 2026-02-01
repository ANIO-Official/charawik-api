const Character = require('../models/Character')

const getCharacters = async (req, res) => {
    try {
        const character = await Character.find({ owner: req.user._id });
        res.json(character);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getOneCharacter = async (req, res) => {
    try {

        const ownCharacter = await Character.findOne({ _id: req.params.characterId, owner: req.user._id })
        if (!ownCharacter) {
            return res.status(403).json( {message: "You are not authorized to view this character."})
        }

        res.json(ownCharacter);
    } catch (err) {
        res.status(404).json({ message: "Could not find character of matching ID." });
    }
}

const createCharacter = async (req, res) => {
    try {
        const character = await Character.create({
            ...req.body,
            owner: req.user._id
        });
        res.status(201).json([{ message: 'Successfully created character.' }, { created: character }]);
    } catch (err) {
        console.error("[ Error Creating Character ] ", err)
        res.status(400).json({ message: "Error creating new character." });
    }
}

const updateCharacter = async (req, res) => {
    try {
        const ownCharacter = await Character.findOne({ _id: req.params.characterId, owner: req.user._id })
        if (!ownCharacter) {
            return res.status(403).json({message: "You are not authorized to update this character."})
        }

        const character = await Character.findByIdAndUpdate(req.params.characterId, req.body, { new: true });
        if (!character) {
            return res.status(404).json({ message: 'No character found with this id!' });
        }
        res.json([{ message: 'Successfully updated character.' }, { update: character }]);
    } catch (err) {
        res.status(400).json(err);
    }
}

const deleteCharacter = async (req, res) => {
    try {
        const ownCharacter = await Character.findOne({ _id: req.params.characterId, owner: req.user._id })
        if (!ownCharacter) {
            return res.status(403).json({message: "You are not authorized to delete this character."})
        }
        const character = await Character.findByIdAndDelete(req.params.characterId);
        if (!character) {
            return res.status(404).json({ message: 'No character found with this id!' });
        }
        res.json({ message: 'Character deleted!' });
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    getCharacters,
    getOneCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter
}