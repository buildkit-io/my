angular.module("bkApp").controller('navigationController', ['$scope', '$route', '$routeParams', 'projectsService', function($scope, $route, $routeParams, projectsService) {
    projectsService.getProjects().then(function(projects) {
        $scope.projects = projects;
    }).
    catch (function(error) {
        console.log(error);
    });
    var updateActiveTab = function() {
        // dynamic
        if ($routeParams.hostname) {
            $scope.activeTab = $routeParams.hostname;
            $scope.isProject = true;
        }
        else {
            $scope.activeTab = $route.current.activeTab;
            $scope.isProject = false;
        }
    };

    $scope.$on('$routeChangeSuccess', function(ev, newRoute) {
        updateActiveTab();
    });

    updateActiveTab();

}]).directive('navigation', function() {
    return {
        restrict: 'E',
        scope: {},
        controller: 'navigationController',
        templateUrl: 'app/navigation/menu.html'
    };
});
