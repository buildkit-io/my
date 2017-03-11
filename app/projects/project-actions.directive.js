angular.module("bkApp").controller('projectActionsController', 
['$scope', 'tasksService', function($scope, tasksService) {

    $scope.startProject = function() {
        tasksService.startProject($scope.project);
    };

    $scope.restartProject = function() {
        tasksService.restartProject($scope.project);
    };

    $scope.stopProject = function() {
        tasksService.stopProject($scope.project);
    };

    $scope.deleteProject = function() {
        tasksService.deleteProject($scope.project);
    };

}]).directive('projectActions', function() {
    return {
        restrict: 'E',
        scope: {
            project: "="
        },
        controller: 'projectActionsController',
        templateUrl: 'app/projects/project-actions.html'
    };
});
