/*globals angular firebase*/
/*eslint-env browser */
angular.module("bkApp").controller('navigationController', ['$scope', '$route', '$routeParams', '$firebaseObject', 'userService', function($scope, $route, $routeParams, $firebaseObject, userService) {
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