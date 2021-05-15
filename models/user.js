// const mongoose = require('mongoose')
// const userSchema = mongoose.Schema({
//   userid: {type: Number},
//   username: {type: String},
//   password:{type: String, require:true},
// })

// userSchema.methods.encryptPassword= function(password){
//   return bcrypt.hashSync(password,bcrypt.getSaltSync(5),null);
// }

// const User = mongoose.model('Users', userSchema, 'user')
// module.exports = User

var mongoose = require('mongoose')
var Schema = mongoose.Schema

/**
 * username for username
 * password for password
 * role: 0 - student, 1 - Dean, 2 - ADMIN
 */
userSchema = new Schema( {
	googleID: String,
	email: String,
	username: String,
	password: String,
	role: Number
}, {collection: 'user'}),

// model is very important, point to the right database(model) name to get access correctly
User = mongoose.model('User123', userSchema)

// So we are now in Users.user
module.exports = User