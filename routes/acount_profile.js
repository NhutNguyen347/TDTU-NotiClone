var express = require('express')
var router = express.Router()

router.use(express.static("views"))

router.get('/profile', (req, res) => {

    // Check session 
    if(!req.session.userId){
        res.redirect('/login')
    }
    else{
        // Check if query string is undefined or not
        if(req.query.search === undefined || req.query.search.length == 0){
            res.redirect('/index')
        }
        else{   
            User.find({email: req.query.search}).then(function(data){
                // Get user ID
                var user_id = data[0].googleID
                console.log(user_id)
    
                // User id to search profile
                Profile.find({googleID: user_id}).then(function(profile){
                    res.render('user-profile', {data: profile})
                })
            })
        }
        
        
    }
})

module.exports = router