var pg = require('pg');

var connectionString;

if(process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/SQL-TodoList';
};

function initializeDB() {
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connectionString:', connectionString);
      console.log('Error connecting to DB', err);
      process.exit(1);
    } else {
      var query = client.query('CREATE TABLE IF NOT EXISTS tasks' +
        '(id SERIAL PRIMARY KEY,' +
        'task_name varchar(255) NOT NULL,' +
        'task_status BOOLEAN'+
        ');');

        query.on('end', function(){
          console.log('Schema created successfully!');
          done();
        });

        query.on('error', function(){
          console.log('Schema creation failed.');
          process.exit(1);
        });



    }//else
  });//pg.connect
};//initializeDB


module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
