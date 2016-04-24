var app = angular.module('todoApp', []);

app.controller('TodoController', ['$http', function($http){
  var vm = this;
  vm.tasks = [];
  vm.task = {};

  vm.submitTask = function(){
    $http.post('/task', vm.task).then(function(serverResponse){
      console.log(serverResponse);
      console.log('submitTask function going through');
      vm.getTasks();
    });
  };//vm.submitTask()

  vm.getTasks = function(){
    $http.get('/task').then(function(response){
      vm.tasks = response.data;
    });
  };//vm.getTasks()

  vm.changeStatus = function(task){
    $http.put('/task/' + task.id);
      vm.getTasks();
  };//vm.changeStatus()

  vm.deleteTask = function(task){
    $http.delete('/task/' + task.id);
    vm.getTasks();
  };//vm.deleteTask()




  vm.getTasks();


}]);//app.controller
