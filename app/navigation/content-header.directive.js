angular.module("bkApp").controller('contentHeaderController', ['$scope', '$route', '$routeParams', 'projectsService', function($scope, $route, $routeParams, projectsService) {

  var updateText = function() {
    $scope.headerTitle = $route.current.headerTitle;
    if ($route.current.pageTitle) {
      $scope.pageTitle = $route.current.pageTitle;
    }
    else if ($routeParams.hostname) {
      projectsService.getProject($routeParams.hostname).then(function(project) {
        if (project) {
          $scope.pageTitle = project.name;
        }
      }).catch(console.error);
    }
  };

  updateText();

  $scope.$on('$routeChangeSuccess', function(newRoute, lastRoute) {
    updateText();
  });

}]).directive('contentHeader', function() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'contentHeaderController',
    templateUrl: 'app/navigation/content-header.html'
  };
});
