var home = angular.module('myApp.settings', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'firebase']);

app.controller('HomeC', function($scope, $state, $rootScope, $firebase) {
  // $rootScope.on('login', function() {
  //   $scope.user = user;
  // })
  
  var refUsers = new Firebase("https://blazing-fire-3752.firebaseIO.com/users");
  $scope.settings = {};

  // var ref = new Firebase("https://blazing-fire-3752.firebaseIO.com/test");
  // Automatically syncs everywhere in realtime

  // var rootRef = new Firebase("https://blazing-fire-3752.firebaseIO.com");

  var newUser = $firebase(refUsers);
  console.log($scope.newUser);
  $scope.submit = function() {
    console.log('submission');
    console.log(newUser);
    refUsers.push({
      username: $scope.settings.username, 
      email: $scope.settings.email,
      birthday: $scope.settings.birthday,
      growup: $scope.settings.growup
      });
  };
})

// home.controller('HomeC', function($scope, $firebase, $state) {
//   $scope.user = 'ANDREW';
// });

