var mydreams = angular.module('myApp.mydreams', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'firebase']);

app.controller('DreamsC', function($scope, $state, $rootScope, $firebase) {
  $scope.username = $rootScope.user.username || 'test';
  $scope.personalDreams = $scope.personalDreams || [];

  var refDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/personal/"+$scope.username);
  refDreams.on('value', function(snapshot) {
    var allDreams = snapshot.val();
    console.log(allDreams);
    _.each(snapshot.val(), function(dream) {
      $scope.personalDreams.unshift(dream);
      console.log($scope.personalDreams);
    })
  })
  
  
})

// home.controller('HomeC', function($scope, $firebase, $state) {
//   $scope.user = 'ANDREW';
// });

