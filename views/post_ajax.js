// ============================ For Students posts =================================
$(document).ready(() => {
    $("#postButton").click((event) => {
        //stop submit the form, we will post it manually.
        event.preventDefault();
        doAjax("/index");
        // auto click on close button
        $('#close-button').click()
    });
});

// =========================== For Dean noti posts =================================
$(document).ready(() => {
    $("#postButton_dean").click((event) => {
        //stop submit the form, we will post it manually.
        event.preventDefault();
        doAjax("/dean_index");
        // auto click on close button
        $('#close-button').click()
    });
});

// For re-usability of delete and edit, we need to bind post id to each posts too
function doAjax(route) {
	var form = $('#postForm')[0];
	var data = new FormData(form);
	
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: route,
        data: data,
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        cache: false,
        success: (data) => {      
            // The data got a vague reality that sometimes we dont have video_url or img or both
            $('#newPost').prepend(
                $('<div></div>').load('/load_ajax/post.ejs', function(){
                    //////////////////////// This algorithm needs to be fixed /////////////////////////////
                    // Object.keys(data).forEach((prop)=>{
                    //     if(prop == 'img'){
                    //         $('#img').html('<img alt="" src="'+data[img].path+'">')
                    //     }
                    //     else if(prop == 'url_video'){
                    //         $('#url_video').html('<iframe width="500" height="300" src="https://www.youtube.com/embed/'+data[url_video]+'" frameborder="0">')
                    //     }
                    //     $('#'+prop).text(data[prop])
                    // })
                    //////////////////////////////////////////////////////////////////////////////////////
                    
                    $(this).find('#username').text(data.username)
                    $(this).find('#main-profile-pic').attr("src", data.img)
                    $(this).find('#title').text(data.title)
                    $(this).find('#description ').html('<pre>'+data.description+'</pre>')
                    $(this).find('#commentsec-pic').attr('src', data.img)
    
                    // Bind post_id to div posty of each new post - AJAX add only
                    $(this).find('#posty_ajax').attr("post_id", data.postID)
                    // Bind post_id to Comment button
                    $(this).find('#cmtButton').attr("post_id", data.postID)
                    // Bind post_id to Comment form 
                    $(this).find('#cmtForm').attr("post_id", data.postID)
    
                    if(data.post_img !== undefined){
                        $(this).find('#img').html('<img alt="" src="'+data.post_img.path+'">')
                    }
                    if(data.url_video !== undefined){
                        $(this).find('#url_video').html('<iframe title="yb_video" width="500" height="300" src="https://www.youtube.com/embed/'+data.url_video+'" frameborder="0">')
                    }
                    
                    // Send postID to editPost and delPost value so they can identify which post to perform
                    $(this).find('#editPost').html('<a class="post-edit active" id="editLink" class="edit" href="#" title="" value="'+data.postID+'">Edit Post</a>')
                    $(this).find('#delPost').html('<a id="delLink" href="#" title="" value="'+data.postID+'">Delete Post</a>')
                }) 
            )
        },
        error: (e) => {
            $("#confirmMsg").text(e.responseText);
        }
    });
}

/////////////////////////////////// Remove posts by AJAX /////////////////////////////////////
$(document).on("click", "#delLink", function(){
    // a tag has no attr value so we should use attr() here to read it out
    var post_id = $(this).parent().find('#delLink').attr("value")

    $.ajax({
        type: "POST",
        url:'/deletePost',
        data: {post_id: post_id},
        success:function(response){
            if(response){
                // Remove the whole div contains new post 
                $('div[post_id="'+post_id+'"]').remove()
                console.log('Post deleted')
            }else{
                console.log('data cannot be deleted');
            }
        },
        error:function(response){
            console.log('Server error')
        }
    });
})

//////////////////////////////////////// Edit Post by AJAX ///////////////////////////
var post_id = undefined
$(document).on("click", "#editLink", function(){
    post_id = $(this).parent().find('#editLink').attr("value")

    $.ajax({
        type: "POST",
        url:'/editPost',
        data: {post_id: post_id},
        success:function(data){
            if(data){
                
                // Remove the whole div contains new post 
                $('#titleEdit').attr("value", data.title)
                $('#descEdit').val(data.description)
                $('#urlEdit').attr("value", "https://www.youtube.com/watch?v=" + data.url_video)
            }else{
                console.log('data cannot be deleted');
            }
        },
        error:function(data){
            console.log('Server error')
        }
    });
})

