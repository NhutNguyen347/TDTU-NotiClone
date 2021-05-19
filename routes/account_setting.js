// Students can change the way their account var express = require('express')
var express = require('express')
var router = express.Router()
var check_session = require('../functions/check_session')
var bodyParser = require('body-parser')
// For Profile picture upload
var multer = require('multer')

const cloudinary = require('cloudinary').v2
 
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "UserPictures",
        allowedFormats: ["jpg", "png"],
        transformation: [{
            width: 500,
            height: 500,
            crop: "limit"
        }]
    }
})
// Image Storing
var upload = multer({storage: storage})
// End of profile picture upload

router.use(express.static("views"))

router.get('/proSet', (req, res) => {
    if(check_session(req) == 1 || check_session(req) == 0){
        Profile.findOne({googleID: req.session.userId}, (err, data) => {
            if(err){
                res.render('profile-account-setting', {displayName: '', class: '', dean: '', profilePic: ''})
            }
            else{
                res.render('profile-account-setting', {data: data})
            }
        })
    }
    else{
        res.redirect('/login')
    }
})

// Add upload profile image here
router.post('/proSet', upload.single('profilePicture'), (req, res, next) => {
    var infor = req.body
    var image = req.file

    const filter = {googleID: req.session.userId};
    // We should get event by Jquery on which input value the user just changed but it is more complex, I will cover it later
    
    // If user decides not to update his profile pic, we will update imageurl
    const update_query = { displayname: infor.displayName, class: infor.class, dean: infor.dean}

    if(image != undefined){
        update_query.imageurl = image.path
    }

    // update function
    Profile.updateOne(filter, update_query, (err,result) => {
        if (err) {
            console.log(err);
        } 
        else {
            res.redirect('/index')
        }
    });
})

module.exports = router