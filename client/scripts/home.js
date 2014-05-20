var home = angular.module('myApp.home', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'firebase']);

home.controller('HomeC', function($scope, $state, $rootScope, $firebase) {
  // $rootScope.on('login', function() {
  //   $scope.user = user;
  // })
  // $scope.testTHIS = 'TESTTESTTESTTESTTEST';

  $scope.dream = {};
  if ($rootScope.user) {
    $scope.username = $rootScope.user.username || 'test';
  }

  $scope.bg = {one: false, two: true, three: false, image: 'background-option-two'};

  $scope.bg.setOne = function() {
    $scope.bg.one = true;
    $scope.bg.two = false;
    $scope.bg.three = false;
    $scope.bg.image = 'background-option-one';
  }

  $scope.bg.setTwo = function() {
    $scope.bg.one = false;
    $scope.bg.two = true;
    $scope.bg.three = false;
    $scope.bg.image = 'background-option-two';
  }

  $scope.bg.setThree = function() {
    $scope.bg.one = false;
    $scope.bg.two = false;
    $scope.bg.three = true;
    $scope.bg.image = 'background-option-three';
  }
  
  $scope.font = {one: false, two: true, three: false, style: 'font-option-two'};

  $scope.font.setOne = function() {
    $scope.font.one = true;
    $scope.font.two = false;
    $scope.font.three = false;
    $scope.font.style = 'font-option-one';
  }

  $scope.font.setTwo = function() {
    $scope.font.one = false;
    $scope.font.two = true;
    $scope.font.three = false;
    $scope.font.style = 'font-option-two';
  }

  $scope.font.setThree = function() {
    $scope.font.one = false;
    $scope.font.two = false;
    $scope.font.three = true;
    $scope.font.style = 'font-option-three';
  }

  var refDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/dreams");
  var personalDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/personal/"+$scope.username);

  $scope.submit = function() {
    console.log('new dream');
    var date = new Date().getTime();
    refDreams.push({
      username: $scope.username || 'test',
      text: $scope.dream.text,
      font: $scope.font.style || 'griffy',
      background: $scope.bg.image || 'floral',
      createdAt: date,
      encouragements: 0
      });
    personalDreams.push({
      text: $scope.dream.text,
      font: $scope.font.style || 'griffy',
      background: $scope.bg.image || 'floral',
      createdAt: date,
      encouragements: 0
    })
    delete $scope.dream.text;
  };
})

// home.controller('HomeC', function($scope, $firebase, $state) {
//   $scope.user = 'ANDREW';
// });

