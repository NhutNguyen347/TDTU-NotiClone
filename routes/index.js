var express = require('express')
var router = express.Router()

router.use(express.static("views"))

/////////////////////////////////// STUDENT(USER) IDNEX //////////////////////////////////////
router.get('/index', (req, res) => {
    if(req.session.userId){
        // For student
        if(req.session.userRole == 0){
            Profile.findOne({googleID: req.session.userId}, (err, data) => {
                if(err){
                    res.json(err)
                }
                else{
                    // shorten dean name
                    if(data.dean.length > 20){ data.dean = data.dean.slice(0, 20).concat('...') }
                    res.render('index', {data: data})
                }
            })
        }
        // For Dean
        else if(req.session.userRole == 1){
            res.redirect('/dean_index')
        }
        
	}
    else{
        res.redirect('/login')
    }
})

module.exports = router