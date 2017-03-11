angular.module("bkApp").controller('projectActionsController', ['$scope', 'tasksService', function($scope, tasksService) {

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

    $scope.canStart = function() {
        if (!$scope.project) {
            return false;
        }
        return ($scope.project.status === Project.StatusTypes.STOPPED || 
            $scope.project.status === Project.StatusTypes.FAILED) && 
            !$scope.hasTasksInProgress();
    };

    $scope.canStop = function() {
        if (!$scope.project) {
            return false;
        }
        return ($scope.project.status === Project.StatusTypes.RUNNING ||
            $scope.project.status === Project.StatusTypes.FAILED) &&
            !$scope.hasTasksInProgress();
    };

    $scope.hasTasksInProgress = function() {
        if (!$scope.project.tasks) {
            return false;
        }
        for (var key in $scope.project.tasks) {
            if ($scope.project.tasks[key].status === Task.StatusTypes.PENDING ||
            $scope.project.tasks[key].status === Task.StatusTypes.IN_PROGRESS) {
                return true;
            }
        }
        return false;
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
