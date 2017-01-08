angular.module("bkApp").controller('projectsController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
    var ref = firebase.database().ref().child("projects");
    $scope.projects = $firebaseArray(ref);
    $scope.newProject = {};
    console.log($scope.projects);
    $scope.addProject = function() {
        $scope.projects.$add($scope.newProject);
        $scope.newProject = {};
        console.log($scope.projects);
    };
}]);
