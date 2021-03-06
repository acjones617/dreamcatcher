var app = angular.module('myApp', [
  'ui.router',
  'ngAnimate',
  'fx.animations',
  'firebase',
  'myApp.home',
  'myApp.mydreams',
  'myApp.inspirations',
  'myApp.browse',
  'myApp.settings'
  ]);
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
    .state('authorization', {
      url:'/',
      templateUrl : 'templates/authorization.html'
    })
    .state('root', {
      url: '/dreamify',
      templateUrl: 'templates/root.html'
    })
    .state('root.home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    })
    .state('root.mydreams', {
      url: '/mydreams',
      templateUrl: 'templates/mydreams.html'
    })
    .state('root.inspirations', {
      url: '/inspirations',
      templateUrl: 'templates/inspirations.html'
    })
    .state('root.browse', {
      url: '/browse',
      templateUrl: 'templates/browse.html'
    })
    .state('root.settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html'
    })
});

// app.controller('HomeC', function($scope, myAuthService, $state, $rootScope) {
//   $rootScope.on('login', function() {
//     $scope.user = user;
//   })
// })


app.service('myAuthService', function($rootScope, $firebase, $state) {
  var ref = new Firebase("https://blazing-fire-3752.firebaseio.com");
  this.auth = new FirebaseSimpleLogin(ref, function(error, user) {
    if (user) {
      $rootScope.$emit("login", user);
      $rootScope.user = user;
      $rootScope.user.username = $rootScope.user.email.split("@")[0];
      console.log($rootScope.user, 'simple login');
      $state.go('root.home');
    } else if (error) {
      $rootScope.$emit("loginError", error);
    } else {
      $rootScope.$emit("logout");
      $state.go('authorization');
    }
  });
});


app.controller('RootC', function($scope, myAuthService, $state, $rootScope) {
  $scope.bar0 = true;

  window.runInfinity('#footer');

  $scope.runInfinity = function(num) {
    window.runInfinity('#footer');
    for (var i = 0; i < 4; i++) {
      if (i === num) {
        $scope['bar'+i] = true;
      } else {
        $scope['bar'+i] = false;
      }
      console.log($scope.bar0, $scope.bar1, $scope.bar2, $scope.bar3);
    }
  }

  $scope.logout = function() {
    $rootScope.user = {};
    myAuthService.auth.logout();
    $state.go('authorization');
  }
});

app.controller('AuthC', function($scope, $firebase, $rootScope, myAuthService, $state) {
  $scope.userControl = {}
  $scope.showLogin = false;
  $scope.showSignup = true;
  $scope.showNextSignup = false;

  window.runInfinity('#infinity');

  $scope.toggleLoginSignup = function() {
    $scope.showLogin = !$scope.showLogin;
    $scope.showSignup = !$scope.showSignup;
    window.runInfinity('#infinity');
  }

  $scope.userControl.login = function() {
    var user1 = $scope.cred.email;
    var pass1 = $scope.cred.password;
    console.log(user1, pass1);
    myAuthService.auth.login('password', {
      email: user1,
      password: pass1,
      rememberMe: false
    });
  };

  var refUsers = new Firebase("https://blazing-fire-3752.firebaseIO.com/users");
  $scope.signup = {};

  $scope.userControl.signup = function() {
    $scope.signup.username = $scope.signup.email.split('@')[0];
    $rootScope.user = {}
    $rootScope.user.username = $scope.signup.username;
    // $scope.toSignup = {};
    // $scope.toSignup.email = $scope.signup.email;
    // $scope.toSignup.email = $scope.signup.email;
    $scope.showSignup = false;
    $scope.showNextSignup = true;
    window.runInfinity('#infinity');
  };

  $scope.userControl.completeSignup = function() {
    myAuthService.auth.createUser($scope.signup.email, $scope.signup.password, function(error, user) {
      console.log('creating user');
      if (!error) {
        var user = {
          username: $scope.signup.username, 
          email: $scope.signup.email,
          firstname: $scope.signup.firstname || '',
          lastname: $scope.signup.lastname || '',
          city: $scope.signup.city || 'Earth',
          birthday: $scope.signup.birthday || '',
          growup: $scope.signup.growup || '' }
        $rootScope.user = user;
        console.log('User Id: ' + user.uid + ', Email: ' + user.email, $rootScope.user);
        refUsers.push(user);
        myAuthService.auth.login('password', {
          email: $scope.signup.email,
          password: $scope.signup.password
        });
      } else {
        console.log(error);
      }

    });
  };

  // listen for user auth events
  $rootScope.$on("login", function(event, user) {
    // do login things
    // $scope.userControl.user = user;
    // window.user = user;
  })
  $rootScope.$on("loginError", function(event, error) {
    // tell the user about the error
    console.log('login error', error);
    $scope.invalidUser = false;
    $scope.invalidPass = false;
    if (error.code === 'INVALID_EMAIL') {
      $scope.invalidUser = true;
    } else if (error.code === 'INVALID_PASSWORD') {
      $scope.invalidPass = true;
    }
    $scope.$apply();
  });
  $rootScope.$on("logout", function(event) {
    // do logout things
    // $scope.userControl.user = undefined;
    console.log('logged out');
  })
});


