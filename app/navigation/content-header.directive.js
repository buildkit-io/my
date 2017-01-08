angular.module("bkApp").controller('contentHeaderController', ['$scope', '$route', function($scope, $route) {
  $scope.headerTitle = $route.current.headerTitle;
  $scope.pageTitle = $route.current.pageTitle;
}]).directive('contentHeader', function() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'contentHeaderController',
    templateUrl: 'app/navigation/content-header.html'
  };
});
