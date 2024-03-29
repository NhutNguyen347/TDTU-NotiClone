// Routes Define
var sign_in = require('./routes/sign_in.js')
var sign_out = require('./routes/sign_out.js')
var index = require('./routes/index.js')
var admin = require('./routes/admin.js')
var accountSetting = require('./routes/account_setting.js')
var deanAccountSetting = require('./routes/dean_account_setting')
var dean_index = require('./routes/dean_index')
var user_profile = require('./routes/acount_profile')
var report = require('./views/report/report')

// DB Models import
var User = require('./models/user')
var Profile = require('./models/profile')
var Post = require('./models/post')
var Comment = require('./models/comment')

// Oauth key
var key = require('./config/key')

// Modules requirements
var express = require('express')
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('passport');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
var bodyParser = require('body-parser')
var dotenv = require('dotenv')
var path = require('path')


// ####################### Server Setup ################################
var app = express()

////////////////////////// Port setup/////////////////////////////////
//var PORT = process.env.port || 3000

//######################## Passport setup ##############################	
app.use(passport.initialize());
app.use(passport.session());

////////////////////////// CLOUDINARY CONFIG ///////////////////////////
const cloudinary = require('cloudinary').v2;
 
cloudinary.config({
    cloud_name: "dup5vuryj",
    api_key: "254592227425713",
    api_secret: "5Lo9nzwORU9bg0mvRpxgmEgFibc"
})

///////////////////////// App Setup///////////////////////////////////
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("views"))
app.use(express.static("views/admin"))
app.use(express.static("views/report"))

///////////////////////// Connect to MongoDB ////////////////////////////
var db_connection = require('./config/db')

///////////////////////// Setup Express Session ////////////////////////////
// Session will expire after 1 day
var date = new Date()
var expireDate = date.setDate(date.getDate() + 1)

app.use(session({

	// It holds the secret key for session
	secret: 'Your_Secret_Key',

	// Forces the session to be saved
	// back to the session store
	resave: true, //false

	// Forces a session that is "uninitialized"
	// to be saved to the store
	saveUninitialized: false, 

    // Setup session expire
    expires: expireDate
}))

///////////////////////// Middleware Setup ////////////////////////////
app.use('/', sign_in)
app.all('/index', index)
app.all('/logout', sign_out)
app.all('/admin', admin)
app.all('/proSet', accountSetting)
app.all('/addDean',admin)
app.all('/delDean', admin)
//app.all('/new_user',admin)
app.all('/dean_index', dean_index)
app.all('/deanProSet', deanAccountSetting)
// Delete post
app.all('/deletePost', index)
//Edit post
app.all('/editPost', index)
// Submit post edit result
app.all('/submitEdit', index)
// Student search bar
app.all('/search', index)
// For user profile
app.all('/profile', user_profile)
// For comment posting and processing
app.all('/comment', index)
// For comment posting and processing on dean side
app.all('/comment_dean',dean_index)
// Delete Comment
app.all('/deleteComment', user_profile)
// Delete comment on dean side
app.all('/deleteComment_dean', dean_index)
// Report error
app.all('/sendMessage', report)

app.all('/submitMessage', report)

/////////////////////// 404 Handler //////////////////////////////////
app.use('/:route', (req, res) =>{
    var route = req.params.route

    res.render('error', {'title': 'We are sorry for this uncertainty but', 'page_name': route, 'error_message': 'is somewhere on the Moon 🌕'})
})


var server = app.listen(process.env.PORT || 3000, () =>{
    console.log("The server is now running at http://localhost:" + 3000);
})
