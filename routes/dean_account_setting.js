// Students can change the way their account var express = require('express')
var express = require('express')
var router = express.Router()
var check_session = require('../functions/check_session')
var bodyParser = require('body-parser')

router.use(express.static("views"))
router.use(bodyParser.urlencoded({extended: true}))

router.get('/deanProSet', (req, res) => {
    if(check_session(req) == 1){
        Profile.findOne({deanID: req.session.userId}, (err, data) => {
            if(err){
                console.log(err)
            }
            else{
                res.render('dean-account-setting', {error: undefined, status: undefined})
            }
        })
    }
    else{
        res.redirect('/login')
    }
})

// Add upload profile image here
router.post('/deanProSet', (req, res) => {
    var infor = req.body
    
    // Check and confirm password
    // if user leave 1 of the fields empty
    if(infor.newPassword.length == 0 || infor.confirmPass.length == 0){
        res.render('dean-account-setting', {status: 0, error: 'You cannot leave 1 of them empty'})
    }
    else{
        // If user type in 2 different passwords
        if(infor.newPassword !== infor.confirmPass){
            res.render('dean-account-setting', {status: 0, error: 'The 2 fields does not match'})
        }
        else{
            const filter = {_id: req.session.userId};
            // We should get event by Jquery on which input value the user just changed but it is more complex, I will cover it later
            
            // If user decides not to update his profile pic, we will update imageurl
            const update_query = { password: infor.confirmPass }
    
            // update Password for dean in users collection
            User.updateOne(filter, update_query, (err,result) => {
                if (err) {
                    console.log(err);
                } 
                else {
                    res.render('dean-account-setting', {status: 1, error: 'Your password has been changed, please tell the others too'})
                }
            });
        }
    }
    
})

module.exports = router