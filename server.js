var express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

var db;
const app = express();

/*connect to the remote mongo database*/
//var mongo_url = fs.readFileSync('url_mongo.txt', 'utf8');
var mongo_url = "mongodb://dev:dev9122@ds137759.mlab.com:37759/basic_crud";
MongoClient.connect(mongo_url, function(error, database){
    /*Check if a error happens*/
    if(error){
      return console.log(error);
    }

    /*storing the database instace*/
    db = database;

    /*if everything is ok start listening the port*/
    app.listen(3000, function() {
      console.log('listening on 3000')
    });
});

/*The urlencoded method within body-parser tells body-parser to extract data
 *from the <form> element and add them to the body property
 *in the request object.
 */
app.use(bodyParser.urlencoded({extended: true}));

//Initializer the aplication
app.get('/',function(request,response){
  response.sendFile(__dirname+'/index.html');
});

//Add a new contact
app.post('/addContact',function(request, response){
  db.collection('contacts').save(request.body, function(error, result){
    if(error){
      return console.log(error);
    }
    console.log('saved to database')
    response.redirect('/')

  });
});
