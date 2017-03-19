/*globals angular */
angular.module("bkApp")
.directive('contentHeader', function() {
    return {
        restrict: 'E',
        scope: {
            headerTitle: '@',
            pageTitle: '@',
            hasIcon: '=',
            style: '@'
        },
        templateUrl: 'app/navigation/content-header.html'
    };
});
