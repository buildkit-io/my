angular.module("bkApp").controller('navigationController', ['$scope', '$window', '$routeParams', '$firebaseObject', 'userService', 'projectsService', function($scope, $window, $routeParams, $firebaseObject, userService, projectsService) {
	$scope.projects = [];
	userService.waitForAuth().then(function(uid) {
		$scope.projects = $firebaseObject(firebase.database().ref("users/" + uid + "/projects"));
	}).
	catch(function(error) {
		console.log(error);
	});
	var updateActiveTab = function() {
		// dynamic
		if ($routeParams.hostname) {
			$scope.activeTab = $routeParams.hostname;
			$scope.isProject = true;
		} else {
			$scope.isProject = false;
		}
	};
	
	$scope.deleteProject = function(projectToDelete) {
		projectsService.deleteProject(projectToDelete);
        $window.location.assign('/');
	};

	$scope.$on('$routeChangeSuccess', function(ev, newRoute) {
		updateActiveTab();
	});
	
	$scope.logout = function() {
		userService.logout();
	};

	updateActiveTab();

}]);