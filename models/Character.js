const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
  profileImage: {
    type: String,
    required: [true, "An image is required for your character. JPEG, PNG, or JPG. 16MB maximum size."],
  },
  name: {
    type: String,
    required: [true, "A name is required for the character. Suggestion: If they have no name, use ?????."],
  },
  age: {
    type: Number
  },
  biography: {
    type: String,
    required: [true, "Pleae provide a brief biography (an about or description) for your character."]
  },
  likes: {
    type: [String]
  },
  dislikes: {
    type: [String]
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Character = model('Character', characterSchema)

module.exports = Character