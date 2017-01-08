angular.module("bkApp").controller('navigationController', ['$scope', '$route', '$firebaseArray', function($scope, $route, $firebaseArray) {
  var ref = firebase.database().ref().child("projects");
  $scope.projects = $firebaseArray(ref);
}]).directive('navigation', function() {
  return {
    restrict: 'E',
    scope: {},
    controller: 'navigationController',
    templateUrl: 'app/navigation/menu.html'
  };
});
