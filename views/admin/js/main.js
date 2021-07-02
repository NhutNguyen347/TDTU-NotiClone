// Remove buttons for Admin addDean page
$(document).on('click', '#delDean', function(event){

    $.ajax({
        type: "POST",
        url:'/delDean',
        data: {deanID: $(this).attr('deanID')},
        success:function(data){
            if(data == "Fine"){
                location.reload()
            }
        },
        error:function(data){
            console.log('Server error')
        }
    });
})