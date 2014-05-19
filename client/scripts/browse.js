var browse = angular.module('myApp.browse', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'firebase']);

browse.controller('BrowseC', function($scope, $state, $rootScope, $firebase) {  
  $scope.username = $rootScope.user || 'test2';
  $scope.browseDreams = [];
  
  $scope.showDream = function() {
    var length = $scope.browseDreams.length;
    var randomIndex = Math.floor(Math.random()*length);
    $scope.visibleDream = $scope.browseDreams[randomIndex];
  };

  var refDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/dreams");
  refDreams.on('value', function(snapshot) {
    var allDreams = snapshot.val();
    _.each(snapshot.val(), function(dream) {
      if (dream.username !== $scope.username) {
        $scope.browseDreams.push(dream);
      }
    })
    $scope.showDream();
  });

});

