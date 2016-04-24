var express = require('express');
var bodyParser = require('body-parser');

var initializeDB = require('./db/connection.js').initializeDB;
var indexRouter = require('./routes/index.js');


var app = express();

app.use(bodyParser.json());
app.use(express.static('server/public'));

app.use('/', indexRouter);



initializeDB();


var server = app.listen(process.env.PORT || 3000, function(){
  var port = server.address().port;
  console.log('Server listening on port:', port + '. Press ctrl-c to stop.');
});
