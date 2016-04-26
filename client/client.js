var app = angular.module('todoApp', []);

app.controller('TodoController', ['$http' '$uibModal', function($http, $uibModal){
  var vm = this;
  vm.tasks = [];
  vm.task = {};
  // vm.id = vm.task.id;

  vm.submitTask = function(){
    $http.post('/task', vm.task).then(function(serverResponse){
      console.log(serverResponse);
      console.log('submitTask function going through');
      vm.getTasks();
    });
  };//vm.submitTask()

  vm.getTasks = function(){
    $http.get('/task').then(function(response){
      console.log(response);
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




  // vm.items = []
  //
  // vm.open = function(){
  //   var modalInstance = $uibModal.open(
  //     templateUrl: 'myModalContent.html',
  //     controller: 'modalInstanceCtrl',
  //     resolve: {
  //       items:
  //     }
  //   )
  //
  // }




  // vm.deleteTask = function(){
  //   $("#delete").on("click", function(){
  //     $http.delete('/task/' + vm.id);
  //     vm.getTasks();
  //   });
  // };




  vm.getTasks();


}]);//app.controller
