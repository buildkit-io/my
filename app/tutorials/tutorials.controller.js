/* global angular Project */
/*globals firebase */
angular.module("bkApp").controller('tutorialsController', ['$scope', '$firebaseObject',

function($scope, $firebaseObject) {
	$scope.tutorials = $firebaseObject(firebase.database().ref("tutorials/"));
}]);