/////////////////////////////////////////////// Submit post edit result //////////////////////////////////////
$('#editForm').ready(function(){
    $('#editForm').on("click", "#editButton", function(e){
        e.preventDefault();
        var form = $('#editForm')[0];
        var data = new FormData(form);

        data.append("post_id", post_id)

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/submitEdit",
            data: data,
            processData: false, //prevent jQuery from automatically transforming the data into a query string
            contentType: false,
            cache: false,
            success: (data) => {      
                $(document).ready(function(){
                    // Change title and description from posts 
                    $('.posty[post_id="'+post_id+'"]').find('.job_descp > h3').text(data.title)
                    // Remove old pre tag to append a new one
                    $('.posty[post_id="'+post_id+'"] .job_descp pre').remove()
                    $('.posty[post_id="'+post_id+'"] .job_descp #description_p').html('<pre>'+data.description+'</pre>')
                    // This is to check if img is there or not, this is for post by ejs
                    if($('.posty[post_id="'+post_id+'"]').find('.job_descp > img').ready() && data.post_img !== undefined){
                        // Remove style of the current post without img, it will skip if there is no attr named style, kinda tidy
                        $('.posty[post_id="'+post_id+'"]').find('.job_descp > img').removeAttr("style")
                        $('.posty[post_id="'+post_id+'"]').find('.job_descp > img').attr("src", data.post_img)
                    }
                
                    // This is to check if iframe is there or not, this is for post by ejs
                    if($('.posty[post_id="'+post_id+'"]').find('.job_descp > iframe').ready() && data.url_video !== undefined){
                        // Remove style of the current post without img, it will skip if there is no attr named style, kinda tidy
                        $('.posty[post_id="'+post_id+'"]').find('.job_descp > iframe').removeAttr("style")
                        $('.posty[post_id="'+post_id+'"]').find('.job_descp > iframe').attr("src", "https://www.youtube.com/embed/" + data.url_video)
                    }
                    
                    // update img for posts posted by ajax
                    if(data.img !== undefined){
                        $('div[id=posty_ajax][post_id='+post_id+'] div[class=job_descp] div[id=img]').html('<img alt="" src="'+data.img+'"/>')
                    }

                    // update video link for posts posted by ajax
                    if(data.url_video !== undefined){
                        $('div[id=posty_ajax][post_id='+post_id+'] div[class=job_descp] div[id=url_video]').html('<iframe title="yb_video" width="500" height="300" src="https://www.youtube.com/embed/'+data.url_video+'" frameborder="0">')
                    }
                })
            },
            error: (e) => {
                $("#confirmMsg").text(e.responseText);
            }
        });
    })
})

//================================= Comment posting ================================
$('#cmtForm[post_id="'+post_id+'"]').ready(function(){
    $(this).on('click', '#cmtButton', function(e){
        
        post_id = $(this).parent().find('#cmtButton').attr("post_id")
    
        var form = $('#cmtForm[post_id="'+post_id+'"]')[0];
        var data = new FormData(form);
        
        console.log(form)
        data.append("post_id", post_id)

        $.ajax({
            type: "POST",
            url: "/comment",
            data: {post_id: data.get("post_id"), comment: data.get("comment")},
            success: (data) => {
                html = `
                    <div class="comment-list" comment_id="${data._id}">
                        <div class="bg-img">
                            <img style="width: 40px; height: 40px;" src="${data.userImage}" alt="">
                        </div>
                        <div class="comment">
                            <h3>${data.displayname}</h3>
                            <p>${data.content}</p>
                        </div>
                        <div class="ed-opts">
                            <a href="#" title="" class="ed-opts-open"><i class="la la-ellipsis-v"></i></a>
                            <ul class="ed-options" style="width: 130px;">
                                <li><a id="delComment" href="#" value="${data._id}" title="">Delete</a></li>
                            </ul>
                        </div>
                    </div><!--comment-list end-->
                `
                $('.posty[post_id='+post_id+'] .comment-sec ul li').append(
                    $('<div></div>').html(html)
                )
            }
        })

        e.preventDefault()
    })
})  

// ================================ Comment posting for dean side ==================
$('#cmtForm[post_id="'+post_id+'"]').ready(function(){
    $(this).on('click', '#cmtButton_dean', function(e){
        
        post_id = $(this).parent().find('#cmtButton_dean').attr("post_id")
    
        var form = $('#cmtForm[post_id="'+post_id+'"]')[0];
        var data = new FormData(form);
        
        console.log(form)
        data.append("post_id", post_id)

        $.ajax({
            type: "POST",
            url: "/comment_dean",
            data: {post_id: data.get("post_id"), comment: data.get("comment")},
            success: (data) => {
                html = `
                    <div class="comment-list" comment_id="${data._id}">
                        <div class="bg-img">
                            <img style="width: 40px; height: 40px;" src="${data.userImage}" alt="">
                        </div>
                        <div class="comment">
                            <h3>${data.displayname}</h3>
                            <p>${data.content}</p>
                        </div>
                        <div class="ed-opts">
                            <a href="#" title="" class="ed-opts-open"><i class="la la-ellipsis-v"></i></a>
                            <ul class="ed-options" style="width: 130px;">
                                <li><a id="delComment" href="#" value="${data._id}" title="">Delete</a></li>
                            </ul>
                        </div>
                    </div><!--comment-list end-->
                `
                $('.posty[post_id='+post_id+'] .comment-sec ul li').append(
                    $('<div></div>').html(html)
                )
            }
        })

        e.preventDefault()
    })
})  


//================================= Comment delete ================================
$(document).on("click", "#delComment", function(e){
    e.preventDefault()
    
    comment_id = $(this).parent().find('#delComment').attr("value")

    $.ajax({
        type: "POST",
        url: "/deleteComment",
        data: {comment_id: comment_id},
        success: (data) => {      
            if(data){
                // Remove the whole div contains new post 
                $('div[comment_id="'+comment_id+'"]').remove()
            }else{
                console.log('data cannot be deleted');
            }
        },
        error: (e) => {
            console.log('Error')
        }
    });
})

//================================= Comment delete on dean side ================================
$(document).on("click", "#delComment_dean", function(e){
    e.preventDefault()
    
    comment_id = $(this).parent().find('#delComment_dean').attr("value")
    
    $.ajax({
        type: "POST",
        url: "/deleteComment_dean",
        data: {comment_id: comment_id},
        success: (data) => {      
            if(data){
                // Remove the whole div contains new post 
                $('div[comment_id="'+comment_id+'"]').remove()
            }else{
                console.log('data cannot be deleted');
            }
        },
        error: (e) => {
            console.log('Error')
        }
    });
})
