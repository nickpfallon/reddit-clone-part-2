(function() {
  'use strict'

  angular.module('app')
    .component('posts', {
      controller: controller,
      templateUrl: `../posts/posts.template.html`
    })

  controller.$inject = ['$http']
  function controller($http) {
    const vm = this;

    vm.orderBySelected = ['-vote_count', 'title']

    vm.$onInit = function () {
      vm.postForm = false;
      $http.get('/api/posts').then(function(res) {
        vm.posts = res.data;
      })
    }

    vm.addPost = function() {
        vm.post.vote_count = 0;
        vm.post.created_at = new Date();
        vm.post.comments = [];
        $http.post('/api/posts', vm.post)
        .then(function(res) {
          vm.posts.push(res.data);
        })
        vm.postForm = false;
        delete vm.post;
    }

    vm.addComment = function(e, post, comment) {
      console.log(post.id);
      $http.post('/api/posts/' + post.id + '/comments', {content: comment})
      .then(function(res) {
        vm.posts[vm.posts.indexOf(post)].comments.push(res.data)
      })
      // console.log(post.comments)
      //
      // console.log(comment)
    }

    vm.showAddPost = function() {
      if (!vm.postForm) {
        vm.postForm = true
      } else {
        vm.postForm = false
      }
    }

    vm.showComments = function(post) {
      if (!vm.posts[vm.posts.indexOf(post)].showComment) {
        vm.posts[vm.posts.indexOf(post)].showComment = true
      } else {
        vm.posts[vm.posts.indexOf(post)].showComment = false
      }
    }

    vm.upVote = function(e, post) {
      $http.post('api/posts/' + post.id + '/votes', vm.post)
      .then(function(res) {
        vm.posts[vm.posts.indexOf(post)].vote_count++;
      })
    }

    vm.downVote = function(e, post) {
      $http.delete('api/posts/' + post.id + '/votes', vm.post)
      .then(function(res) {
        vm.posts[vm.posts.indexOf(post)].vote_count--;
      })
    }
  }

}());
