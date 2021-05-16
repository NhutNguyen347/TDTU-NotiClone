var express = require('express')
var router = express.Router()

router.use(express.static("views"))

router.get('/index', (req, res) => {
    if(req.session.userId){
        // For student
        if(req.session.userRole == 0){
            Profile.findOne({googleID: req.session.userId}, (err, data) => {
                if(err){
                    res.json(err)
                }
                else{
                    res.render('index', {displayName: data.displayname, class: data.class, dean: data.dean})
                }
            })
        }
        // For Dean
        else if(req.session.userRole == 1){
            res.render('index', {displayName: '', class: '', dean: ''})
        }
        
	}
    else{
        res.redirect('/login')
    }
})

module.exports = router