var express = require('express')
var router = express.Router()

router.use(express.static("views"))


//Cloudinary storage config
const { CloudinaryStorage } = require('multer-storage-cloudinary');
var bodyParser = require('body-parser')
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "PostImage",
        allowedFormats: ["jpg", "png"],
        transformation: [{
            width: 500,
            height: 500,
            crop: "limit"
        }]
    }
})

const upload = multer({ storage: storage });

/////////////////////////////////// DEAN INDEX /////////////////////////
router.get('/dean_index' , (req , res)=>{
   if(req.session.userId && req.session.userRole == 1){
       // Extract Profile infor from profiles to attach them to index page
       Profile.findOne({deanID: req.session.userId}).then(function(data){
            // shorten dean name
            var new_dean = data.displayname
            if(new_dean.length > 20){ new_dean = new_dean.slice(0, 20).concat('...') }
            
            //Get record of post from username
            User.findOne({_id: req.session.userId}).then(function(user){

                console.log(user)
                // Binds posts ids from User to an array
                var postIds = []
                postIds = user.posts
                
                // Initialize record of posts
                var record = []
                // Added sort here to sort by createdAt in decending order
                // Now sort by which post was lastly updated
                Post.find({_id: postIds}).sort({updatedAt:-1}).then(function(posts){
                    record = posts

                    async function getComment(){

                        for(let i = 0; i < record.length; i++){
                            for(let j = 0; j < record[i].comments.length; j++){
                                let comment = await Comment.findOne({_id: record[i].comments[j]}).exec()

                                record[i].comments[j] = comment

                            }
                        }

                        res.render('dean_index', {record: record, data: data, req})
                    }

                    getComment()
                    //res.render('index', {data: data, record: record})
                })
            })
        })
   }
   else{
      res.redirect('/login')
   }
})

module.exports = router