angular.module("bkApp").controller('buildkitController', ['$scope', function($scope) {

}]).directive('buildkit', function() {
  return {
    restrict: 'E',
    scope: {
        buildkitData: '='
    },
    controller: 'buildkitController',
    templateUrl: 'app/market/buildkit.html'
  };
});
