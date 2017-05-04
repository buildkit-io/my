/*globals angular firebase*/
/*eslint-env browser */
angular.module("bkApp").directive('mount', function() {
	return {
		restrict: 'E',
		scope: {},
		controller: 'mountController',
		templateUrl: 'app/desktop-mount/mount.html'
	};
});