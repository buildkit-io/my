angular.module("bkApp").controller('userController', ['$scope', '$firebaseAuth', function($scope,$firebaseAuth) {
  $scope.profile = angular.fromJson(localStorage.getItem('profile'));
  
  // $firebaseAuth.onAuth(function() {
  //   $scope.profile = localStorage.getItem('profile');
  // });
}]).directive('user', function() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'userController',
    templateUrl: 'app/user/panel.html'
  };
});