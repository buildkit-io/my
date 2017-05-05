/* global angular Project */
/*eslint-env browser */
/*globals firebase */
angular.module("bkApp").controller('projectsController', ['$scope', '$routeParams', '$location', '$firebaseObject', 'projectsService', 'userService', 'tasksService',

	function($scope, $routeParams, $location, $firebaseObject, projectsService, userService, tasksService) {
		$scope.hostname = $routeParams.hostname;
		$scope.tutorial = null;
		$scope.project = null;

		userService.waitForAuth().then(function(uid) {
			$firebaseObject(firebase.database().ref("projects/" + $scope.hostname)).$bindTo($scope, "project").then(function() {
				$scope.tutorial = $firebaseObject(firebase.database().ref("tutorials/" + $scope.project.tutorial));
			});
		});

		$scope.deleteProject = function() {
			projectsService.deleteProject($scope.hostname).then(function() {
				// naviage to new project
				$location.path('/');
			}).
			catch(console.error);
		};

		$scope.getStateStyle = function() {
			if ($scope.project) {
				switch ($scope.getState()) {
					case Project.StateTypes.OK:
						return "fa-circle text-success";
					case Project.StateTypes.ERROR:
						return "fa-circle text-danger";
					case Project.StateTypes.WARNING:
						return "fa-circle text-warning";
					default:
						return "fa-circle text-default";
				}
			}
		};

		$scope.getState = function() {
			if ($scope.project) {
				switch ($scope.project.status) {
					case Project.StatusTypes.RUNNING:
						return Project.StateTypes.OK;
					case Project.StatusTypes.PENDING:
					case Project.StatusTypes.STOPPING:
					case Project.StatusTypes.SHUTTING_DOWN:
						return Project.StateTypes.WARNING;
					case Project.StatusTypes.STOPPED:
						return Project.StateTypes.ERROR;
					default:
						return Project.StateTypes.UNKNOWN;
				}
			}
		};

		$scope.startProject = function() {
			if ($scope.project.status === Project.StatusTypes.AVAILABLE) {
				$scope.project.status = Project.StatusTypes.PENDING;
				$scope.project.$save().then(function() {
					userService.getUser().then(function(user) {
						$firebaseObject(firebase.database().ref("tutorials/" + $scope.project.tutorial)).$loaded(function(tutorial) {
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
	}
]);