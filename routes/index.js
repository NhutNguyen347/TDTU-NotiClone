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
                    console.log(data)
                    // shorten dean name
                    var new_dean = data.dean
                    if(new_dean.length > 20){ new_dean = new_dean.slice(0, 20).concat('...') }
                    res.render('index', {displayName: data.displayname, class: data.class, dean: new_dean})
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