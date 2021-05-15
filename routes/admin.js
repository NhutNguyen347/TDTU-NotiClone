var express = require('express')
var router = express.Router()
var check_session_admin = require('../functions/check_session_admin')

// This logout is not protected, if user type in url '/something/logout', it will log out
router.get('/admin', (req, res) => {
    // Check Session userId with 
    if(check_session_admin(req) == 1){
        res.render('admin')
	}
    else{
        res.redirect('/login')
    }
    
})
router.get('/add_user_page',(req,res)=>{
    if(req.session.userRole == 2){
        res.render('add_user_page');
	}
    else{
        res.redirect('/login')
    }
})

router.post("/new_user",(req,res)=>{
    console.log(req.body);
    var new_user = new User(req.body)
    new_user.save((err,collection)=>{
        if(err){
            return res.send(err)
          }
          else{
            res.send(new_user.username + " has been added")
            console.log('create succedded')
          }
    })
})

module.exports = router