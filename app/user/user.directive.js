angular.module("bkApp").controller('userController', ['$scope', 'userService', function($scope, userService) {
  userService.getProfile().then(function(profile) {
    $scope.profile = profile;
  });

}]).directive('user', function() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'userController',
    templateUrl: 'app/user/panel.html'
  };
});
