// Students can change the way their account var express = require('express')
var express = require('express')
var router = express.Router()
var check_session = require('../functions/check_session')

router.use(express.static("views"))

router.get('/proSet', (req, res) => {
    if(check_session(req) == 1 || check_session(req) == 0){
        res.render('profile-account-setting')
    }
    else{
        res.redirect('/login')
    }
})

module.exports = router