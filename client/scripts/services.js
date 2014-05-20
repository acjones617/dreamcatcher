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
})