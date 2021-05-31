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

/////////////////////////////////// STUDENT(USER) INDEX //////////////////////////////////////
router.get('/index', (req, res) => {
    // console.log(req.session)
    if(req.session.userId){
        // For student
        if(req.session.userRole == 0){
            // Extract Profile infor from profiles to attach them to index page
            Profile.findOne({googleID: req.session.userId}).then(function(data){
                // shorten dean name
                if(data.dean.length > 20){ data.dean = data.dean.slice(0, 20).concat('...') }
                
                //Get record of post from username
                User.findOne({googleID: req.session.userId}).then(function(user){
                    // Binds posts ids from User to an array
                    var postIds = []
                    postIds = user.posts
                    
                    // Initialize record of posts
                    var record = []
                    // Added sort here to sort by createdAt in decending order
                    Post.find({_id: postIds}).sort({createdAt:-1}).then(function(posts){
                        record = posts
                        res.render('index', {data: data, record: record})
                    })
                })
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

// Call Youtube video IDs getter
var idGetter = require('../functions/youtubeID')
// For posting
router.post('/index', upload.single("postImage"), (req , res)=>{
    // Get post body
    var postData = {
		title: req.body.title,
		description: req.body.description,
        url_video: idGetter.ybgetID(req.body.url_video),
		img: req.file
	};

    var new_post = undefined
    // Handler for undefined field
    Object.keys(postData).forEach(key => postData[key] === undefined ? delete postData[key] : {});
    // Obj filter
    if(postData.img !== undefined){
        new_post = new Post({title: postData.title, description: postData.description, img: postData.img.path})
    }
    else{
        new_post = new Post(postData)
    }
    // Write above thing to Post
    new_post.save()

    // Input the created post IDs to User posts collection
    User.findOneAndUpdate({googleID: req.session.userId}, {$push: {posts: new_post._id}}, function(err, result){
    })

    // Send data back to AJAX to add it without page reload
    postData.username = req.session.username
    postData.postID = new_post._id
    res.send(postData)
})

router.post('/deletePost', (req, res) => {
    var body = req.body

    Post.deleteOne({_id: body.post_id}, (err, data) => {
        if(err) console.log(err)
        else{
            res.send(data)
        }
    })
})

router.post('/editPost', (req, res) => {
    var post_id = req.body.post_id

    // console.log(post_id)
    Post.findOne({_id: post_id}).then(function(data){
        res.send(data)
    })
})

router.post('/submitEdit' , (req , res)=>{

    console.log(req.body.title)

})

module.exports = router