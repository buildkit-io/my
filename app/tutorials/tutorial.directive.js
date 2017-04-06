/*eslint-env jquery */
/*globals angular */
angular.module("bkApp").controller('tutorialController', ['$scope', '$location', 'projectsService', function($scope, $location, projectsService) {
	    // Some auth check function
	    
	    /*
	     * Create New Project object
	     */
		$scope.onCreateProject = function() {
			$scope.project = new Project();	
			$scope.project.tutorial = $scope.tutorialData.name;
		};
		
		/*
	     * Create New Project after compeleting modal form
	     */
		$scope.onNewProjectSubmit = function() {
			projectsService.addProject($scope.project).then(function() {
            	$location.path('/projects/' + $scope.project.hostname + '/view');
            	// Hide Modal
            	$('#createProjectModal-'+ $scope.tutorialData.name).modal('hide');
            	$scope.onCreateProjectModalClose();
        	});
		};
		
		/*
		 * On Close delete project object
		 */
		$scope.onCreateProjectModalClose = function() {
			delete $scope.project;
		};
	
}]).directive('tutorial', function() {
  return {
    restrict: 'E',
    scope: {
        tutorialData: '='
    },
    controller: 'tutorialController',
    templateUrl: 'app/tutorials/tutorial.html'
  };
});
