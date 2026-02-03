//Functional Logic for User Routes
const User = require('../models/User');
const { signToken } = require('../utils/auth')
const { badRequestErrorObj, createErrorObject } = require('../utils/errorhandling')

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
      return res.status(400).json(createErrorObject("Password or username incorrect or left empty.", "BAD_REQUEST"));
    }
    const correctPw = await user.isCorrectPassword(req.body.password);

    if (!correctPw) {
      return res.status(400).json(createErrorObject("Password or username incorrect or left empty.", "BAD_REQUEST"));
    }

    const token = signToken(user);
    res.json([{ token, user }]);

  } catch (error) {
    res.status(400).json(badRequestErrorObj("logging in user", error));
  }

}

module.exports = {
  registerUser,
  loginUser
}