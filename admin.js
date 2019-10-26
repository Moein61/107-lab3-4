var serverURL = "http://restclass.azurewebsites.net";
var serverURL = "http://localhost:8080";


function item(code, title, price, description, category, rating, image){

    this.code=code;
    this.title=title;
    this.price=price;
    this.description=description;
    this.category=category;
    this.rating=rating;
    this.image=image;
    this.user="Moein";

}

function clearForm(){
    $("#txtCode").val("");
    $("#txtTitle").val("");
    $("#txtPrice").val("");
    $("#txtDescription").val("");
    $("#txtCategory").val("");
    $("#txtRating").val("");
    $("#txtImage").val("");

}

function saveItem(){
    var code= $("#txtCode").val();
    var title= $("#txtTitle").val();
    var price= $("#txtPrice").val();
    var description= $("#txtDescription").val();
    var category= $("#txtCategory").val();
    var rating= $("#txtRating").val();
    var image= $("#txtImage").val();

    var test= new item(code, title, price, description, category, rating, image);
    console.log(test);  
    
    $.ajax({
        url: serverURL + "/api/products",
        type:"POST",
        contentType:"application/json",
        data: JSON.stringify(test),
        success: function(response){
            
            
            console.log("Data Saved, Server responded with", response);
            clearForm();
            $("#alert").removeClass("hide");
            setTimeout(function(){
                $("#alert").addClass("hide");
            } , 4000);
        },

        error: function (details){
             
            console.log("Error, somthing went wrong", details);
        }
    });

}


function getmessagefromserver(){

    $.ajax({
        url:  "/api/message",
        type: "GET",
        success: function (res){
            console.log("server responded OK", res);
              for (var i=0; i<res.length; i++){
                var theMsg=res[i];
                if (theMsg.user=="moein"){
                   // message.push(theMsg.name, theMsg.email);
                   $('.message').append(`<h3>${theMsg.name}</h3>`);
                   $('.message').append(`<h6>${theMsg.email}</h6>`);
                   $('.message').append(`<p>${theMsg.message}</p>`);


                }
            }
            

        },
        error: function (error){
            console.log("Error on request", error);
        }
    });
}

function solveHomework(){
    var data=[
        {age:99,
           name: "Sergio",
           color: 'gray'
           },
        {age:23,
           name: "John",
           color: 'blue'
           },
        {age:16,
            name: "Alice",
            color: 'Pink'
           },
        {age:87,
            name: "Robert",
            color: 'gray'
           },
        {age:16,
            name: "Sheldon",
            color: 'black'
           },  
        {age:45,
            name: "Will",
            color: 'green'
           }, 
        {age:16,
            name: "Kevin",
            color: 'yellow'
           }, 
        {age:37,
            name: "Liz",
            color: 'Pink'
           },   
        {age:99,
            name: "Noah",
            color: 'white'
           },  
        {age:31,
            name: "Alfredo",
            color: 'white'
           },
        {age:74,
            name: "Rhenard",
            color: 'green'
           },
        {age:39,
            name: "Myk",
            color: 'blue'
           }   
    ];

    var maxName=[];
    var minName=[];

    var maxAge=data[0].age;
    var minAge=data[0].age;
    var totalAge=0;
    for (var i=0; i<data.length; i++){ 
        if (data[i].age >= maxAge){
            maxAge=data[i].age;

            
        }
        else{ if (data[i].age< minAge){
            minAge=data[i].age;
            
        }}


        totalAge += data[i].age;

    }
    
    for (var j=0; j<data.length; j++){
        var person=data[j];
        if (person.age==maxAge){
            maxName.push(person.name);
        }
        else{
            if (person.age==minAge){
                minName.push(person.name);
            }
        }
    }
    console.log("oldest person/s: " + maxName + " with age of " + maxAge + " youngest person/s: "+ minName + " with age of "+ minAge + " and sum of all ages is: " + totalAge);
}



function search(){
    var txtSearch=$("#txtSearch").val();
    console.log(txtSearch); 

}



function init(){

    $('#btnSave').click(saveItem);
    $("#btnSearch").click(search);
    
    solveHomework();
    getmessagefromserver();
}


window.onload = init;