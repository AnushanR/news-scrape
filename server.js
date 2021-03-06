/////////////////////////////////////////////// /* Imports */ //////////////////////////////////////////////////////////
const express = require('express'); // Server
const bodyParser = require ('body-parser'); // JSON Middleware
const logger = require('morgan'); // REST Logger
const mongoose = require('mongoose'); // MongoDB ORM
const routes = require("./routes");
let db = require("./models"); // Require all models

/////////////////////////////////////////////// /* Variables */ //////////////////////////////////////////////////////////
var PORT = process.env.PORT || 3000;
let mongooseConnection = mongoose.connection;

/////////////////////////////////////////////// /* Initialize Express */ //////////////////////////////////////////////////////////
let app = express();


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // Allows For JSON Interactions Between Client & Server
app.use(express.static("client/build")); // Serve Static React Pages
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));


mongoose.Promise = global.Promise; // Set up promises with mongoose

mongoose.connect( // Connect to the Mongo DB
  process.env.MONGODB_URI || "mongodb://heroku_82rnkmrz:iqei0fgnb7fqoq2re4nm0j1fs@ds127389.mlab.com:27389/heroku_82rnkmrz"
);

mongooseConnection.on('error', console.error.bind(console, 'connection error:'));

mongooseConnection.once('open', function() {
  console.log(`Sucessfully Connected to Mongo DB !`); // If Connection is successful, Console.log(Message)
});

var cors = require("cors");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());



app.use(routes); 



app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
