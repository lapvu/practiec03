const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const topicSchema = new Schema({
    topic: {
        type: String,
        default: "reminder"
    },
    user_say: {
        type: String,
        required: true
    },
    answer: {
        type: [String],
        required: true
    },
    lang: {
        type: String,
        default: "vi"
    },
    updatetime: {
        type: Date,
        default: Date.now
    }
})

const Topic = mongoose.model('topic', topicSchema);
module.exports = Topic;