const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const passport = require('passport')	
var key = require('../config/key')

router.use(express.static("views"))
router.use(bodyParser.urlencoded({extended: true}))

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/login', (req,res) => {
    // If session is set, go to index
    if(req.session.userId){
        // Check role to redirect to correct page tho
        if(req.session.userRole == 1 || req.session.userRole == 0)
            return res.redirect('/index')
        else if(req.session.userRole == 2)
            return res.redirect('/admin')
    }
    else{
        return res.render('sign-in', {error1: '', error2: '', username: '', password: ''})
    }
    
})

// Sign-in process for supervisors - Deans or Admin
router.post('/login', (req, res) => {
    
    // Make a function to render view 
    function render_login(username, password, error){
        return res.render('sign-in', {error1: '', error2: error, username: username, password: password})
    }

    // Simple Form validation
    let {username, password} = req.body

    console.log(username + " " + password)

    let error = undefined

    if(!username){
        error = "Please enter your username 😢"
    }

    else if(!password){
        error = "Please enter your password 😢"
    }//End of simple validation

    // Login function begins
    else{
        User.find({username: username},function(err,data){
            // Data with Json array always returns even if it is empty so catch the length too
            if(data && data.length != 0){
                console.log(data)
                
                //The return type of the result here is an array of JSON so to access to it properly, put the index in.
                let data_un = data[0].username
                let data_pass = data[0].password
                let data_role = data[0].role
                let data_uid = data[0]._id

                // console.log('unique id here is' + data_uid)
                // console.log('role from return data is ' + data_role)

                // Check if it is admin
                if(data_un == "admin" && data_pass == password){
                    req.session.userId = data_uid;
                    req.session.userRole = data_role;
                    res.redirect('/admin')
                }
                
                else if(data_pass == password){
                    //console.log("Done Login");
                    req.session.userId = data_uid;
                    req.session.userRole = data_role;
                    //console.log(req.session.userId);
                    res.redirect('/index')
                }
                // !!! The problem here is that it will stop working when we set error with new value every time the condition occurs
                else{
                    render_login(username, password, 'Wrong password 😢')
                }
            }
            
            else{
                render_login(username, password, 'This user is undefined 😢')
            }
        });
    }

    if(error){
        render_login(username, password, error)
    }
})

////////////////////////////////////Google Login for students//////////////////////////////////
var emailChecker = require('../functions/student_email_checker/emailChecker')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function(user, cb) {
	cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
	cb(null, obj);
});

// Basically, replace these 2 fields with your gg client id and secret key
// const GOOGLE_CLIENT_ID = '1615839175-s2nldpmf4t4l2o60d4saqpn72v10qaj5.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = 'YrlNs-98zLycrtSABaKZ4SvT';
passport.use(new GoogleStrategy({
    clientID: key.google.clientID,
    clientSecret: key.google.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));

var userProfile

router.get('/auth/google',
    passport.authenticate('google', { scope : ['profile', 'email'] }))

router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      // Successful authentication, redirect success.
      // First check if email is OK or not
      if(emailChecker(userProfile.emails[0].value) == 1){
        // Check in Database if the user is there or not with googleID
        User.find({googleID: userProfile.id}, (err, data) => {
            if(err){
            return console.log(err)
            }
            else{
            // If the user is there already, move to index page
            if(data && data.length != 0){
                req.session.userId = userProfile.id
                req.session.userRole = 0
                return res.redirect('/index');
            }
            // Else, user is new to db, write user in
            else{
                // create new schema
                var new_user = new User({googleID: userProfile.id, email: userProfile.emails[0].value, role: 0})
                
                //create profile schema
                var new_profile = new Profile({displayname: userProfile.displayName, class: 'Class01', dean: 'Dean01'})
                // create new profile schema
                // save user
                new_user.save((err, collection) => {
                if(err){
                    return res.send(err)
                }
                else{
                    req.session.userId = userProfile.id
                    req.session.userRole = 0
                    return res.redirect('/index');
                }
                })
                // save profile
                new_profile.save((err, collection) => {
                })
            }
            }
        })
      }
      else{
          res.redirect('/login')
      }
      
    });

module.exports = router