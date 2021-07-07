var express = require('express')
var router = express.Router()

router.use(express.static("views"))

router.get('/profile', (req, res) => {

    // Check session 
    if(!req.session.userId){
        res.redirect('/login')
    }
    else{
        // Check if query string is undefined or not
        if(req.query.search === undefined || req.query.search.length == 0){
            res.redirect('/index')
        }
        else{   
            User.findOne({email: req.query.search}).then(function(data){

                // Handle data is null when search for dean name
                if(data == null){
                    // If it is null, it means we will query just that displayname for dean
                    Profile.findOne({displayname: req.query.search}).then(function(dean_profile){
                        // get deanID from dean to search it in user to get posts
                        var deanID = dean_profile.deanID
                        // Search dean infor in User
                        User.findOne({_id: deanID}).then(function(dean){
                            // Binds posts ids from User to an array
                            var postIds = []
                            postIds = dean.posts
                            
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
                                    
                                    res.render('user-profile', {data: dean_profile, record: record, req})
                                    //res.render('index', {record: record, data: data, req})
                                }
                
                                getComment()
                                
                            })
                        })
                        
                    })
                }

                else{
                    // Get user ID
                    var user_id = data.googleID
        
                    // User id to search profile
                    Profile.findOne({googleID: user_id}).then(function(profile){
                        // Binds posts ids from User to an array
                        var postIds = []
                        postIds = data.posts
                        
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
                                
                                res.render('user-profile', {data: profile, record: record, req})
                                //res.render('index', {record: record, data: data, req})
                            }
            
                            getComment()
                            
                        })
                        
                    })
                }
                
            })
        }
        
        
    }
})

router.post('/deleteComment', (req, res) => {
    var comment_id = req.body.comment_id

    // Find comment with defined comment_id to seek for displayname
    Comment.findOne({_id: comment_id}).then((comment) => {
        // Search displayname in Profile
        Profile.findOne({displayname: comment.displayname}).then((profile) => {
            if(profile.googleID == req.session.userId){
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