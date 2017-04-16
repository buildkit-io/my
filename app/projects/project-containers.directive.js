/*globals angular */
/*eslint-env browser */
(function() {
	'use strict';
	/*globals angular */
	angular.module("bkApp").controller('containersController', ['$scope', '$http', 'tasksService', function($scope, $http, tasksService) {
		$scope.containers = [];
		$scope.extras = {};

		$scope.$watch('project.containers', function(newValue) {
			if (newValue) {
				$scope.containers = $scope.project.containers;
			}
		});

		$http.get("app/projects/containers.json")
			.then(function(response) {
				$scope.extras = response.data;
			});


		$scope.getImageName = function(container) {
			if (container.Image.match(':') && container.Image.match('/')) {
				return container.Image.split('/')[1].split(':')[0];
			} else if (container.Image.match(':')) {
				return container.Image.split(':')[0];
			} else if (container.Image.match('/')) {
				return container.Image.split('/')[1];
			}
			return container.Image;
		};

		$scope.getDescription = function(container) {
			var extra = $scope.extras[$scope.getImageName(container)];
			if (extra) {
				return extra.description;
			}
			return "";
		};
		
		$scope.getBgClass = function(container) {
			var extra = $scope.extras[$scope.getImageName(container)];
			if (extra) {
				return extra.bgClass;
			}
			return "bg-aqua";
		};
		
		$scope.getIconClass = function(container) {
			var extra = $scope.extras[$scope.getImageName(container)];
			if (extra) {
				return extra.iconClass;
			}
			return "fa fa-docker";
		};

		$scope.isSecure = function(container) {
			return container.NetworkSettings.Networks.secure;
		};

		$scope.isPublic = function(container) {
			return container.NetworkSettings.Networks.bridge && $scope.getPublicPort(container);
		};

		$scope.getName = function(container) {
			if (container && container.Labels && container.Labels['com.docker.compose.service']) {
				return container.Labels['com.docker.compose.service'];
			}
			if ($scope.isSecure(container) && container.NetworkSettings.Networks.secure.Aliases) {
				return container.NetworkSettings.Networks.secure.Aliases[0];
			}
			return container.Names[0].substring(1);
		};

		$scope.getPrivatePort = function(container) {
			for (var i = 0; i < container.Ports.length; i++) {
				if (container.Ports[i].PrivatePort) {
					return container.Ports[i].PrivatePort;
				}
			}
		};

		$scope.getPublicPort = function(container) {
			for (var i = 0; i < container.Ports.length; i++) {
				if (container.Ports[i].IP === "0.0.0.0" && container.Ports[i].PublicPort) {
					return container.Ports[i].PublicPort;
				}
			}
		};

		$scope.getSecureUrl = function(container) {
			return "https://" + $scope.getName(container) + "-" + $scope.getPrivatePort(container) + "-" + $scope.project.hostname + ".buildkit.io";
		};

		$scope.getPublicUrl = function() {
			return "https://" + $scope.project.hostname + ".buildkit.io";
		};

	}]).directive('projectContainers', function() {
		return {
			restrict: 'E',
			scope: {
				project: "="
			},
			controller: 'containersController',
			templateUrl: 'app/projects/project-containers.html'
		};
	});

})();