angular.module("bkApp").controller('buildkitController', ['$scope', '$location', 'projectsService', function($scope, $location, projectsService) {
	    // Some auth check function
	    
	    /*
	     * Create New Project object
	     */
		$scope.onCreateProject = function() {
			$scope.project = new Project();	
			$scope.project.buildkit = $scope.buildkitData.name;
		};
		
		/*
	     * Create New Project after compeleting modal form
	     */
		$scope.onNewProjectSubmit = function() {
			projectsService.addProject($scope.project).then(function() {
            	$location.path('/projects/' + $scope.project.hostname + '/view');
            	// Hide Modal
            	$('#createProjectModal-'+ $scope.buildkitData.name).modal('hide');
            	$scope.onCreateProjectModalClose();
        	});
		};
		
		/*
		 * On Close delete project object
		 */
		$scope.onCreateProjectModalClose = function() {
			delete $scope.project;
		};
	
}]).directive('buildkit', function(projectsService, $location) {
  return {
    restrict: 'E',
    scope: {
        buildkitData: '='
    },
    controller: 'buildkitController',
    templateUrl: 'app/market/buildkit.html'
  };
});
