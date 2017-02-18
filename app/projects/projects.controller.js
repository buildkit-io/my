/* global angular Project */
angular.module("bkApp").controller('projectsController', ['$scope', '$routeParams', '$location', 'projectsService',
    function($scope, $routeParams, $location, projectsService) {
        $scope.hostname = $routeParams.hostname;
        $scope.project;

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
        } else {
            $scope.project = new Project();
        }

        $scope.addProject = function() {
            projectsService.addProject($scope.project).then(function() {
                $location.path('/projects/' + $scope.project.hostname + '/view');
            }).catch(console.error);
        };

        $scope.deleteProject = function() {
            projectsService.deleteProject($scope.hostname).then(function() {
                if (projectsService.hasProjects()) {
                    // navigate to first project
                    $location.path('/projects/' + projectsService.getProject().hostname + '/view');
                }
                else {
                    // naviage to new project
                    $location.path('/projects/new');
                }
            }).catch(console.error);
        };
    }
]);
