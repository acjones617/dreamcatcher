var home = angular.module('myApp.home', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'firebase']);

app.controller('HomeC', function($scope, $state, $rootScope, $firebase) {
  // $rootScope.on('login', function() {
  //   $scope.user = user;
  // })
  
  var refDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/dreams");
  $scope.dream = {};
  $scope.username = $rootScope.user;
  $scope.submit = function() {
    console.log('new dream');
    refDreams.push({
      username: $scope.username,
      text: $scope.dream.text,
      font: $scope.dream.font,
      background: $scope.dream.background ,
      createdAt: new Date(),
      encouragements: 0
      });
  };
})

// home.controller('HomeC', function($scope, $firebase, $state) {
//   $scope.user = 'ANDREW';
// });

