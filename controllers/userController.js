//Functional Logic for User Routes
const User = require('../models/User');
const { signToken } = require('../utils/auth')

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    console.error('[ An Error Occured Creating new User ] ', err)
    res.status(400).json({ error: 'Error creating new user. User already exist.' });
  }
}

const loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "Password or username incorrect." });
  }

  const correctPw = await user.isCorrectPassword(req.body.password);

  if (!correctPw) {
    return res.status(400).json({ message: 'Password or username incorrect.' });
  }

  const token = signToken(user);
  res.json({ token, user });
}

module.exports = {
  registerUser,
  loginUser
}