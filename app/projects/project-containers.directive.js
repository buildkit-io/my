/*globals angular */
/*eslint-env browser */
(function() {
	'use strict';
	/*globals angular */
	angular.module("bkApp").controller('containersController', ['$scope', 'tasksService', function($scope, tasksService) {
		$scope.containers = [];
		
		$scope.$watch('project.containers', function(newValue) {
			if (newValue) {
				$scope.containers=angular.fromJson(newValue);
				if (!$scope.containers) {
					tasksService.listContainers($scope.project);
				}
			}
		});
		
    	$scope.isSecure = function(container) {
    		return container.NetworkSettings.Networks.secure;
    	};
    	
    	$scope.isPublic = function(container) {
    		return container.NetworkSettings.Networks.bridge && $scope.getPublicPort(container);
    	};
    	
    	$scope.getName = function(container) {
    		if (container.Labels['com.docker.compose.service']) {
    			return container.Labels['com.docker.compose.service'];
    		}
    		if ($scope.isSecure(container) && container.NetworkSettings.Networks.secure.Aliases) {
    			return container.NetworkSettings.Networks.secure.Aliases[0];
    		}
    		return container.Names[0].substring(1);
    	};
    	
    	$scope.getPrivatePort = function(container) {
    		for (var i=0; i<container.Ports.length; i++) {
    			if (container.Ports[i].PrivatePort) {
    				return container.Ports[i].PrivatePort;
    			}
    		}
    	};
    	
    	$scope.getPublicPort = function(container) {
    		for (var i=0; i<container.Ports.length; i++) {
    			if (container.Ports[i].IP === "0.0.0.0" && container.Ports[i].PublicPort) {
    				return container.Ports[i].PublicPort;
    			}
    		}
    	};
    	
    	$scope.getSecureUrl = function(container) {
    		return "https://"+$scope.getName(container)+"-"+$scope.getPrivatePort(container)+"-"+$scope.project.hostname+".buildkit.io";
    	};
    	
    	$scope.getPublicUrl = function() {
    		return "https://"+$scope.project.hostname+".bkusr.com";
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