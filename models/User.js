const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
 
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique:[true, 'Email is required.'],
    match: [/.+@.+\..+/, 'Must use a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required. Atleast 5 characters long.'],
    minlength: 5,
  },
  profilePicture: {
    type: String
  }
});
 
// hash user password
userSchema.pre('save', async function () {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    console.log("Hashbrowns")
  }
});
 
// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
 
const User = model('User', userSchema);
 
module.exports = User;