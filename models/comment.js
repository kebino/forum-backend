let mongoose = require('mongoose');
let Profile = require('./profile');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
    commentedBy:  {type: Schema.Types.ObjectId, ref: 'profile'},
    message: String,
    likes: Number,
    date: Date
});

const Comment =  mongoose.model('comment', commentSchema);

module.exports = Comment;