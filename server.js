// Routes Define
var sign_in = require('./routes/sign_in.js')
var sign_out = require('./routes/sign_out.js')
var index = require('./routes/index.js')
var admin = require('./routes/admin.js')
var accountSetting = require('./routes/account_setting.js')

// DB Models import
var User = require('./models/user')
var Profile = require('./models/profile')

// Oauth key
var key = require('./config/key')

// Modules requirements
var express = require('express')
var mongoose = require('mongoose')
var session = require('express-session')
var passport = require('passport');

// ####################### Server Setup ################################
var app = express()

////////////////////////// Port setup/////////////////////////////////
var PORT = process.env.port || 3000
app.set("port", PORT)

//######################## Passport setup ##############################	
app.use(passport.initialize());
app.use(passport.session());


///////////////////////// App Setup///////////////////////////////////
app.set('view engine', 'ejs')

///////////////////////// Connect to MongoDB ////////////////////////////
var db_connection = require('./config/db')

///////////////////////// Setup Express Session ////////////////////////////
app.use(session({

	// It holds the secret key for session
	secret: 'Your_Secret_Key',

	// Forces the session to be saved
	// back to the session store
	resave: true, //false

	// Forces a session that is "uninitialized"
	// to be saved to the store
	saveUninitialized: false
}))

///////////////////////// Middleware Setup ////////////////////////////
app.use('/', sign_in)
app.all('/index', index)
app.all('/logout', sign_out)
app.all('/admin', admin)
app.all('/proSet', accountSetting)
app.all('/add_user_page',admin)
app.all('/new_user',admin)
/////////////////////// 404 Handler //////////////////////////////////
app.use('/:route', (req, res) =>{
    var route = req.params.route

    res.render('error', {'title': 'We are sorry for this uncertainty but', 'page_name': route, 'error_message': 'is somewhere on the Moon 🌕'})
})

var server = app.listen(PORT, () =>{
    console.log("The server is now running at http://localhost:" + PORT);
})
