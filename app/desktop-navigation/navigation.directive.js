/*globals angular firebase*/
/*eslint-env browser */
angular.module("bkApp").directive('desktopNavigation', function() {
	return {
		restrict: 'E',
		scope: {},
		controller: 'navigationController',
		templateUrl: 'app/desktop-navigation/menu.html'
	};
});