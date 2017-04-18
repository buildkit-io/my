/*globals angular firebase*/
angular.module("bkApp").controller('actionsController', ['$scope', '$routeParams', '$firebaseObject', '$timeout', 'userService', 'tasksService', 'containerService', function($scope, $routeParams, $firebaseObject, $timeout, userService, tasksService, containerService) {
		$scope.project = null;
		$scope.codeEditorUrl = null;
		$scope.terminalUrl = null;

		var updateActiveTab = function() {
			// dynamic
			if ($routeParams.hostname) {
				userService.waitForAuth().then(function(uid) {
					var project = $firebaseObject(firebase.database().ref("projects/" + $routeParams.hostname))
					$scope.codeEditorUrl = null;
					$scope.terminalUrl = null;
					project.$bindTo($scope, "project");
					project.$loaded().then(function() {
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
				$timeout(function() {
					tasksService.createProject($scope.project);
				});
			} else {
				$timeout(function() {
					tasksService.startProject($scope.project);
				});
			}
			$scope.project.status = Project.StatusTypes.PENDING;
		};

		$scope.stopProject = function() {
			$scope.project.status = Project.StatusTypes.PENDING;
			$timeout(function() {
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