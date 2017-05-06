/*globals angular */
angular.module("bkApp").controller('mountController', ['$scope', '$window', '$routeParams', '$firebaseObject', '$http', 'userService', 'projectsService', function($scope, $window, $routeParams, $firebaseObject, $http, userService, projectsService) {
	$scope.openVpnRunning = false;
	$scope.driveMounted = false;
	
	const CONNECTED_STRING = 'Initialization Sequence Completed';
	
	var log = function(content) {
		$scope.output += content + '\n';
		$scope.$apply();
	};
	
	var getOpenVpnLog = function(logLocation) {
		if ($scope.openVpnRunning && !$scope.driveMounted) {
			setTimeout(function() {
				var output = readFile(logLocation);
				if (output) {
					$scope.output = output;
					$scope.$apply();
					if (output.indexOf(CONNECTED_STRING) != -1) {
						// connected, ready to mount
						mountDrive();
					} else {
						getOpenVpnLog(logLocation);
					}
				}
			}, 5000);
		}
	};
	var startOpenVpn = function (configLocation, logLocation) {
		$scope.openVpnRunning = true;
		execute('openvpn.exe --config ' + configLocation + ' > ' + logLocation + ' 2>&1', function(error1, output, error) {
				if (error1) {
					log(error1);
				}
				if (error) {
					log(error);
				}
				if (output) {
					log(output);
				}
				$scope.openVpnRunning = false;
			});
	};
	var mountDrive = function () {
		$scope.driveMounted = true;
		$scope.openVpnRunning = true;
		exec('net use * \\\\10.8.0.1\\workspace', function(error1, output, error) {
				if (error1) {
					log(error1);
				}
				if (error) {
					log(error);
				}
				if (output) {
					log(output);
				}
				$scope.openVpnRunning = false;
			});
	}
	
	$scope.output = '';
	$scope.mount = function() {
		$http({
			method: 'GET',
			url: '/cloudeity.conf'
		}).then(function successCallback(response) {
			var configLocation = getFilePath('cloudeity.conf');
			var logLocation = getFilePath('log.txt');
			writeFile(configLocation, response.data.replace('REMOTE_HOST', $scope.project.publicDNS));
			$scope.output += 'Config downloaded to ' + configLocation + '.\n';
			deleteFile(logLocation, function() {
				startOpenVpn(configLocation, logLocation);			
				getOpenVpnLog(logLocation);
			});
		}, function(error) {
			$scope.output += error + '\n';
		});


		//		execute('openvpn.exe', function(output, error) {
		//			console.log(error);
		//			console.log(output);
		//		});
	}
}]);