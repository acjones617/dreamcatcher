var mydreams = angular.module('myApp.mydreams', [
  'ngAnimate',
  'fx.animations',
  'myApp.services',
  'firebase'
  ]);

mydreams.controller('DreamsC', function($scope, $state, $rootScope, $firebase, modal) {
  // $scope.username = $rootScope.user.username;
  // $scope.personalDreams = $scope.personalDreams || [];
  $scope.personalDreams = [];

  var refDreams = new Firebase("https://blazing-fire-3752.firebaseIO.com/personal/"+$rootScope.user.username);
  refDreams.on('value', function(snapshot) {
    var allDreams = snapshot.val();
    _.each(snapshot.val(), function(dream) {
      $scope.personalDreams.unshift(dream);
      console.log($scope.personalDreams);
    })
    $scope.$apply();
  })
  
  $scope.modalDream = modal.showModal;
});

// mydreams.directive('backgroundLink', function() {
//   return {
//     restrict: 'EAC',
//     replace: true,
//     templateUrl: 'templates/directive-templates/backgroundLink.html',
//     scope: {background: '=', text: '=', font: '=', encouragements: '='},
//     link: function(scope, element, attr) {

//       element.on('click', function() {
//         $('#dreamModal').find('.modal-dream').addClass(scope.background).addClass(scope.font);
//         $('#dreamModal').find('p').text(scope.text);
//         $('#dreamModal').show()
//       });
//     }
//   }
// })

// // home.controller('HomeC', function($scope, $firebase, $state) {
// //   $scope.user = 'ANDREW';
// // });

