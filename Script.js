
var items = [];
var serverURL = "http://restclass.azurewebsites.net";
var serverURL = "http://localhost:8080";

function getcatalogfromserver(){

    $.ajax({
        url: serverURL + "/API/products",
        type: "GET",
        success: function (res){
            console.log("server responded OK", res);
            for (var i=0; i<res.length; i++){
                var theItem=res[i];
                if (theItem.user=="Moein"){
                    items.push(theItem);
                }
            }
            
            displaycatalog();

        },
        error: function (error){
            console.log("Error on request", error);
        }
    });
}
    


function displaycatalog(){

    for (var j=0; j<items.length; j++){
        var product=items[j];
        displayItem(product);

    }

}

function displayItem(product) {
    var playout = `<div class="item">
    <img src='${product.image}'>
    <h4>${product.title}</h4>
    <h5 class="price">$${product.price}</h5>
    <h6>${product.description}</h6>
    <h6>${product.category}</h6>
    <h6>${product.rating}</h6>
    <button id="itembtn" class="btn btn-sm btn-info">Add to Card</button>

    </div>
    `  
    $('#catalog').append(playout);

}

function search(){
    var text=$("#txtSearch").val();

    $("#catalog").html("");

    for(var i=0; i<items.length; i++){

        var merch=items[i];

        if (merch.title.toLowerCase().includes(text.toLowerCase()) 
        || merch.category.toLowerCase().includes(text.toLowerCase()) 
        || merch.price.toLowerCase().includes(text.toLowerCase())
        || merch.description.toLowerCase().includes(text.toLowerCase())
        || merch.rating.toLowerCase().includes(text.toLowerCase()))
        {

            displayItem(merch);

        };

    }


    

}



function init(){

    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function(e){
        if (e.key == "Enter"){
            search();
            e.preventDefault();
        }

    });


    getcatalogfromserver();


}



window.onload= init;