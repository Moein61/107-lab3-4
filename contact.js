function saveMessage() {

    //read data

    var name=$('#txtName').val();
    var email=$('#txtEmail').val();
    var message=$('#txtMessage').val();

    // create an object

    var msg= {
        name: name,
        email: email,
        message: message,
        user: 'moein'
    }; 

    //send the object to back end 
    $.ajax({
        url: "/api/message",
        type:"POST",
        data: JSON.stringify(msg),
        contentType:"application/json",
        success: function(response){
            
            
            console.log("Data Saved, Server responded with", response);
            
        },

        error: function (details){
             
            console.log("Error, somthing went wrong", details);
        }
    });


}



function init(){
console.log('test is ok' );
$('#btnSend').click(saveMessage);
}

window.onload =init; 
