/*globals angular firebase Project*/
angular.module("bkApp").controller('actionsController', ['$scope', '$routeParams', '$firebaseObject', '$timeout', 'userService', 'tasksService', 'containerService', function($scope, $routeParams, $firebaseObject, $timeout, userService, tasksService, containerService) {
		$scope.project = null;
		$scope.codeEditorUrl = null;
		$scope.terminalUrl = null;

		var updateActiveTab = function() {
			// dynamic
			if ($routeParams.hostname) {
				userService.waitForAuth().then(function(uid) {
					$scope.project = $firebaseObject(firebase.database().ref("projects/" + $routeParams.hostname));
					$scope.codeEditorUrl = null;
					$scope.terminalUrl = null;
					$scope.project.$loaded().then(function() {
						for (var key in $scope.project.containers) {
							var containerName = containerService.getName($scope.project.containers[key]);
							if (containerName === 'orion') {
								$scope.codeEditorUrl = containerService.getSecureUrl($scope.project.containers[key], $scope.project.hostname);
							} else if (containerName === 'term') {
								$scope.terminalUrl = containerService.getSecureUrl($scope.project.containers[key], $scope.project.hostname);
							}
						}
					});
				});
			} else {
				$scope.project = null;
				$scope.codeEditorUrl = null;
				$scope.terminalUrl = null;
			}
		};

		$scope.$on('$routeChangeSuccess', function(ev, newRoute) {
			updateActiveTab();
		});

		updateActiveTab();

		$scope.startProject = function() {
			if ($scope.project.status === Project.StatusTypes.AVAILABLE) {
				$scope.project.status = Project.StatusTypes.PENDING;
				$scope.project.$save().then(function() {
					userService.getUser().then(function(user){
						$firebaseObject(firebase.database().ref("tutorials/"+$scope.project.tutorial)).$loaded(function(tutorial) {
							tasksService.createProject($scope.project, user.email, tutorial.cloudformation);
						});
					});
					
				});
			} else {
				$scope.project.status = Project.StatusTypes.PENDING;
				$scope.project.$save().then(function() {
					tasksService.startProject($scope.project);
				});
			}
		};

		$scope.stopProject = function() {
			$scope.project.status = Project.StatusTypes.PENDING;
			$scope.project.$save().then(function() {
				tasksService.stopProject($scope.project);
			});
		};

	}])
	.directive('actions', function() {
		return {
			restrict: 'E',
			scope: {},
			controller: 'actionsController',
			templateUrl: 'app/actions/actions.html'
		};
	});