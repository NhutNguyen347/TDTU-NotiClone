var express = require('express')
var router = express.Router()

router.use(express.static("views"))

/////////////////////////////////// DEAN INDEX /////////////////////////
router.get('/dean_index' , (req , res)=>{
   if(req.session.userId && req.session.userRole == 1){
      Profile.findOne({deanID: req.session.userId}, (err, data) => {
         if(err){
             res.json(err)
         }
         else{
             // shorten dean name
             var new_dean = data.displayname
             if(new_dean.length > 20){ new_dean = new_dean.slice(0, 20).concat('...') }
             res.render('dean_index', {data: data})
         }
      })
   }
   else{
      res.redirect('/login')
   }
})

module.exports = router