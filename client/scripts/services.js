var services = angular.module('myApp.services', []);

services.factory('modal', function($rootScope) {
  return {
    showModal: function(dream) {
      $rootScope.modal = {};
      $rootScope.modal.text = dream.text;
      $rootScope.modal.background = dream.background;
      $rootScope.modal.font = dream.font;
      $('#dreamModal').modal('show');
    }
  };
});

services.factory('getDreams', function($http) {
  return {
    otherDreams: function(username) {
      return $http({
        method: 'GET',
        url: '/ajax/dreams?username='+username
      });
    },
    myDreams: function(username) {
      return $http({
        method: 'GET',
        url: '/ajax/personal/'+username
      })
    },
    postDream: function(username, dream) {

      return $http.post('/links', dream);
    }

  }
});