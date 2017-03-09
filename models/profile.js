let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProfileSchema = new Schema({
    name: String
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;