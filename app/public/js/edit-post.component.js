(function() {
  'use strict'

  angular.module('app')
    .component('editPost', {
      controller: EditController,
      templateUrl: '../edit-post/edit-post.template.html'
    })

    EditController.$inject = ['$http', '$state', '$stateParams']
    function EditController($http, $state, $stateParams) {
      const vm = this;

      vm.$onInit = function() {
        $http.get('/api/posts/' + $stateParams.id)
        .then(function(res) {
          vm.post = res.data;
        })
      }

      vm.editPost = function() {
        console.log(vm.post)
        $http.patch('/api/posts/' + vm.post.id, vm.post)
        .then(function(res) {
          console.log(res);
          $state.go('home')
        })
      }
    }
}());
