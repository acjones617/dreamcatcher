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
      console.log($rootScope.user);
      $state.go('root');
    }
    else if (error) {
      $rootScope.$emit("loginError", error);
    }
    else {
      $rootScope.$emit("logout");
      $state.go('authorization');
    }
  });
});


app.controller('RootC', function($scope, myAuthService, $state, $rootScope) {
  
});

app.controller('LogoutC', function($scope, $firebase, $rootScope, myAuthService, $state) {
  $scope.logout = function() {
    myAuthService.auth.logout();
    $state.go('authorization');
  }
});

app.controller('AuthC', function($scope, $firebase, $rootScope, myAuthService, $state) {
  $scope.userControl = {}
  $scope.showLogin = false;
  $scope.showSignup = true;

  $scope.toggleLoginSignup = function() {
    console.log('whats going on');
    $scope.showLogin = !$scope.showLogin;
    $scope.showSignup = !$scope.showSignup;
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

  // $scope.submit = function() {
  //   $rootScope.user = $scope.settings.username;
  //   console.log('new user created', $rootScope.user)
    
  // };
  $scope.userControl.signup = function() {
    $scope.signup.username = $scope.signup.email.split('@')[0];
    $rootScope.user = $scope.signup.username;
    myAuthService.auth.createUser($scope.signup.email, $scope.signup.password, function(error, user) {
      if (!error) {
        console.log('User Id: ' + user.uid + ', Email: ' + user.email);
        refUsers.push({
          username: $scope.signup.username, 
          email: $scope.signup.email,
          firstname: $scope.signup.firstname,
          lastname: $scope.signup.lastname,
          city: $scope.signup.city,
          birthday: $scope.signup.birthday,
          growup: $scope.signup.growup
          });
        myAuthService.auth.login('password', {
          email: $scope.signup.email,
          password: $scope.signup.password
        });
      }

    });

  };



  // $scope.userControl.logout = function() {
  //   myAuthService.auth.logout();
  // }
  // listen for user auth events
  $rootScope.$on("login", function(event, user) {
    // do login things
    // $scope.userControl.user = user;
    // window.user = user;
    // console.log('logged in', user, $scope.userControl.user); 
    // $state.go('');
  })
  $rootScope.$on("loginError", function(event, error) {
    // tell the user about the error
    console.log('login error', error);
  })
  $rootScope.$on("logout", function(event) {
    // do logout things
    // $scope.userControl.user = undefined;
    console.log('logged out');
  })
});
