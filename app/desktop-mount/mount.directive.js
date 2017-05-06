/*globals angular firebase*/
/*eslint-env browser */
angular.module("bkApp").directive('mount', function() {
	return {
		restrict: 'E',
		scope: {
			project: "<"
		},
		controller: 'mountController',
		templateUrl: 'app/desktop-mount/mount.html'
	};
});