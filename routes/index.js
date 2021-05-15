var express = require('express')
var router = express.Router()

router.use(express.static("views"))

router.get('/index', (req, res) => {
    if(req.session.userId && (req.session.userRole == 1 || req.session.userRole == 0)){
        res.render('index')
	}
    else{
        res.redirect('/login')
    }
})

module.exports = router