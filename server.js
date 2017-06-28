// server.js


// BASE SETUP

// =================================================================================


// call the packages


var express = require('express');
var app =  express();
var bodyParser = require('body-parser');
var Bear = require('./app/models/bear');
// db connection mongo


var mongoose = require('mongoose');

var dbURI = 'mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o';
mongoose.connect(dbURI);


// configure app to use bodyParser()
// this will let us get the data from a POST


app.use( bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json());

var port = process.env.PORT || 8080;     // set port 

// ROUTES FOR API 

// =====================================

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next){
     
    console.log('mayday mayday we have been hit !! :->');
    next();  // to make sure we go to the next routes and don't stop here 

});

router.get( '/', function(req, res){
    
    res.json({message : 'Horaay ! welcome to our API'});
});

router.route('/bears')
 
   // create a bear (accessed at POST http://localhost:8080/api/bears)
    
    .post(function(req, res){
          
            console.log("hot ");

         var bear = new Bear();   // create instance of bear model

            bear.name = req.body.name;


            //save the bear and check for errors

           bear.save(function(err){
                if(err) 
                    res.send(err);

                res.json({message : 'Bear created'});

           });  

    })
           
// get all the bears (access at GET  http://localhost:8080/api/bears)

     .get( function(reg, res){
 
          Bear.find( function(err, bears){
                  if(err)

                      res.send(err);
                
                      res.json(bears);

          });

     });




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);



// START THE SERVER
// ====================================================================

app.listen(port);
console.log('Magic happens on port ' + port);


mongoose.connection.on('connected', function(){
    console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});
