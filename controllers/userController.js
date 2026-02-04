//Functional Logic for User Routes
const User = require('../models/User');
const { signToken } = require('../utils/auth')
const { badRequestErrorObj, createErrorObject, forbiddenAccessErrorObj } = require('../utils/errorhandling')

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json([{ token, user }]);
  } catch (error) {
    res.status(400).json(badRequestErrorObj("creating new user. User may already exist", error));
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json(createErrorObject("Password or email incorrect or left empty.", "BAD_REQUEST"));
    }
    const correctPw = await user.isCorrectPassword(req.body.password);

    if (!correctPw) {
      return res.status(400).json(createErrorObject("Password or email incorrect or left empty.", "BAD_REQUEST"));
    }

    const token = signToken(user);
    res.json([{ token, user }]);

  } catch (error) {
    res.status(400).json(badRequestErrorObj("logging in user", error));
  }

}

const getUserPicture = async (req, res) => { //Already logged in users
  try {
    const account = await User.findOne({ _id: req.user._id })
    if (!account) {
      return res.status(403).json(forbiddenAccessErrorObj("account"))
    }
    const profilePicture = account.profilePicture
    res.json([{ profilePicture: profilePicture }]);
  } catch (error) {
    res.status(404).json(resourceNotFoundErrorObj("profile picture"));
  }
}

const updateUserPicture = async (req, res) => { //Already logged in users
  try {
    const account = await User.findOne({ _id: req.user._id })
    if (!account) {
      return res.status(403).json(forbiddenAccessErrorObj("account"))
    }
    if(req.body.hasOwnProperty("username" || "password" || "_id" || "email" || "__v")){ //Cannot change these fields.
      return res.status(403).json(forbiddenAccessErrorObj("user property. You can only edit your profile picture"))
    }
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body , { new: true }); //Change Profile Picture
    if (!updatedUser) {
      return res.status(404).json(resourceNotFoundErrorObj("account"));
    }
    res.json([{ message: `Successfully updated ${updatedUser.username}'s account with new profile picture.` , profilePicture: updatedUser.profilePicture }]);
  } catch (error) {
    res.status(400).json(badRequestErrorObj("updating profile picture", error));
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserPicture,
  updateUserPicture
}