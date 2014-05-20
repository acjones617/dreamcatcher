var browse = angular.module('myApp.browse', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'firebase']);

browse.controller('BrowseC', function($scope, $state, $rootScope, $firebase) {  
  $scope.username = $rootScope.user.username || 'test2';
  $scope.browseDreams = [];
  
  $scope.showDream = function() {
    console.log($scope.browseDreams);
    var length = $scope.browseDreams.length;
    var randomIndex = Math.floor(Math.random()*length);
    $scope.visibleDream = $scope.browseDreams[randomIndex];
  };

  $scope.encourageDream = function() {
    $scope.visibleDream.encouragement += 1;
  }

  $scope.sendMessage = function() {
    //$scope.visibleDream
  }

  var refDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/dreams");
  refDreams.on('value', function(snapshot) {
    var allDreams = snapshot.val();
    console.log(allDreams);
    for (var obj in allDreams) {
      var dream = allDreams[obj];
      if (dream.username !== $scope.username) {
        $scope.browseDreams.push(dream);
      }
    }
    $scope.showDream();
  });

});

