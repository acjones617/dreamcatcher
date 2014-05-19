var home = angular.module('myApp.home', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'firebase']);

app.controller('HomeC', function($scope, $state, $rootScope, $firebase) {
  // $rootScope.on('login', function() {
  //   $scope.user = user;
  // })

  $scope.dream = {};
  $scope.username = $rootScope.user.username || 'test';
  
  var refDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/dreams");
  var personalDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/personal/"+$scope.username);

  $scope.submit = function() {
    console.log('new dream');
    refDreams.push({
      username: $scope.username || 'test',
      text: $scope.dream.text,
      font: $scope.dream.font || 'griffy',
      background: $scope.dream.background || 'floral',
      createdAt: new Date(),
      encouragements: 0
      });
    personalDreams.push({
      text: $scope.dream.text,
      font: $scope.dream.font || 'griffy',
      background: $scope.dream.background || 'floral',
      createdAt: new Date(),
      encouragements: 0
    })
    delete $scope.dream.text;
  };
})

// home.controller('HomeC', function($scope, $firebase, $state) {
//   $scope.user = 'ANDREW';
// });

