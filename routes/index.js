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
        
                            res.render('index', {record: record, data: data, req})
                        }
        
                        getComment()
                        //res.render('index', {data: data, record: record})
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
		post_img: req.file
	};

    console.log(postData)

    var new_post = undefined
    // Handler for undefined field
    Object.keys(postData).forEach(key => postData[key] === undefined ? delete postData[key] : {});
    // Obj filter
    if(postData.post_img !== undefined){
        new_post = new Post({title: postData.title, description: postData.description, post_img: postData.post_img.path})
    }
    else{
        new_post = new Post(postData)
    }
    // Write above thing to Post
    new_post.save()

    // Input the created post IDs to User posts collection
    User.findOneAndUpdate({googleID: req.session.userId}, {$push: {posts: new_post._id}}, function(err, result){
    })
    // Before sending back the data, bind in user_id, username
    Profile.findOne({googleID: req.session.userId}).then(function(profile){
        postData.username = profile.displayname
        postData.img = profile.imageurl

       // Send data back to AJAX to add it without page reload
        postData.postID = new_post._id
        res.send(postData)

    })
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

// Show all post infor into edit post form
router.post('/editPost', (req, res) => {
    var post_id = req.body.post_id

    // console.log(post_id)
    Post.findOne({_id: post_id}).then(function(data){
        res.send(data)
    })
})

// Added submit post edit infor here 
router.post('/submitEdit', upload.single("postImage"), (req , res)=>{
    // Get post body

    var postData = {
        post_id: req.body.post_id,
		title: req.body.title,
		description: req.body.description,
        url_video: idGetter.ybgetID(req.body.url_video),
		post_img: req.file
	};

    // Store post_id 
    var post_id = postData.post_id
    // Using instant Post schema will not help because it will auto generate a new _id which will replace the original one
    // If url_video is undefined
    if(postData.url_video === undefined){
        delete postData.url_video
    }
    // If image is undefined 
    if(postData.post_img === undefined){
        delete postData.post_img
    }
    // If image is not undefined
    if(postData.post_img !== undefined){
        postData.post_img = postData.post_img.path
    }

    // Remove post_id from postData
    delete postData.post_id

    // uncomment this for postData tracking
    // console.log(postData)

    // Update post with above infor
    Post.findOneAndUpdate({_id: post_id}, postData, (err, data) => {

    })

    // Send data back to AJAX to add it without page reload
    postData.username = req.session.username
    res.send(postData)
})

// For students search bar
router.get('/search',function(req,res){

    // get user infor from User by querying email
    User.find({email: new RegExp(req.query.key, 'i')}).then(function(user){
        Profile.find({displayname: new RegExp(req.query.key, 'i'), deanID: {$ne: null}}).then(function(profile){
            
            var data = []
            for(i = 0; i < user.length; i++){
                data.push(user[i].email)
            }

            for(i = 0; i < profile.length; i++){
                data.push(profile[i].displayname)
            }

            res.send(data)
        })
        
    })
});

router.post('/comment', (req, res) => {
    // Get image and displayname from Profile
    Profile.findOne({googleID: req.session.userId}).then(function(data){

        var postData = {
            post_id: req.body.post_id,
            content: req.body.comment
        };
        console.log(postData)
    
        // Add new comment to comment collection
        var new_comment = new Comment({
            content: postData.content,
            displayname: data.displayname,
            userImage: data.imageurl
        })
    
        new_comment.save()
    
        // Add comment id to post collection 
        Post.findOneAndUpdate({_id: postData.post_id}, {$push: {comments: new_comment._id}}, function(){
    
        })  

        res.send(new_comment)
    
        // console.log(postData)
    })
})

module.exports = router