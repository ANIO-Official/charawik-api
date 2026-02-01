const { Schema, model } = require('mongoose')

const activitySchema = new Schema({
    title: {
        type: String,
        required: [true, "A title is required."]
    },
    content: {
        type: String,
        required: [true, "Activity Content is required. Atleast 1 character."]
    },
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character',
        required: true
    }
})

const Activity = model('Activity', activitySchema)

module.exports = Activity