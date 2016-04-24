var express = require('express');
var path = require('path');
var taskRouter = require('./task');

var router = express.Router();

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.use('/task', taskRouter);




module.exports = router;
