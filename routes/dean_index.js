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

// Call Youtube video IDs getter
var idGetter = require('../functions/youtubeID')
// For posting
router.post('/dean_index', upload.single("postImage"), (req , res)=>{
    // Get post body
    var postData = {
		title: req.body.title,
		description: req.body.description,
        url_video: idGetter.ybgetID(req.body.url_video),
		post_img: req.file
	};

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

    // Push the created post IDs to User posts collection
    User.findOneAndUpdate({_id: req.session.userId}, {$push: {posts: new_post._id}}, function(err, result){
    })
    // Before sending back the data, bind in user_id, username
    Profile.findOne({deanID: req.session.userId}).then(function(profile){
        postData.username = profile.displayname
        postData.img = profile.imageurl

       // Send data back to AJAX to add it without page reload
        postData.postID = new_post._id
        res.send(postData)

    })
})

//========================== Comment posting on dean side ==============================
router.post('/comment_dean', (req, res) => {
    // Get image and displayname from Profile
    Profile.findOne({deanID: req.session.userId}).then(function(data){

        var postData = {
            post_id: req.body.post_id,
            content: req.body.comment
        };
    
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

// ============================= Dean side comment delete =============================
router.post('/deleteComment_dean', (req, res) => {
    var comment_id = req.body.comment_id

    // Find comment with defined comment_id to seek for displayname
    Comment.findOne({_id: comment_id}).then((comment) => {
        // Search displayname in Profile
        Profile.findOne({displayname: comment.displayname}).then((profile) => {
            console.log(profile)
            if(profile.deanID == req.session.userId){
                Comment.deleteOne({_id: comment_id}, (err, data) => {
                    if(err) console.log(err)
                    else{
                        res.send(data)
                    }
                })
            }
        
        })
    })
})
module.exports = router