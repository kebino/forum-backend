let mongoose = require('mongoose');
let Comment = require('./comment');
let Schema = mongoose.Schema;

let forumSchema = new Schema({
    topic: String,
    category: String,
    originalPost: { type: Schema.Types.ObjectId, ref: 'comment'},
    replies: [{ type: Schema.Types.ObjectId, ref: 'comment'}],
    views: Number,
    date: Date
});

const Forum = mongoose.model('forum', forumSchema);

module.exports = Forum;