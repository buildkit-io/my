/* global angular Project */
angular.module("bkApp").controller('projectsController', ['$scope', '$routeParams', '$location', 'projectsService', 'tasksService',
    function($scope, $routeParams, $location, projectsService, tasksService) {
        $scope.hostname = $routeParams.hostname;
        $scope.project;
        $scope.tasks;

        if (!$scope.project) {
            if ($scope.hostname) {
                projectsService.getProject($scope.hostname).then(function(loadedProject) {
                    if (loadedProject) {
                        $scope.project = loadedProject;
                    }
                    else {
                        $location.path('/projects/new');
                    }
                }).catch(function(error) {
                    console.log("Failed to load project: " + $scope.hostname);
                    console.log(error);
                    $location.path('/projects/new');
                });
                $scope.tasks = tasksService.getTasks($scope.hostname);
            } else {
                $scope.project = new Project();
            }
        }

        $scope.addProject = function() {
            projectsService.addProject($scope.project).then(function() {
                $location.path('/projects/' + $scope.project.hostname + '/view');
            }).catch(console.error);
        };

        $scope.deleteProject = function() {
            projectsService.deleteProject($scope.hostname).then(function() {
                // naviage to new project
                $location.path('/projects/new');
            }).catch(console.error);
        };
        
        $scope.getStateStyle = function() {
            if ($scope.project) {
                switch($scope.project.getState()) {
                    case Project.StateTypes.OK:
                        return "fa-circle text-success";
                    case Project.StateTypes.ERROR:
                        return "fa-circle text-danger";
                    case Project.StateTypes.WARNING:
                        return "fa-circle text-warning";
                    default:
                        return "fa-circle text-default";
                }
            }
        };
    }
]);
