var app = angular.module('myApp', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'firebase',
  'myApp.main']);
// .config(function ($stateProvider) {
//   $stateProvider
//     .state('myApp', {
//       abstract: true,
//       template: '<ui-view></ui-view>'
//     });
// })
// .run(function ($state) {
//   $state.transitionTo('myApp.main');
// });

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('root', {
      url:'/', 
      template: '<h1> ROOT<h1>'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html'
    })
})

app.controller('TestC', function($scope, $firebase) {
  var ref = new Firebase("https://blazing-fire-3752.firebaseIO.com/test");
  // Automatically syncs everywhere in realtime

  var rootRef = new Firebase("https://blazing-fire-3752.firebaseIO.com");
  var auth = new FirebaseSimpleLogin(rootRef, function(err, user) {

  })

  $scope.box = {};
  $scope.trial = $firebase(ref);
  $scope.submit = function() {
    console.log('submission');
    $scope.trial.$add({prop: $scope.box.prop, val: $scope.box.val});
  };
});

app.controller('SignupC', function($scope, $firebase) {
  var rootRef = new Firebase("https://blazing-fire-3752.firebaseIO.com");
  var auth = new FirebaseSimpleLogin(rootRef, function(err, user) {
    console.log('auth', err, user);
  });

  $scope.auth = {};
  $scope.submit = function() {
    auth.createUser($scope.auth.email, $scope.auth.password, function(err, user) {
      if (err) {
        console.log('error', err);
      } else {
        console.log('SUCCESS', user);
      }

    });
  };
});

app.controller('LoginC', function($scope, $firebase, $state) {
  var rootRef = new Firebase("https://blazing-fire-3752.firebaseIO.com");
  var auth = new FirebaseSimpleLogin(rootRef, function(err, user) {
    if (err) {
      console.log('ERROR', err);
      if (err.code === 'INVALID_EMAIL') {
        console.log('invalid email');
      } else if (err.code === 'INVALID_PASSWORD') {
        console.log('invalid password');
      }
    } else if (user) {
      // user authenticated with Firebase
      console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
    } else {
      $state.go('root');
      // user is logged out
    }
  });

  $scope.auth = {};
  $scope.submit = function() {
    auth.login('password', {
      email: $scope.auth.email,
      password: $scope.auth.password
    });
  };

  $scope.logout = function() {
    auth.logout();
  };
});

app.factory('Authenticate', function($firebase) {
  var rootRef = new Firebase("https://blazing-fire-3752.firebaseIO.com");
  var auth = new FirebaseSimpleLogin(rootRef, function(err, user) {
    if (err) {
      console.log('ERROR', err);
      if (err.code === 'INVALID_EMAIL') {
        console.log('invalid email');
      } else if (err.code === 'INVALID_PASSWORD') {
        console.log('invalid password');
      }
    } else if (user) {
      // user authenticated with Firebase
      console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
    } else {
      // user is logged out
    }
  });
})