var mongoose = require('mongoose')
var Schema = mongoose.Schema

profileSchema = new Schema( {
    googleID: String,
    userID: String,
	displayname: String,
    class: String,
    dean: String,
    imageurl: String
}, {collection: 'user-profiles'}),

// model is very important, point to the right database(model) name to get access correctly
Profile = mongoose.model('Profile', profileSchema)

// So we are now in Users.user
module.exports = Profile