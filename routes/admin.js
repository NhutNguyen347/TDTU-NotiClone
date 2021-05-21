var express = require('express')
var router = express.Router()
var check_session_admin = require('../functions/check_session_admin')

// Set up views for admin page
router.use(express.static("views"))
router.use(express.static("views/admin"))

// This logout is not protected, if user type in url '/something/logout', it will log out
router.get('/admin', (req, res) => {
    // Check Session userId with 
    if(check_session_admin(req) == 1){
        //Collect all users from users collection
        User.find({}, (err, data) => {
            if(err) console.log(err)
            else{

                function numCounter(role){
                    var count = 0

                    for(i = 0; i < data.length; i++){
                        if(data[i].role == role){
                            count = count + 1
                        }
                    }

                    return count
                }

                res.render('admin/dashboard',  {numUsers: numCounter(0), numDean: numCounter(1)})
            }
        })
	}
    else{
        res.redirect('/login')
    }
    
})

router.get('/addDean',(req,res)=>{
    if(check_session_admin(req) == 1){
        res.render('admin/addDean');
	}
    else{
        res.redirect('/login')
    }
})

router.post('/addDean' , (req , res)=>{
    var body = req.body

    // Create in Users firts 
    var new_user = new User({username: body.username, password: body.password, role: 1})
    // Save new_user to Users first
    new_user.save()
    
    var new_profile = new Profile({deanID: new_user._id, displayname: body.displayname})
    
    new_profile.save()

    res.redirect('/admin')
})

module.exports = router