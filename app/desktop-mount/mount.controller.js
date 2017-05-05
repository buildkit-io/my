/*globals angular */
angular.module("bkApp").controller('mountController', ['$scope', '$window', '$routeParams', '$firebaseObject', 'userService', 'projectsService', function($scope, $window, $routeParams, $firebaseObject, userService, projectsService) {
	$scope.mount = function() {
		// call the function
execute('openvpn.exe', function(output, error) {
	console.log(error);
    console.log(output);
});
	}
}]);