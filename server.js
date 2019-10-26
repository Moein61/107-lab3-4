var http=require("http");
var express=require("express");

var app=express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var bodyParser = require("body-parser");

app.use(bodyParser.json());

//to serve HTML content

var ejs = require('ejs');
app.set('views', __dirname + '/public');
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

//to server static files

app.use(express.static(__dirname + '/public'));

//mongoose connection

var mongoose= require("mongoose");
mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
);
var db=mongoose.connection;

//Db object constructor

var ItemDB;
var messageDB;

//web server functinality


app.get("/", function(req, res){
    res.render("index.html");
});

app.get("/contact", function(req, res){
    res.render("contact.html");
});

app.get('/catalog', function (req, res){
    res.render('index.html');
})

app.get('/admin', function (req, res){
    res.render('admin.html' );
})

app.get("/about", function(req, res){
    res.send("Moein");
});




/**
 * 
 * API functionality
 * 
 */

var items=[];

app.get("/api/products", function(req, res){
    console.log("user wants the catalog");
    
    ItemDB.find({}, function (error, data) {
        if (error){
            console.log('**Error on retrieving', error);
            res.status(500);
            res.send(error);
        }
        res.status(200);
        res.json(data);
    });

});

app.get("/api/products/:user", function(req, res){
    var name = req.params.user;
    
    ItemDB.find({user: name}, function (error, data) {
        if (error){
            console.log('**Error on retrieving', error);
            res.status(500);
            res.send(error);
        }
        res.status(200);
        res.json(data);
    });

});

app.get("/api/message", function(req, res){
    console.log("user wants the message");
    
    messageDB.find({}, function (error, data) {
        if (error){
            console.log('**Error on retrieving', error);
            res.status(500);
            res.send(error);
        }
        res.status(200);
        res.json(data);
    });

});

app.get('/api/message/:user', function(req, res){
    var userName = req.params.user;
    
    messageDB.find({ user: userName }, function (error, data) {
        if (error){
            console.log('**Error on retrieving', error);
            res.status(500);
            res.send(error);
        }
        res.status(200);
        res.json(data);
    })

});

app.post("/api/products", function(req, res){

    var item= req.body;
    

    //create a DB object

   var itemForMongo = ItemDB(item); 

    itemForMongo.save(function(error, savedItem){
        if(error){
            console.log("**Error saving item to DB", error);
            res.status(500);
            res.send(error);
        }
        console.log ("the item is saved");
        res.status(201);
        res.json(savedItem);
    });

    

    //items.push(item);

    //res.send("OK");
})

app.post("/api/message", function(req, res){

    var msg= req.body;
    

    //create a DB object

   var msgForMongo = messageDB(msg); 

    msgForMongo.save(function(error, savedmsg){
        if(error){
           console.log("**Error saving message to DB", error);
           res.status(500);
           res.send(error);
        }
        console.log ("the message is saved");
        res.status(201);
        res.json(savedmsg);
    });

}); 


//catch error on connection too mogoose

db.on("error", function(error){
    console.log ("***Error connection");
}) ;

db.on('open', function(){
   console.log('yeei the DB its alive');
   //define schema for the collection (table)

   var itemsSchema = mongoose.Schema({

    code: String,
    title: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    image: String,
    user: String
   });

   var messageSchema = mongoose.Schema({
       name: String,
       email: String,
       message: String,
       user: String
   });

   //create constructor(s) for the schema)

   ItemDB = mongoose.model("itemsCH5", itemsSchema);
   messageDB=mongoose.model("messageCH5", messageSchema);


});

app.listen(8080, function (){

    console.log("server running at http://localhost:8080");

});