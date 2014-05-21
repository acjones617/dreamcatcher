var home = angular.module('myApp.home', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'myApp.services',
  'firebase']);

home.controller('HomeC', function($scope, $state, $rootScope, $firebase, modal) {
  $scope.dream = {};

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

  $scope.modal = function() {
    var dream = {
      username: $rootScope.user.username,
      text: $scope.dream.text,
      font: $scope.font.style,
      background: $scope.bg.image,
      encouragements: 0
      };
    modal.showModal(dream);
  }

  $scope.submit = function() {
    var personalDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/personal/"+$rootScope.user.username);
    console.log('new dream', $scope.dream.text);
    var date = new Date().getTime();
    var dream = {
      username: $rootScope.user.username,
      text: $scope.dream.text,
      font: $scope.font.style,
      background: $scope.bg.image,
      city: 'San Diego',
      createdAt: date,
      encouragements: 0
      };
    refDreams.push(dream);
    personalDreams.push(dream);

    delete $scope.dream.text;
    modal.showModal(dream);
  };
});

