/*globals angular Project*/
angular.module("bkApp").controller('projectActionsController', ['$scope', '$location', 'tasksService', 'projectsService', function($scope, $location, tasksService, projectsService) {

	$scope.refresh = function() {
        tasksService.listContainers($scope.project);
    };	

    $scope.startProject = function() {
    	if ($scope.project.status === Project.StatusTypes.AVAILABLE) {
    		tasksService.createProject($scope.project);
    	} else {
    		tasksService.startProject($scope.project);
    	}
    };

    $scope.restartProject = function() {
        tasksService.restartProject($scope.project);
    };

    $scope.stopProject = function() {
        tasksService.stopProject($scope.project);
    };

    $scope.deleteProject = function() {
        projectsService.deleteProject($scope.project.$id);
        $location.path('/');
    };

    $scope.canStart = function() {
        if (!$scope.project) {
            return false;
        }
        return $scope.project.status !== Project.StatusTypes.RUNNING;
    };

    $scope.canStop = function() {
        if (!$scope.project) {
            return false;
        }
        return true;
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
