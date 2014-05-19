var inspirations = angular.module('myApp.inspirations', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'firebase']);

inspirations.controller('InspireC', function($scope, $state, $rootScope, $firebase) {  
  $scope.username = $rootScope.user || 'test2';
  $scope.popularDreams = [];
  var refDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/dreams");
  refDreams.on('value', function(snapshot) {
    var allDreams = snapshot.val();
    _.each(allDreams, function(dream) {
      if (dream.username !== $scope.username) {
        $scope.popularDreams.push(dream);
      }
    })
  })
  
  
})

