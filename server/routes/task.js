var express = require('express');
var pg = require('pg');
var connectionString = require('../db/connection.js').connectionString;

var router = express.Router();
//works til here
router.post('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log('Error posting task', err);
      response.sendStatus(500);
    } else {
      var taskResults = [];

      var task_name = request.body.task_name;
      var task_status = false;

      var query = client.query('INSERT INTO tasks (task_name, task_status) VALUES ($1, $2)' +
    'RETURNING task_name, task_status;', [task_name, task_status]);



      query.on('row', function(row){
        taskResults.push(row);
      });//query.on('row')

      query.on('end', function(){
        done();
        response.send(taskResults);
      });//query.on('end')

      query.on('error', function(err){
        console.log('error at query.on(error)', err);
        done();
        response.status(500).send(err);
      });//query.on('error')

    }//else
  });//pg.connect
});//router.post

router.get('/', function(request, response){
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var taskResults = [];
      var query = client.query('SELECT * FROM tasks');

      query.on('error', function(err){
        console.log('Error fetching tasks', err);
        response.sendStatus(500);
        process.exit(1);
      });//query.on('error')

      query.on('row', function(row){
        taskResults.push(row);
      });//query.on('row')

      query.on('end', function(){
        console.log('successfully GOT tasks!');
        done();
        response.send(taskResults);
      });//query.on('end')

    }//else
  });//pg.connect
});//router.get

router.put('/:id', function(request, response){
  var requestedID = request.params.id;
  //var 'something else'?

  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      var taskResults = [];
      var query = client.query('UPDATE tasks SET task_status = true WHERE id = ' + requestedID + ' RETURNING *;');

      query.on('error', function(err){
        console.log('Error updating completion status.', err);
        response.sendStatus(500);
        process.exit(1);
      });//query.on('error')

      query.on('row', function(row){
        taskResults.push(row);
      });//query.on('row')

      query.on('end', function(){
        console.log('successfully updated completion status!');
        done();
        response.send(taskResults);
      });//query.on('end')

    }//else
  });//pg.connect
});//router.put

router.delete('/:id', function(request, response){
  var requestedID = request.params.id;

  pg.connect(connectionString, function(err, client, done){
    if(err) {
      console.log(err);
      response.sendStatus(500);
    } else {
      var taskResults = [];
      var query = client.query('DELETE FROM tasks WHERE id = ' + requestedID+ ';');

      query.on('error', function(err){
        console.log('Error deleting task', err);
        response.sendStatus(500);
        // process.exit(1);
      });//query.on('error')

      query.on('row', function(row){
        taskResults.push(row);
      });//query.on('row')

      query.on('end', function(){
        console.log('successfully deleted task');
        done();
        response.send(taskResults);
      });


    }//else
  });//pg.connect


});//router.delete








//
module.exports = router;
