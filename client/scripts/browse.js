var browse = angular.module('myApp.browse', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'myApp.services',
  'firebase']);

browse.controller('BrowseC', function($scope, $state, $rootScope, $firebase, modal) {  
  $scope.username = $rootScope.user.username || 'test2';
  $scope.browseDreams = [];
  
  $scope.showDream = function() {
    var length = $scope.browseDreams.length;
    var randomIndex = Math.floor(Math.random()*length);
    console.log(randomIndex);
    $scope.visibleDream = $scope.browseDreams[randomIndex];
    $scope.dreamEncouraged = false;
    //$scope.$apply();
  };

  $scope.encourageDream = function() {
    console.log($scope.visibleDream);
    $scope.visibleDream.encouragements += 1;
    $scope.dreamEncouraged = true;
  };

  $scope.sendMessage = function() {
    $('#messageModal').modal('show');
  };

  $scope.sendFinalized = function() {
    console.log($scope.emailContent);
  }

  var refDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/dreams");
  refDreams.on('value', function(snapshot) {
    var allDreams = snapshot.val();
    _.each(allDreams, function(dream) {
      if (dream.username !== $scope.username) {
        $scope.browseDreams.push(dream);
      }
    });
    $scope.$apply($scope.showDream());
  });

  $scope.modalDream = modal.showModal;
});

