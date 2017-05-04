/* global angular Project */
/*eslint-env browser */
/*globals firebase */
angular.module("bkApp").controller('desktopDashboardController', ['$window', '$firebaseArray', 'userService',

	function($window, $firebaseArray, userService) {
		userService.waitForAuth().then(function(uid) {
			$firebaseArray(firebase.database().ref("users/" + uid + "/projects")).$loaded().then(function(projects) {
				$window.location.assign('#!/desktop-projects/'+projects[0].$id+'/view');
			});
		}).
		catch(function(error) {
			console.log(error);
		});
}]);