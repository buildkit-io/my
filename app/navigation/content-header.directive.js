angular.module("bkApp").controller('contentHeaderController', ['$scope', 
'$route', '$routeParams', 'projectsService', 
function($scope, $route, $routeParams, projectsService) {}])
.directive('contentHeader', function() {
    return {
        restrict: 'E',
        scope: {
            headerTitle: '@',
            pageTitle: '@',
            hasIcon: '=',
            style: '@'
        },
        controller: 'contentHeaderController',
        templateUrl: 'app/navigation/content-header.html'
    };
});
