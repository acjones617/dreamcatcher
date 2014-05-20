var settings = angular.module('myApp.settings', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'firebase']);

settings.controller('SettingsC', function($scope, $state, $rootScope, $firebase) {
  // $rootScope.on('login', function() {
  //   $scope.user = user;
  // })
  
  var refUsers = new Firebase("https://blazing-fire-3752.firebaseIO.com/users");
  $scope.settings = {username: $rootScope.user.username};

  // var ref = new Firebase("https://blazing-fire-3752.firebaseIO.com/test");
  // Automatically syncs everywhere in realtime

  // var rootRef = new Firebase("https://blazing-fire-3752.firebaseIO.com");

  $scope.submit = function() {
    $rootScope.user = $scope.settings.username;
    console.log('new user created', $rootScope.user)
    refUsers.push({
      username: $scope.settings.username, 
      email: $scope.settings.email,
      birthday: $scope.settings.birthday,
      growup: $scope.settings.growup
      });
    delete $scope.settings.username;
    delete $scope.settings.email;
    delete $scope.settings.birthday;
    delete $scope.settings.growup;
  };
})

// home.controller('HomeC', function($scope, $firebase, $state) {
//   $scope.user = 'ANDREW';
// });

